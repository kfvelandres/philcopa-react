import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  SwipeableDrawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  styled,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Groups2Icon from '@mui/icons-material/Groups2'
import PortraitIcon from '@mui/icons-material/Portrait'
import HandymanIcon from '@mui/icons-material/Handyman'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { logoutSuccess } from 'src/store/actions/authActions'
import { connect } from 'react-redux'

const drawerWidth = 260

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'isMobile' })(({ theme, open, isMobile }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  // ...openedMixin(theme),
  // '& .MuiDrawer-paper': openedMixin(theme),
  ...(!isMobile && {
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
}))

const menu = [
  { text: 'Dashboard', icon: DashboardIcon, path: '/' },
  {
    text: 'Users',
    icon: PeopleAltIcon,
    path: '/users',
    role: 'ADMIN',
    children: [{ text: 'Invite User', icon: AddCircleOutlineIcon, path: '/invite' }],
  },
  { text: 'Contestants', icon: Groups2Icon, path: '/contestants' },
  { text: 'Profile', icon: PortraitIcon, path: '/profile' },
  { text: 'Competition Mechanics', icon: HandymanIcon, path: '/competition/mechanics', role: 'ADMIN' },
  { text: 'Settings', icon: SettingsIcon, path: '/settings' },
]

const Sidebar = ({ role, isMobile, open, onOpen, onClose, logout }) => {
  const [show, setShow] = useState(false)

  return (
    <React.Fragment>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        isMobile={isMobile}
        PaperProps={{ sx: { width: drawerWidth } }}>
        <Toolbar />
        <List>
          {menu
            .filter((m) => !m.role || m.role === role)
            .map((m) => (
              <React.Fragment key={m.text}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    component={Link}
                    to={m.path}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}>
                      <m.icon />
                    </ListItemIcon>
                    <ListItemText primary={m.text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                {m.children?.map((c) => (
                  <ListItem key={c.text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      component={Link}
                      to={c.path}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}>
                        <c.icon />
                      </ListItemIcon>
                      <ListItemText primary={c.text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </React.Fragment>
            ))}
        </List>
        <List sx={{ mt: 'auto' }}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => setShow(true)}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Dialog open={show} onClose={() => setShow(false)}>
        <DialogContent>
          <DialogContentText>Are you sure you want to logout?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShow(false)}>Cancel</Button>
          <Button onClick={logout}>Logout</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  role: PropTypes.string,
  isMobile: PropTypes.bool,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  logout: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutSuccess()),
  }
}

export default connect(null, mapDispatchToProps)(Sidebar)
