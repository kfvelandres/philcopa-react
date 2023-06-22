import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { useController } from 'react-hook-form'

const SearchInput = ({ control, id, name, label, placeholder, maxLength, required, disabled, size, rounded, onClear }) => {
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
          // '&:-webkit-autofill': {
          //   WebkitBoxShadow: '0 0 0 1000px white inset',
          // },
        },
        readOnly: false,
      }}
      InputLabelProps={{
        required,
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
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end" {...(!field.value && { sx: { display: 'none' } })}>
            <IconButton type="button" edge="end" onClick={onClear}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      size={size}
      fullWidth
      onChange={field.onChange} // send value to hook form
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value ? field.value : ''} // input value
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
      error={error !== undefined}
      disabled={disabled}
      {...(label ? { focused: true } : {})}
    />
  )
}

SearchInput.propTypes = {
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
  onClear: PropTypes.func,
}

export default SearchInput
