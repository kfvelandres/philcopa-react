import React from 'react'
import PropTypes from 'prop-types'
import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material'

const ErrorDialogContent = ({ content, onClose }) => {
  return (
    <React.Fragment>
      <DialogContent>
        <DialogContentText variant="h6" color="error">
          {content || 'There was an error logging in.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button variant="contained" fullWidth onClick={onClose}>
          Ok
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

ErrorDialogContent.propTypes = {
  content: PropTypes.string,
  onClose: PropTypes.func,
}

export default ErrorDialogContent
