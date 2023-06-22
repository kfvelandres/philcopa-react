import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Avatar, Button, Card, CardContent, CardHeader, Container, Grid, Paper, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import ProfileInfoProperty from 'src/components/ProfileInfoProperty'

import avatarb1 from 'src/assets/images/avatar-b1.png'
import Table from 'src/themes/Table'
import groupMembers from 'src/columns/groupMembers'
import GroupMembers from 'src/components/GroupMembers'

import contestantsList from 'src/data/contestantsList.json'
import useAxios from 'src/hooks/useAxios'
import { GET_PROFILE_API_URL } from 'src/config/apiRoutes'

const Profile = () => {
  const { id } = useParams()
  const { get, post } = useAxios()

  const detailsQuery = useQuery({
    queryKey: ['contestant_details', id],
    queryFn: () => get(GET_PROFILE_API_URL.replace('{id}', id)),
    refetchOnMount: false,
    //enabled: !!userId,
    // onSuccess: (response) => {
    //   if (response.status === 200) {
    //     login(response.message)
    //   }
    // },
    onSettled: (response) => {
      console.log(response)
    },
  })

  // useEffect(() => {
  //   if (id) {
  //     console.log(id)
  //     const c = contestantsList.find((c) => c.id === id)
  //     setContestant(c)
  //   }
  // }, [id])

  if (!id) {
    return <Navigate to="/contestants" />
  }

  if (!detailsQuery.isLoading && !detailsQuery.data) {
    return <Navigate to="/contestants" />
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Contestant Profile
      </Typography>
      <Grid container spacing={5}>
        <Grid item lg={3}>
          <Paper elevation={1} sx={{ p: 3, mb: 1 }}>
            <Avatar
              alt={`${detailsQuery.data?.message.firstName} ${detailsQuery.data?.message.lastName}`}
              src={avatarb1}
              sx={{ width: 150, height: 150, mx: 'auto' }}
            />
          </Paper>
          <Button component={Link} to="../contestants" startIcon={<ArrowBackIosIcon />}>
            Back to list
          </Button>
        </Grid>
        <Grid item lg={9}>
          {/* <Card sx={{ mb: 4 }}>
            <CardHeader title="Contestant Information"></CardHeader>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item sx={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Stage Name" propertyValue={sampleData.stageName} />
                </Grid>
                <Grid item sx={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Talent/Category" propertyValue={sampleData.talent} />
                </Grid>
              </Grid>
            </CardContent>
          </Card> */}
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
                  <ProfileInfoProperty propertyName="Gender" propertyValue={detailsQuery.data?.message.gender} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Date of Birth" propertyValue={detailsQuery.data?.message.dateOfBirth} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty
                    propertyName="Age"
                    propertyValue={detailsQuery.data?.message.dateOfBirth ? dayjs().diff(dayjs(detailsQuery.data.message.dateOfBirth), 'year') : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Mobile Number" propertyValue={detailsQuery.data?.message.mobileNumber} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Email Address" propertyValue={detailsQuery.data?.message.emailAddress} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ mb: 4 }}>
            <CardHeader title="Address Information"></CardHeader>
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
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Address" propertyValue={detailsQuery.data?.message.address} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {!detailsQuery.isLoading && (
            <React.Fragment>
              {detailsQuery.data.message.stageName ? (
                <Card>
                  <CardHeader title="Solo Information"></CardHeader>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <ProfileInfoProperty propertyName="Stage Name" propertyValue={detailsQuery.data?.message.stageName} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <ProfileInfoProperty propertyName="Visa" propertyValue={detailsQuery.data?.message.withVisa ? 'Yes' : 'No'} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <ProfileInfoProperty propertyName="Talent/Category" propertyValue={detailsQuery.data?.message.talent} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader title="Group Information"></CardHeader>
                  <CardContent>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6} md={4}>
                        <ProfileInfoProperty propertyName="Group Name" propertyValue={detailsQuery.data?.groupName} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <ProfileInfoProperty
                          propertyName="Visa"
                          propertyValue={detailsQuery.data?.message.withVisa ? 'All members has Visa' : 'Not all members has Visa'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <ProfileInfoProperty propertyName="Talent/Category" propertyValue={detailsQuery.data?.message.talent} />
                      </Grid>
                    </Grid>
                    <Typography component="h6" variant="subtitle2">
                      Members
                    </Typography>
                    <GroupMembers id={id} />
                  </CardContent>
                </Card>
              )}
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

Profile.propTypes = {}

export default Profile
