import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useController } from 'react-hook-form'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const PasswordInput = ({ control, id, name, label, placeholder, maxLength, matchTo, required }) => {
  const [show, setShow] = useState(false)

  const {
    field,
    fieldState: { error, invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name: name,
    control,
    rules: { required: required, validate: matchTo ? { notMatch: (v) => v === matchTo || "Passwords didn't match. Try again." } : null },
  })

  return (
    <TextField
      id={id ? id : name}
      name={name}
      type={show ? 'text' : 'password'}
      label={label}
      placeholder={placeholder}
      inputProps={{
        maxLength: maxLength,
      }}
      InputLabelProps={{}}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton type="button" edge="end" onClick={() => setShow(!show)}>
              {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      onChange={field.onChange} // send value to hook form
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value ? field.value : ''} // input value
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
      error={error !== undefined}
      required={required}
    />
  )
}

PasswordInput.propTypes = {
  control: PropTypes.object.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  matchTo: PropTypes.string,
  required: PropTypes.bool,
}

export default PasswordInput
