import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Box, Button, Paper, Stack, Typography, styled } from '@mui/material'
import { Image } from 'mui-image'

import Dashboard from './Dashboard'

import logo from 'src/assets/brand/phcopa-logo.png'

const RoundedButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.getContrastText(purple[500]),
  // backgroundColor: purple[500],
  // '&:hover': {
  //   backgroundColor: purple[700],
  // },
  borderRadius: 50,
  paddingTop: 15,
  paddingBottom: 15,
}))

const Index = ({ user }) => {
  if (user) {
    // if (user.role === 'Administrator') return <Navigate to="/admin" replace />
    // else return <Navigate to="/contestants" replace />
    return <Dashboard />
  }

  return (
    <Box sx={{ px: 2, py: 4, m: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        {/* <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 4 }}>
          Login as
        </Typography> */}
        <Stack direction="row" sx={{ mb: 4 }}>
          <Box sx={{ mr: 'auto' }}>
            <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
              Login As
            </Typography>
            <Typography variant="body2" color="grey" sx={{ fontStyle: 'italic' }}>
              Please select your role
            </Typography>
          </Box>
          <Image src={logo} duration={0} width={70} />
        </Stack>
        <RoundedButton component={Link} to="/login" fullWidth variant="contained" size="large" sx={{ mb: 2 }}>
          Admin/Coordinator
        </RoundedButton>
        <RoundedButton component={Link} to="/judges/login" fullWidth variant="contained" size="large" sx={{ mb: 2 }}>
          Judge
        </RoundedButton>
      </Paper>
    </Box>
  )
}

Index.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Index)
