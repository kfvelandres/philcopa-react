import { useSelector } from 'react-redux'
import { Box, Container, Dialog, Grid, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

import { EmailInput, PhoneNumberInput, SelectInput } from 'src/components/inputs'
import useDialog from 'src/hooks/useDialog'
import { roles } from 'src/dropdownItems'
import SuccessDialogContent from 'src/components/dialogs/SuccessDialogContent'

import useAxios from 'src/hooks/useAxios'
import { INVITE_USER_API_URL } from 'src/config/apiRoutes'

const Invite = () => {
  const user = useSelector((state) => state.auth.user)
  const { content, dialogProps, toggleDialog } = useDialog()
  const { post } = useAxios()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const inviteMutation = useMutation({
    mutationFn: (data) => {
      return post(INVITE_USER_API_URL, data)
    },
    onSuccess: (response) => {
      if (response.data?.success) {
        toggleDialog('Invitation successfull sent')
        reset()
      }
    },
  })

  const onSubmit = (data) => {
    inviteMutation.mutate({ ...data, invitedById: user.id })
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Invite User
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1} direction="row" alignItems="center" sx={{ mb: 2 }}>
            <AccountCircleIcon />
            <Typography variant="h6" noWrap>
              User Information
            </Typography>
          </Stack>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <EmailInput control={control} name="emailAddress" label="Email Address" placeholder="Enter Email Address" maxLength={45} required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PhoneNumberInput control={control} name="mobileNumber" label="Mobile Number" placeholder="Enter Mobile Number" required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SelectInput control={control} items={roles} name="role" label="Role" placeholder="Select Role" required />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'end' }}>
            <LoadingButton type="submit" variant="contained" loading={inviteMutation.isLoading} sx={{ px: 4 }}>
              Invite
            </LoadingButton>
          </Box>
        </form>
      </LocalizationProvider>
      <Dialog {...dialogProps}>
        <SuccessDialogContent content={content} onClose={toggleDialog} />
      </Dialog>
    </Container>
  )
}

export default Invite
