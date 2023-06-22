import { useState } from 'react'
import PropTypes from 'prop-types'

const useDialog = (props) => {
  const toggleDialog = (content) => {
    if (typeof content === 'string') {
      setContent(content || '')
    }
    setDialogProps((prevState) => ({ ...prevState, open: !prevState.open }))
  }

  const [dialogProps, setDialogProps] = useState({ ...props, open: false, onClose: toggleDialog })
  const [content, setContent] = useState('')

  return { content, dialogProps, toggleDialog }
}

useDialog.propTypes = {
  names: PropTypes.array,
}

export default useDialog
