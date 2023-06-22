import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Box, Button, Paper } from '@mui/material'

import { TextInput } from 'src/components/inputs'

const Login = () => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    navigate('/competition/' + data.competitionCode)
  }

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
      <Paper sx={{ width: 400, maxWidth: '100%', p: 3, m: 'auto' }}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 3 }}>
            <TextInput
              control={control}
              name="competitionCode"
              label="Competition Code"
              placeholder="Enter Competition Code"
              maxLength={15}
              size="large"
              required
            />
          </Box>
          <Button type="submit" fullWidth variant="contained" size="large" sx={{ mb: 1 }}>
            Enter
          </Button>
          <Button component={Link} to="/" fullWidth variant="outline" size="large">
            Back
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default Login
