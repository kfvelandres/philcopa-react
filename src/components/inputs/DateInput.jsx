import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

const DateInput = ({ control, id, name, label, placeholder, noValidation, required, disabled, size, rounded }) => {
  const validations = { pastDate: (v) => dayjs(v) < dayjs() || `Date should not be a future date` }

  const {
    field,
    fieldState: { error, invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name: name,
    control,
    rules: { required: required, validate: noValidation ? null : validations },
  })

  return (
    <DesktopDatePicker
      id={id ? id : name}
      label={label}
      format="MM/DD/YYYY"
      slotProps={{
        textField: {
          size: size,
          placeholder: placeholder,
          sx: {
            width: '100%',
            ...(rounded && {
              '.MuiFormLabel-root': {
                pl: 2,
              },
              '.MuiInputBase-root': {
                pl: 1,
                pr: 3,
                borderRadius: 100,
              },
              '.MuiOutlinedInput-notchedOutline': {
                pl: 2.5,
              },
            }),
          },
          error: error !== undefined,
          required: required,
        },
      }}
      onChange={(v) => field.onChange(v ? v.format() : '')} // send value to hook form
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value ? dayjs(field.value) : ''} // input value
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
      disabled={disabled}
      focused
    />
  )
}

DateInput.propTypes = {
  control: PropTypes.object.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  noValidation: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  rounded: PropTypes.bool,
}

export default DateInput
