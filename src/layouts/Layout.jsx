import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, LinearProgress } from '@mui/material'

const Layout = () => {
  return (
    <Suspense fallback={<LinearProgress color="gray" />}>
      <Box sx={{ display: 'flex', flexGrow: 1, overflowX: 'hidden' }}>
        <Outlet />
      </Box>
    </Suspense>
  )
}

export default Layout
