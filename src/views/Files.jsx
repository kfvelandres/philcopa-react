import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormHelperText,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useForm } from 'react-hook-form'

import useDialog from 'src/hooks/useDialog'
import { FileInput } from 'src/components/inputs'

import file1 from 'src/assets/images/file1.jpg'
import file2 from 'src/assets/images/file2.jpg'
import file3 from 'src/assets/images/file3.jpg'
import file4 from 'src/assets/images/file4.jpg'
import file5 from 'src/assets/images/file5.jpg'

const sampleFiles = [file1, file2, file3, file4, file5]

const Files = () => {
  const { dialogProps, toggleDialog } = useDialog()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {}

  return (
    <React.Fragment>
      <Container sx={{ py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Typography component="h1" variant="h5">
            Files
          </Typography>
          <Button variant="contained" endIcon={<AddCircleOutlineIcon />} onClick={toggleDialog}>
            Add File
          </Button>
        </Stack>
        <ImageList cols={3} gap={24}>
          {sampleFiles.map((item, index) => (
            <ImageListItem key={index}>
              <img src={`${item}?w=164&h=164&fit=crop&auto=format`} srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`} alt="" loading="lazy" />
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Button size="small">Download</Button>
                <Button size="small" color="error">
                  Delete
                </Button>
              </Stack>
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
      <Dialog {...dialogProps}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>Please select a file to upload</DialogContentText>
            <FileInput control={control} name="file" label="File" placeholder="Select a file" required />
            <FormHelperText>File size should not exceed 2MB. Allowed file types are JPG, JPEG, or PNG only.</FormHelperText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleDialog}>Cancel</Button>
            <Button type="submit">Upload</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}

Files.propTypes = {}

export default Files
