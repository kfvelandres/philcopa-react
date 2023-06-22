import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useController } from 'react-hook-form'

const SelectInput = ({ control, items, id, name, label, placeholder, required, disabled, size }) => {
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
    <FormControl fullWidth size={size}>
      <InputLabel id={id ? id : name} required={label ? required : false} error={error !== undefined}>
        {label}
      </InputLabel>
      <Select
        id={id ? id : name}
        name={name}
        label={label}
        onChange={field.onChange} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        //value={field.value && items?.length && items.find((i) => i.value === field.value) ? field.value : '0'} // input value
        value={field.value && items?.length && items.find((i) => i.value === field.value) ? field.value : ''} // input value
        inputRef={field.ref} // send input ref, so we can focus on input when error appear
        error={error !== undefined}
        required={required}
        disabled={disabled}>
        {/* <MenuItem disabled value="0">
          <Typography color="grey.500">{placeholder}</Typography>
        </MenuItem> */}
        {items?.map((i) => (
          <MenuItem key={i.value} value={i.value}>
            {i.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

SelectInput.propTypes = {
  control: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
}

export default SelectInput
