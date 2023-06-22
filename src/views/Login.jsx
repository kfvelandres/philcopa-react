import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Alert, Box, Button, Dialog, Paper, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Image } from 'mui-image'

import { EmailInput, PasswordInput } from 'src/components/inputs'
import ErrorDialogContent from 'src/components/dialogs/ErrorDialogContent'
import useDialog from 'src/hooks/useDialog'
import useAxios from 'src/hooks/useAxios'
import { GET_PROFILE_API_URL, LOGIN_API_URL } from 'src/config/apiRoutes'
import { loginSuccess } from 'src/store/actions/authActions'

import logo from 'src/assets/brand/phcopa-logo.png'

const Login = ({ user, login }) => {
  const navigate = useNavigate()
  const { content, dialogProps, toggleDialog } = useDialog()
  const { get, post } = useAxios()

  //const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const userDetailsQuery = useQuery({
    queryKey: ['user_details', userId],
    queryFn: () => get(GET_PROFILE_API_URL.replace('{id}', userId)),
    enabled: !!userId,
    onSuccess: (response) => {
      if (response.status === 200) {
        login(response.message)
      }
    },
  })
  const isLoading = userDetailsQuery.isInitialLoading || userDetailsQuery.isRefetching

  const loginMutation = useMutation({
    mutationFn: (credentials) => {
      return post(LOGIN_API_URL, credentials)
    },
    onSuccess: (response) => {
      if (response.data?.success) {
        setUserId(response.data.id)
      } else {
        toggleDialog(response.data.message)
      }
    },
  })

  const onSubmit = (data) => {
    loginMutation.mutate({ ...data })
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ width: 400, maxWidth: '100%', p: 3, m: 'auto' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Link to="/" style={{ color: '#000', textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
              <Image src={logo} duration={0} width={70} />
            </Link>
            <Typography component="h1" variant="h4">
              Login
            </Typography>
            <Typography variant="body2" color="grey" sx={{ fontStyle: 'italic', mb: 3 }}>
              Please enter your credentials below
            </Typography>
          </Box>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 2 }}>
              <EmailInput
                control={control}
                name="emailAddress"
                label="Email Address"
                placeholder="Enter Email Address"
                maxLength={45}
                size="large"
                required
                disabled={loginMutation.isLoading || isLoading}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <PasswordInput
                control={control}
                name="password"
                label="Password"
                placeholder="Enter Password"
                maxLength={15}
                size="large"
                required
                disabled={loginMutation.isLoading || isLoading}
              />
            </Box>
            <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={loginMutation.isLoading || isLoading}>
              Login
            </LoadingButton>
          </form>
        </Paper>
      </Box>
      <Dialog {...dialogProps}>
        <ErrorDialogContent content={content} onClose={toggleDialog} />
      </Dialog>
    </React.Fragment>
  )
}

Login.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(loginSuccess(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
