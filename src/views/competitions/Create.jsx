import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Button, Container, Dialog, Grid, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import InfoIcon from '@mui/icons-material/Info'
import HomeIcon from '@mui/icons-material/Home'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'

import { DateInput, SelectInput, TextInput } from 'src/components/inputs'
import { talents } from 'src/dropdownItems'
import SuccessDialogContent from 'src/components/dialogs/SuccessDialogContent'
import useDialog from 'src/hooks/useDialog'

import useAxios from 'src/hooks/useAxios'
import { CREATE_COMPETITION_API_URL, GET_CITY_API_URL, GET_PROVINCE_API_URL, GET_REGION_API_URL } from 'src/config/apiRoutes'

const Create = () => {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const { content, dialogProps, toggleDialog } = useDialog()
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

  const createMutation = useMutation({
    mutationFn: (data) => {
      return post(CREATE_COMPETITION_API_URL, data)
    },
    onSuccess: (response) => {
      if (response.data?.success) {
        toggleDialog(response.data.message)
      }
    },
  })

  const onSubmit = (data) => {
    createMutation.mutate({ ...data, createdById: user.id })
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Add Competition
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: 2 }}>
            <InfoIcon />
            <Typography variant="h6" noWrap>
              Competition Information
            </Typography>
          </Stack>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <SelectInput control={control} items={talents} name="category" label="Category" placeholder="Select Category" required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInput control={control} name="competitionRound" label="Round" placeholder="Enter Round" maxLength={45} required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DateInput control={control} name="competitionDate" label="Competition Date" placeholder="Enter Competition Date" noValidation required />
            </Grid>
          </Grid>
          <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: 2 }}>
            <HomeIcon />
            <Typography variant="h6" noWrap>
              Address
            </Typography>
          </Stack>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <SelectInput
                control={control}
                items={regionQuery.data?.message.map((p) => ({ value: p.id, text: p.region })) || []}
                name="regionId"
                label="Region"
                placeholder="Select Region"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SelectInput
                control={control}
                items={provinceQuery.data?.message.map((p) => ({ value: p.id, text: p.province })) || []}
                name="provinceId"
                label="Province"
                placeholder="Select Province"
                required
                disabled={!watchRegion}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SelectInput
                control={control}
                items={cityQuery.data?.message.map((p) => ({ value: p.id, text: p.city })) || []}
                name="cityId"
                label="City"
                placeholder="Select City"
                required
                disabled={!watchProvince}
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'end' }}>
            <Button component={Link} to="../competitions" sx={{ px: 4 }}>
              Back
            </Button>
            <LoadingButton type="submit" variant="contained" loading={createMutation.isLoading} sx={{ ml: 2, px: 4 }}>
              Submit
            </LoadingButton>
          </Box>
        </form>
      </LocalizationProvider>
      <Dialog {...dialogProps}>
        <SuccessDialogContent content={content} onClose={() => navigate('../competitions')} />
      </Dialog>
    </Container>
  )
}

Create.propTypes = {}

export default Create
