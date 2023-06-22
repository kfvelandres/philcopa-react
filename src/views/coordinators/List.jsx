import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Container, Dialog, Divider, Grid, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import Table from 'src/components/Table'
import users from 'src/columns/users'
import { SelectInput, TextInput } from 'src/components/inputs'
import useDialog from 'src/hooks/useDialog'

import useAxios from 'src/hooks/useAxios'
import { GET_CITY_API_URL, GET_PROVINCE_API_URL, GET_REGION_API_URL } from 'src/config/apiRoutes'
import { useQuery } from '@tanstack/react-query'

const sampleData = [
  {
    id: '1',
    lastName: 'Wick',
    firstName: 'John',
    middleName: '',
    talent: 'Assassination',
    mobileNumber: '666 666 6666',
    email: 'john.wick@gmail.com',
    province: 'Laguna',
    city: 'Santa Rosa',
    barangay: 'Market Area',
  },
]

const List = (props) => {
  const navigate = useNavigate()
  const { dialogProps, toggleDialog } = useDialog()
  const { get, post } = useAxios()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const watchRegion = watch('regionId')
  const watchProvince = watch('provinceId')

  const regionQuery = useQuery({
    queryKey: ['region'],
    queryFn: () => get(GET_REGION_API_URL),
    refetchOnWindowFocus: false,
  })

  const provinceQuery = useQuery({
    queryKey: ['province', watchRegion],
    queryFn: () => get(GET_PROVINCE_API_URL.replace('{region}', regionQuery.data?.message.find((p) => p.id === watchRegion)?.region)),
    refetchOnWindowFocus: false,
    enabled: !!regionQuery.data && !!watchRegion,
  })

  const cityQuery = useQuery({
    queryKey: ['city', watchProvince],
    queryFn: () => get(GET_CITY_API_URL.replace('{province}', provinceQuery.data?.message.find((p) => p.id === watchProvince)?.province)),
    refetchOnWindowFocus: false,
    enabled: !!provinceQuery.data && !!watchProvince,
  })

  const onSubmit = (data) => {}

  const handleView = (i) => {
    navigate(i.id)
  }
  const handleDelete = () => {}

  return (
    <Container sx={{ py: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Users
      </Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextInput control={control} name="name" label="Name" placeholder="Enter Name" maxLength={45} size="small" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SelectInput
              control={control}
              items={regionQuery.data?.message.map((p) => ({ value: p.id, text: p.region })) || []}
              name="regionId"
              label="Region"
              placeholder="Select Region"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SelectInput
              control={control}
              items={provinceQuery.data?.message.map((p) => ({ value: p.id, text: p.province })) || []}
              name="provinceId"
              label="Province"
              placeholder="Select Province"
              size="small"
              disabled={!watchRegion}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SelectInput
              control={control}
              items={cityQuery.data?.message.map((p) => ({ value: p.id, text: p.city })) || []}
              name="cityId"
              label="City"
              placeholder="Select City"
              size="small"
              disabled={!watchProvince}
            />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'right' }}>
          <Button variant="contained">Search</Button>
        </Box>
      </form>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ textAlign: 'right', mb: 2 }}>
        <Button component={Link} to="/coordinator/add" variant="outlined">
          Add Coordinator
        </Button>
      </Box>
      <Paper elevation={1}>
        <Table columns={users(handleView, handleDelete)} data={sampleData} />
      </Paper>
    </Container>
  )
}

List.propTypes = {}

export default List
