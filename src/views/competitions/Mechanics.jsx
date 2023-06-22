import React from 'react'
import PropTypes from 'prop-types'
import { Container, Typography } from '@mui/material'

const Mechanics = (props) => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Competition Mechanics
      </Typography>
    </Container>
  )
}

Mechanics.propTypes = {}

export default Mechanics
