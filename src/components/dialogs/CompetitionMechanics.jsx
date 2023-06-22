import React from 'react'
import PropTypes from 'prop-types'
import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material'

const CompetitionMechanics = ({ onClose }) => {
  return (
    <React.Fragment>
      <DialogContent>
        <DialogContentText variant="h6">There was an error logging in.</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button variant="contained" fullWidth onClick={onClose}>
          Solo
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

CompetitionMechanics.propTypes = {
  onClose: PropTypes.func,
}

export default CompetitionMechanics
