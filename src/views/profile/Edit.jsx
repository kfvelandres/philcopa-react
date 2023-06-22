import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'

const Edit = (props) => {
  return (
    <Container sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
      </Stack>
      <Box sx={{ textAlign: 'end' }}>
        <Button component={Link} to="../profile" sx={{ px: 4 }}>
          Back
        </Button>
        <LoadingButton type="submit" variant="contained" loading={false} sx={{ ml: 2, px: 4 }}>
          Save
        </LoadingButton>
      </Box>
    </Container>
  )
}

Edit.propTypes = {}

export default Edit
