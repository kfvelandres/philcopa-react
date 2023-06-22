import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Button, Dialog, Grid, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PlaceIcon from '@mui/icons-material/Place'
import KeyIcon from '@mui/icons-material/Key'
import { Image } from 'mui-image'
import { useFieldArray, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'

import { EmailInput, PasswordInput, PhoneNumberInput, TextInput } from 'src/components/inputs'
import useDialog from 'src/hooks/useDialog'
import AreaDialog from 'src/components/AreaDialog'
import LoaderOverlay from 'src/components/LoaderOverlay'
import ErrorDialogContent from 'src/components/dialogs/ErrorDialogContent'
import Table from 'src/components/Table'
import areas from 'src/columns/areas'

import useAxios from 'src/hooks/useAxios'
import { CREATE_USER_API_URL, GET_PROFILE_API_URL } from 'src/config/apiRoutes'
import SuccessDialogContent from 'src/components/dialogs/SuccessDialogContent'

import logo from 'src/assets/brand/phcopa-logo.png'
import bg from 'src/assets/images/reg-bg.jpg'

const Register = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const { content, dialogProps, toggleDialog } = useDialog()
  const { content: errorContent, dialogProps: errorDialogProps, toggleDialog: errorToggleDialog } = useDialog({ maxWidth: 'xs' })
  const { get, post } = useAxios()

  const [areaDialog, setAreaDialog] = useState({ open: false })

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'areas',
    rules: { required: true },
  })

  const userDetailsQuery = useQuery({
    queryKey: ['user_details', id],
    queryFn: () => get(GET_PROFILE_API_URL.replace('{id}', id)),
    refetchOnWindowFocus: false,
    enabled: !!id,
    retry: 1,
    onSuccess: (response) => {
      if (response.status === 200) {
        setValue('id', response.message.id)
        setValue('emailAddress', response.message.emailAddress)
        setValue('mobileNumber', response.message.mobileNumber)
      }
    },
  })

  const registerMutation = useMutation({
    mutationFn: (data) => {
      return post(CREATE_USER_API_URL, data)
    },
    onSuccess: (response) => {
      if (response.data?.success) {
        toggleDialog(response.data.message)
      }
    },
  })

  const handleUpdate = (area) => {
    const regionProvince = fields.filter((f) => f.region.id === area.region.id && f.province.id === area.province.id)
    const regionProvinceCity = fields.filter((f) => f.region.id === area.region.id && f.province.id === area.province.id && f.city.id === area.city.id)

    if (regionProvince.find((f) => f.city.id === area.city.id && f.barangay.id === area.barangay.id)) {
      errorToggleDialog('This area is already added!')
    } else if (regionProvince.find((f) => f.city.id && !area.city.id)) {
      errorToggleDialog('There is already an area with specific city!')
    } else if (regionProvince.find((f) => !f.city.id && area.city.id)) {
      errorToggleDialog('This city is already covered!')
    } else if (regionProvinceCity.find((f) => f.barangay.id && !area.barangay.id)) {
      errorToggleDialog('There is already an area with specific barangay!')
    } else if (regionProvinceCity.find((f) => !f.barangay.id && area.barangay.id)) {
      errorToggleDialog('This barangay is already covered!')
    } else {
      append(area)
      setAreaDialog((prevState) => ({ ...prevState, open: false }))
    }
  }

  const onSubmit = (data) => {
    const userData = {
      ...data,
      areas: data.areas.map((a) => ({ regionId: a.region.id, provinceId: a.province.id, cityId: a.city.id, baranggay: a.barangay.id })),
    }
    registerMutation.mutate(userData)
  }
  const handleEditArea = (data, index) => {
    setAreaDialog({ open: true, data: data })
  }
  const handleRemoveArea = (id, index) => {
    remove(index)
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          background: `url(${bg}) no-repeat center`,
          backgroundSize: 'cover',
          filter: 'blur(7px)',
          position: 'fixed',
          top: -7,
          left: -7,
          right: -7,
          bottom: -7,
          zIndex: 1,
        }}></Box>
      <Box sx={{ px: 2, py: 4, m: 'auto', zIndex: 2 }}>
        <Box sx={{ backgroundColor: 'white.main', position: 'relative', p: 4, margin: 'auto' }}>
          <Stack direction="row" sx={{ mb: 4 }}>
            <Box sx={{ mr: 'auto' }}>
              <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
                Registration
              </Typography>
              <Typography variant="body2" color="grey" sx={{ fontStyle: 'italic' }}>
                Please complete your registration below
              </Typography>
            </Box>
            <Image src={logo} duration={0} width={70} />
          </Stack>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
                  <TextInput control={control} name="middleName" label="Middle Name" placeholder="Enter Middle Name" maxLength={45} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <EmailInput control={control} name="emailAddress" label="Email" placeholder="Enter Email Address" maxLength={45} disabled />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <PhoneNumberInput control={control} name="mobileNumber" label="Mobile Number" placeholder="Enter Mobile Number" required />
                </Grid>
              </Grid>
              <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: 2 }}>
                <PlaceIcon />
                <Typography variant="h6" noWrap>
                  Area(s)
                </Typography>
              </Stack>
              <Table data={fields} columns={areas(handleEditArea, handleRemoveArea)} />
              {errors.areas && (
                <Typography variant="subtitle2" color="error">
                  Please add at least one area
                </Typography>
              )}
              <Box sx={{ textAlign: 'center', mt: 2, mb: 3 }}>
                <Button variant="text" sx={{ fontSize: 16 }} onClick={() => setAreaDialog({ open: true })}>
                  Add Area
                </Button>
              </Box>
              <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: 2 }}>
                <KeyIcon />
                <Typography variant="h6" noWrap>
                  Password
                </Typography>
              </Stack>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <PasswordInput control={control} name="password" label="Password" placeholder="Enter Password" maxLength={15} required />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <PasswordInput
                    control={control}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    maxLength={15}
                    matchTo={getValues('password')}
                    required
                  />
                </Grid>
              </Grid>
              <Box sx={{ textAlign: 'end' }}>
                <LoadingButton type="submit" variant="contained" loading={registerMutation.isLoading} sx={{ ml: 2, px: 4 }}>
                  Submit
                </LoadingButton>
              </Box>
            </form>
          </LocalizationProvider>
          <AreaDialog
            data={areaDialog.data}
            open={areaDialog.open}
            onClose={() => setAreaDialog((prevState) => ({ ...prevState, open: false }))}
            onUpdate={handleUpdate}
          />
          <Dialog {...dialogProps}>
            <SuccessDialogContent content={content} onClose={() => navigate('/login')} />
          </Dialog>
          <Dialog {...errorDialogProps}>
            <ErrorDialogContent content={errorContent} onClose={errorToggleDialog} />
          </Dialog>
          {userDetailsQuery.isLoading && <LoaderOverlay translucent />}
        </Box>
      </Box>
    </React.Fragment>
  )
}

Register.propTypes = {}

export default Register
