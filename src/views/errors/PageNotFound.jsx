import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const PageNotFound = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
      <Paper sx={{ p: 4, m: 'auto', textAlign: 'center' }}>
        <Stack direction="row" justifyContent="center" sx={{ mb: 4 }}>
          <Typography variant="h1" color="error">
            4
          </Typography>
          <ErrorOutlineIcon color="error" sx={{ fontSize: 120 }} />
          <Typography variant="h1" color="error">
            4
          </Typography>
        </Stack>
        <Typography component="h1" variant="h4">
          Oops! Are you lost? There's no competition here.
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          The page you are looking for does not exist. You can explore more from our homepage.
        </Typography>
        <Button component={Link} to="/" variant="contained" size="large" sx={{ px: 5 }}>
          HOME
        </Button>
      </Paper>
    </Box>
  )
}

export default PageNotFound
