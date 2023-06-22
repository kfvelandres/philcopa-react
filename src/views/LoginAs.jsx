import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'

const LoginAs = () => {
  return (
    <Box>
      <Button component={Link} to="/login">
        Coordinator
      </Button>
      <Button component={Link} to="/judges/login">
        For Judges
      </Button>
      <Button component={Link} to="/login">
        Admin
      </Button>
    </Box>
  )
}

export default LoginAs
