import { Suspense, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppBar, Box, IconButton, LinearProgress, Toolbar, Typography, styled, useMediaQuery } from '@mui/material'
import { Menu } from '@mui/icons-material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { Image } from 'mui-image'

import { toggleColorScheme } from 'src/store/actions/siteActions'
import Sidebar from './Sidebar'
import { logoutSuccess } from 'src/store/actions/authActions'

import logo from 'src/assets/brand/phcopa-logo.png'
import logoWhite from 'src/assets/brand/phcopa-logo-white.png'

const drawerWidth = 260

const Header = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile',
})(({ theme, open, isMobile }) => ({
  ...(!isMobile && {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
}))

const Logo = styled(Image)(({ theme }) => ({
  maxHeight: 50,
  maxWidth: 50,
  marginRight: 'auto',
}))

const PrivateLayout = ({ isAuthenticated, role, prefersColorScheme, toggleColorScheme, logout }) => {
  const isMobile = useMediaQuery('(max-width:600px)')
  const [open, setOpen] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, overflowX: 'hidden' }}>
      <Header position="fixed" open={open} isMobile={isMobile}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" onClick={() => setOpen(!open)}>
            <Menu />
          </IconButton>

          <Logo src={prefersColorScheme === 'dark' ? logoWhite : logo} duration={0} />
          {/* <Typography component={Link} to="/" variant="h6" color="white.main" sx={{ textDecoration: 'none', mr: 'auto' }}>
            Philcopa
          </Typography> */}

          <IconButton onClick={toggleColorScheme} color="inherit">
            {prefersColorScheme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </Header>
      <Sidebar role={role} isMobile={isMobile} open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} logout={logout} />
      {/* <Main open={open}> */}
      {/* <Box component="main" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}> */}
      <Box component="main" sx={{ flexGrow: 1, overflowX: 'auto' }}>
        <Toolbar></Toolbar>
        <Suspense fallback={<LinearProgress color="gray" />}>
          <Outlet />
        </Suspense>
      </Box>
      {/* </Main> */}
    </Box>
  )
}

PrivateLayout.propTypes = {
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string,
  prefersColorScheme: PropTypes.string,
  toggleColorScheme: PropTypes.func,
  logout: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    prefersColorScheme: state.settings.prefersColorScheme,
    isAuthenticated: state.auth.user !== null,
    role: state.auth.user?.role,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    toggleColorScheme: () => dispatch(toggleColorScheme()),
    logout: () => dispatch(logoutSuccess()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateLayout)
