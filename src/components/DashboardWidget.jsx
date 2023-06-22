import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Paper, Typography } from '@mui/material'

const DashboardWidget = ({ title, count, link, bg }) => {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: `url(${bg})`,
          backgroundSize: 'cover',
          borderRadius: 3,
          height: '100%',
          width: '100%',
          p: 4,
        }}>
        <Typography variant="h5" color="white.main" sx={{ mb: 0 }}>
          {count}
        </Typography>
        <Typography variant="h6" color="white.main">
          {title}
        </Typography>
      </Paper>
    </Link>
  )
}

DashboardWidget.propTypes = {
  title: PropTypes.string,
  count: PropTypes.string,
  link: PropTypes.string,
  bg: PropTypes.string,
}

export default DashboardWidget
