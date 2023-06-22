import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useQuery } from '@tanstack/react-query'

import ProfileInfoProperty from 'src/components/ProfileInfoProperty'
import Table from 'src/themes/Table'

import useAxios from 'src/hooks/useAxios'
import { GET_PROFILE_API_URL } from 'src/config/apiRoutes'

import avatarb1 from 'src/assets/images/avatar-b1.png'

const Profile = () => {
  const { id } = useParams()
  const { get } = useAxios()

  const [show, setShow] = useState(false)

  const detailsQuery = useQuery({
    queryKey: ['user-details', id],
    queryFn: () => get(GET_PROFILE_API_URL.replace('{id}', id)),
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const handleDeleteUser = () => {}

  if (!id) {
    return <Navigate to="/users" />
  }

  if (!detailsQuery.isLoading && !detailsQuery.data) {
    return <Navigate to="/users" />
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        User Profile
      </Typography>
      <Grid container spacing={5}>
        <Grid item lg={3}>
          <Paper elevation={1} sx={{ textAlign: 'center', p: 3, mb: 1 }}>
            <Avatar
              alt={`${detailsQuery.data?.message.firstName} ${detailsQuery.data?.message.lastName}`}
              src={avatarb1}
              sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
            />
            <Typography variant="caption" sx={{ mr: 1 }}>
              Status:
            </Typography>
            {detailsQuery.data && (
              <React.Fragment>
                {detailsQuery.data.message.status === 'INVITED' && <Chip label="Invited" color="gray" variant="contained" size="small" />}
                {detailsQuery.data.message.status === 'ACTIVE' && <Chip label="Active" color="success" variant="contained" size="small" />}
                {detailsQuery.data.message.status === 'DISABLED' && <Chip label="Disabled" color="error" variant="contained" size="small" />}
              </React.Fragment>
            )}
          </Paper>
          <Button component={Link} to="../users" startIcon={<ArrowBackIosIcon />}>
            Back to list
          </Button>
        </Grid>
        <Grid item lg={9}>
          <Card sx={{ mb: 4 }}>
            <CardHeader title="Personal Information"></CardHeader>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="First Name" propertyValue={detailsQuery.data?.message.firstName} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Last Name" propertyValue={detailsQuery.data?.message.lastName} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Middle Name" propertyValue={detailsQuery.data?.message.middleName} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Mobile Number" propertyValue={detailsQuery.data?.message.mobileNumber} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Email Address" propertyValue={detailsQuery.data?.message.emailAddress} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Role" propertyValue={detailsQuery.data?.message.role} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ mb: 4 }}>
            <CardHeader title="Areas"></CardHeader>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Region" propertyValue={detailsQuery.data?.message.region.value} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Province" propertyValue={detailsQuery.data?.message.province.value} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="City" propertyValue={detailsQuery.data?.message.city.value} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Barangay" propertyValue={detailsQuery.data?.message.barangay} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={show} onClose={() => setShow(false)}>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShow(false)}>Cancel</Button>
          <Button onClick={handleDeleteUser}>Logout</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

Profile.propTypes = {}

export default Profile
