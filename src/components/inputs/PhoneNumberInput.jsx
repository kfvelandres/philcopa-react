import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'
import { useController } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { ...other } = props
  return (
    <IMaskInput
      {...other}
      mask="+63 000 000 0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => props.onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

TextMaskCustom.propTypes = {
  onChange: PropTypes.func,
}

const PhoneNumberInput = ({ control, id, name, label, placeholder, required, disabled, size, rounded }) => {
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
      type="tel"
      label={label}
      placeholder={placeholder}
      inputProps={{
        sx: {
          ...(rounded && { px: 2.5 }),
          // '&:-webkit-autofill': {
          //   WebkitBoxShadow: '0 0 0 1000px white inset',
          // },
        },
      }}
      InputLabelProps={{
        //required,
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

        inputComponent: TextMaskCustom,
      }}
      size={size}
      fullWidth
      onChange={field.onChange} // send value to hook form
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value ? (field.value[0] === '0' ? field.value.substring(1) : field.value) : ''} // input value
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
      error={error !== undefined}
      required={required}
      disabled={disabled}
    />
  )
}

PhoneNumberInput.propTypes = {
  control: PropTypes.object.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  rounded: PropTypes.bool,
}

export default PhoneNumberInput
