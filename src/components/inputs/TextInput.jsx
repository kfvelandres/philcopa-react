import React from 'react'
import PropTypes from 'prop-types'
import { InputAdornment, TextField } from '@mui/material'
import { useController } from 'react-hook-form'

const TextInput = ({ control, id, name, label, placeholder, maxLength, required, disabled, size, rounded, startIcon, endIcon }) => {
  const {
    field,
    fieldState: { error, invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name: name,
    control,
    rules: { required: required },
  })

  return (
    <TextField
      id={id ? id : name}
      name={name}
      label={label}
      placeholder={placeholder}
      inputProps={{
        maxLength: maxLength,
        sx: {
          ...(rounded && { px: 2.5 }),
        },
        readOnly: false,
      }}
      InputLabelProps={{
        sx: {
          ...(rounded && { pl: 2 }),
        },
      }}
      InputProps={{
        ...(startIcon && { startAdornment: <InputAdornment position="start">{startIcon}</InputAdornment> }),
        ...(endIcon && { endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment> }),
        sx: {
          ...(rounded && {
            borderRadius: 100,
            '.MuiOutlinedInput-notchedOutline': {
              px: 2.5,
            },
          }),
        },
        readOnly: false,
      }}
      size={size}
      fullWidth
      onChange={field.onChange} // send value to hook form
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value ? field.value : ''} // input value
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
      error={error !== undefined}
      required={required}
      disabled={disabled}
    />
  )
}

TextInput.propTypes = {
  control: PropTypes.object.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  rounded: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
}

export default TextInput
