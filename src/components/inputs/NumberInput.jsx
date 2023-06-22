import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'

const NumberInput = ({ control, id, name, label, placeholder, maxLength, required, disabled, size, rounded }) => {
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
      type="text"
      label={label}
      placeholder={placeholder}
      sx={{
        borderRadius: 100,
      }}
      inputProps={{
        maxLength: maxLength,
        sx: {
          ...(rounded && { px: 2.5 }),
          // '&:-webkit-autofill': {
          //   WebkitBoxShadow: '0 0 0 1000px white inset',
          // },
        },
      }}
      InputLabelProps={{
        sx: {
          ...(rounded && { pl: 2 }),
        },
      }}
      InputProps={{
        sx: {
          ...(rounded && {
            borderRadius: 100,
            //px: 1,
            '.MuiOutlinedInput-notchedOutline': {
              pl: 2.5,
            },
          }),
        },
      }}
      size={size}
      fullWidth
      onChange={(e) => {
        const filtered = e.target.value.replace(/\D/g, '')
        field.onChange(filtered)
      }} // send value to hook form
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value ? field.value : ''} // input value
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
      error={error !== undefined}
      required={required}
      disabled={disabled}
      {...(label ? { focused: true } : {})}
    />
  )
}

NumberInput.propTypes = {
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
}

export default NumberInput
