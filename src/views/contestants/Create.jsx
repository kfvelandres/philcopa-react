import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Button, Container, Dialog, Grid, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import InfoIcon from '@mui/icons-material/Info'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import queryString from 'query-string'

import { DateInput, EmailInput, PhoneNumberInput, SelectInput, TextInput } from 'src/components/inputs'
import useDialog from 'src/hooks/useDialog'
import { talents } from 'src/dropdownItems'

import useAxios from 'src/hooks/useAxios'
import { CREATE_CONTESTANT_API_URL, GET_BARANGAY_API_URL, GET_CITY_API_URL, GET_PROVINCE_API_URL, GET_REGION_API_URL } from 'src/config/apiRoutes'
import SuccessDialogContent from 'src/components/dialogs/SuccessDialogContent'
import ErrorDialogContent from 'src/components/dialogs/ErrorDialogContent'

const genders = [
  { value: 'Male', text: 'Male' },
  { value: 'Female', text: 'Female' },
]

const Create = () => {
  const user = useSelector((state) => state.auth.user)
  const location = useLocation()
  const navigate = useNavigate()
  const { content, dialogProps, toggleDialog } = useDialog()
  const { content: errorContent, dialogProps: errorDialogProps, toggleDialog: errorToggleDialog } = useDialog({ maxWidth: 'xs' })
  const { get, post } = useAxios()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const isGroup = useMemo(() => {
    var parsed = queryString.parse(location.search)
    return parsed?.type === 'group'
  }, [location.search])

  const watchRegion = watch('regionId')
  const watchProvince = watch('provinceId')
  const watchCity = watch('cityId')

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

  const barangayQuery = useQuery({
    queryKey: ['barangay', watchCity],
    queryFn: () =>
      get(
        GET_BARANGAY_API_URL.replace('{province}', provinceQuery.data?.message.find((p) => p.id === watchProvince)?.province).replace(
          '{city}',
          cityQuery.data?.message.find((c) => c.id === watchCity).city,
        ),
      ),
    refetchOnWindowFocus: false,
    enabled: !!provinceQuery.data && !!cityQuery.data && !!watchProvince && !!watchCity,
  })

  const createMutation = useMutation({
    mutationFn: (data) => {
      return post(CREATE_CONTESTANT_API_URL, data)
    },
    onSuccess: (response) => {
      if (response.data?.success) {
        toggleDialog(response.data.message)
      }
    },
    onError: (error) => {
      errorToggleDialog(error.response.data.message)
    },
  })

  const onSubmit = (data) => {
    createMutation.mutate({ ...data, invitedById: user.id })
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Add {isGroup ? 'Group' : 'Solo'} Contestant
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {isGroup ? (
            <React.Fragment>
              <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: 2 }}>
                <InfoIcon />
                <Typography variant="h6" noWrap>
                  Contestant Information
                </Typography>
              </Stack>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextInput control={control} name="groupName" label="Group Name" placeholder="Enter Group Name" maxLength={45} required />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <SelectInput control={control} items={talents} name="talent" label="Talent" placeholder="Select Talent" required />
                </Grid>
              </Grid>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: 2 }}>
                <InfoIcon />
                <Typography variant="h6" noWrap>
                  Contestant Information
                </Typography>
              </Stack>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextInput control={control} name="stageName" label="Stage Name" placeholder="Enter Stage Name" maxLength={45} required />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <SelectInput control={control} items={talents} name="talent" label="Talent" placeholder="Select Talent" required />
                </Grid>
              </Grid>
            </React.Fragment>
          )}

          <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: 2 }}>
            <AccountCircleIcon />
            <Typography variant="h6" noWrap>
              Personal Information
            </Typography>
          </Stack>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextInput control={control} name="firstName" label="First Name" placeholder="Enter First Name" maxLength={45} required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInput control={control} name="lastName" label="Last Name" placeholder="Enter Last Name" maxLength={45} required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInput control={control} name="middleName" label="Middle Name" placeholder="Enter Middle Name" maxLength={45} required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DateInput control={control} name="dateOfBirth" label="Date of Birth" placeholder="Enter Date of Birth" required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SelectInput control={control} items={genders} name="gender" label="Gender" placeholder="Select Gender" required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <EmailInput control={control} name="emailAddress" label="Email" placeholder="Enter Email Address" maxLength={45} required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PhoneNumberInput control={control} name="mobileNumber" label="Mobile Number" placeholder="Enter Mobile Number" required />
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
            <Grid item xs={12} sm={6} md={4}>
              <SelectInput
                control={control}
                items={barangayQuery.data?.message.map((p) => ({ value: p.id, text: p.baranggay })) || []}
                name="baranggayId"
                label="Barangay"
                placeholder="Select Barangay"
                required
                disabled={!watchCity}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInput control={control} name="address" label="Address" placeholder="Enter Address" maxLength={45} required />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'end' }}>
            <Button component={Link} to="../contestants" sx={{ px: 4 }}>
              Back
            </Button>
            <LoadingButton type="submit" variant="contained" loading={createMutation.isLoading} sx={{ ml: 2, px: 4 }}>
              Submit
            </LoadingButton>
          </Box>
        </form>
      </LocalizationProvider>
      <Dialog {...dialogProps}>
        <SuccessDialogContent content={content} onClose={() => navigate('../contestants')} />
      </Dialog>
      <Dialog {...errorDialogProps}>
        <ErrorDialogContent content={errorContent} onClose={errorToggleDialog} />
      </Dialog>
    </Container>
  )
}

Create.propTypes = {}

export default Create
