import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const ProfileInfoProperty = ({ propertyName, propertyValue }) => {
  return (
    <React.Fragment>
      <Typography component="h6" variant="subtitle2">
        {propertyName}
      </Typography>
      {propertyValue || (typeof propertyValue === 'number' && !isNaN(propertyValue) > 0) ? (
        <Typography component="p" variant="h6">
          {propertyValue}
        </Typography>
      ) : (
        <Typography component="p" variant="h6" color="grey" sx={{ fontWeight: 200, fontStyle: 'italic' }}>
          N/A
        </Typography>
      )}
    </React.Fragment>
  )
}

ProfileInfoProperty.propTypes = {
  propertyName: PropTypes.string,
  propertyValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default ProfileInfoProperty
