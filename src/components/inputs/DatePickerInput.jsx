import React from 'react'
import PropTypes from 'prop-types'
import { Box, OutlinedInput } from '@mui/material'
import { useController } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'

const DatePickerInput = ({ control, id, name, label, placeholder, required }) => {
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
    <DatePicker
      label={label}
      slots={{
        textField: (props) => {
          const { inputProps, InputProps, ownerState, inputRef, error, ...other } = props
          return (
            <Box ref={InputProps?.ref}>
              <OutlinedInput
                id={id ? id : name}
                name={name}
                placeholder={placeholder}
                sx={{
                  borderRadius: 100,
                }}
                inputProps={inputProps}
                endAdornment={InputProps?.endAdornment}
                inputRef={inputRef}
              />
            </Box>
          )
        },
      }}
      onChange={field.onChange} // send value to hook form
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value ? field.value : ''} // input value
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
      error={error !== undefined}
    />
  )
}

DatePickerInput.propTypes = {
  control: PropTypes.object.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
}

export default DatePickerInput
