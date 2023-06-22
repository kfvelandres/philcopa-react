import React from 'react'
import PropTypes from 'prop-types'
import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material'

const SuccessDialogContent = ({ content, onClose }) => {
  return (
    <React.Fragment>
      <DialogContent>
        <DialogContentText variant="h6" color="success.main">
          {content || 'Successfully saved changes'}
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

SuccessDialogContent.propTypes = {
  content: PropTypes.string,
  onClose: PropTypes.func,
}

export default SuccessDialogContent
