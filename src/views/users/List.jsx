import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Divider, Grid, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import Table from 'src/components/Table'
import users from 'src/columns/users'
import { SelectInput, TextInput } from 'src/components/inputs'

import useAxios from 'src/hooks/useAxios'
import { GET_CITY_API_URL, GET_PROVINCE_API_URL, GET_REGION_API_URL, GET_USERS_API_URL } from 'src/config/apiRoutes'

const List = (props) => {
  const navigate = useNavigate()
  const { get } = useAxios()

  const [deleteDialog, setDeleteDialog] = useState({ open: false })

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const watchRegion = watch('regionId')
  const watchProvince = watch('provinceId')

  const listQuery = useQuery({
    queryKey: ['users-list'],
    queryFn: () => get(GET_USERS_API_URL),
    refetchOnWindowFocus: false,
    retry: 1,
  })

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

  const onView = (data, index) => {
    navigate(data.id)
  }
  const onDelete = (id, index) => {
    setDeleteDialog({ open: true, id: id })
  }

  const handleDeleteUser = () => {
    //deleteDialog.id
  }

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
        <Button component={Link} to="/users/add" variant="outlined">
          Create User
        </Button>
      </Box>
      <Paper elevation={1}>
        <Table columns={users(onView, onDelete)} data={listQuery.data ? listQuery.data.message : []} />
      </Paper>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false })}>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false })}>Cancel</Button>
          <Button color="error" onClick={handleDeleteUser}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

List.propTypes = {}

export default List
