import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const LoaderOverlay = ({ label, translucent, coverAll }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: translucent ? 0.4 : 1,
        zIndex: coverAll ? 1500 : 1099,
      }}>
      <Box sx={{ textAlign: 'center', margin: 'auto' }}>
        <CircularProgress />
        {label && (
          <Typography variant="body1" sx={{ mt: 1 }}>
            {label}
          </Typography>
        )}
      </Box>
    </Paper>
  )
}

LoaderOverlay.propTypes = {
  label: PropTypes.string,
  translucent: PropTypes.bool,
  coverAll: PropTypes.bool,
}

export default LoaderOverlay
