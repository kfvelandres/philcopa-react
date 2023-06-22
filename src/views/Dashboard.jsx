import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import DashboardWidget from 'src/components/DashboardWidget'

import bg1 from 'src/assets/images/widget-bg-1.png'
import bg2 from 'src/assets/images/widget-bg-2.png'
import bg3 from 'src/assets/images/widget-bg-3.png'

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <Container sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Hi {user.firstName}!
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} lg={4}>
          <DashboardWidget title="Competition Maintenance" link="/competitions" bg={bg1}></DashboardWidget>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DashboardWidget title="Downloadables" count="3" link="/files" bg={bg2}></DashboardWidget>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DashboardWidget title="Contestants" count="100" link="/contestants" bg={bg3}></DashboardWidget>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
