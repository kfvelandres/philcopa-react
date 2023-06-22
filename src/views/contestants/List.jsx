import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import Table from 'src/components/Table'
import contestants from 'src/columns/contestants'
import { SelectInput, TextInput } from 'src/components/inputs'
import { contestantTypes, talents } from 'src/dropdownItems'
import useDialog from 'src/hooks/useDialog'

import useAxios from 'src/hooks/useAxios'
import { GET_BARANGAY_API_URL, GET_CITY_API_URL, GET_CONTESTANTS_API_URL, GET_PROVINCE_API_URL } from 'src/config/apiRoutes'

const List = () => {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const { dialogProps, toggleDialog } = useDialog()
  const { get } = useAxios()

  const [openMenu, setOpenMenu] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState({ open: false })

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const watchProvince = watch('provinceId')
  const watchCity = watch('cityId')

  const listQuery = useQuery({
    queryKey: ['contestants-list'],
    queryFn: () => get(GET_CONTESTANTS_API_URL),
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const provinceQuery = useQuery({
    queryKey: ['province'],
    queryFn: () => get(GET_PROVINCE_API_URL.replace('{region}', user.region.value)),
    refetchOnWindowFocus: false,
  })

  const cityQuery = useQuery({
    queryKey: ['city', watchProvince],
    queryFn: () => get(GET_CITY_API_URL.replace('{province}', provinceQuery.data?.message.find((p) => p.id === watchProvince)?.province)),
    refetchOnWindowFocus: false,
    enabled: !!provinceQuery.data && !!watchProvince,
  })

  const barangayQuery = useQuery({
    queryKey: ['barangay', watchCity],
    queryFn: () =>
      get(
        GET_BARANGAY_API_URL.replace('{province}', provinceQuery.data?.message.find((p) => p.id === watchProvince)?.province).replace(
          '{city}',
          cityQuery.data?.message.find((c) => c.id === watchCity).city,
        ),
      ),
    refetchOnWindowFocus: false,
    enabled: !!provinceQuery.data && !!cityQuery.data && !!watchProvince && !!watchCity,
  })

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setOpenMenu(null)
  }

  const onSubmit = (data) => {}

  const onView = (data, index) => {
    navigate(data.id)
  }
  const onDelete = (id, index) => {
    setDeleteDialog({ open: true, id: id })
  }
  const handleDelete = () => {
    deleteDialog.id
  }

  const open = Boolean(openMenu)

  return (
    <Container sx={{ py: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Contestants
      </Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextInput control={control} name="name" label="Name" placeholder="Enter Name" maxLength={45} size="small" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectInput control={control} items={talents} name="talent" label="Talent" placeholder="Select Talent" size="small" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectInput control={control} items={contestantTypes} name="type" label="Type" placeholder="Select Type" size="small" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectInput
              control={control}
              items={provinceQuery.data?.message.map((p) => ({ value: p.id, text: p.province })) || []}
              name="provinceId"
              label="Province"
              placeholder="Select Province"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectInput
              control={control}
              items={cityQuery.data?.message.map((p) => ({ value: p.id, text: p.city })) || []}
              name="cityId"
              label="City"
              placeholder="Select City"
              size="small"
              disabled={!watchProvince}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectInput
              control={control}
              items={barangayQuery.data?.message.map((p) => ({ value: p.id, text: p.baranggay })) || []}
              name="barangayId"
              label="Barangay"
              placeholder="Select Barangay"
              size="small"
              disabled={!watchCity}
            />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'right' }}>
          <Button variant="contained">Search</Button>
        </Box>
      </form>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ textAlign: 'right', mb: 2 }}>
        <Button variant="outlined" onClick={handleOpenMenu}>
          Enroll Contestant
        </Button>
        <Menu anchorEl={openMenu} open={open} onClose={handleCloseMenu} MenuListProps={{ sx: { width: 200 } }}>
          <MenuList>
            <MenuItem onClick={() => navigate('/contestant/add')}>Solo</MenuItem>
            <MenuItem onClick={() => navigate('/contestant/add?type=group')}>Group</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Paper elevation={1}>
        <Table columns={contestants(onView, onDelete)} data={listQuery.data ? listQuery.data.message : []} />
      </Paper>
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false })}>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this contestant?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false })}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default List
