import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar, Button, Card, CardContent, CardHeader, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

import ProfileInfoProperty from 'src/components/ProfileInfoProperty'

import avatarb1 from 'src/assets/images/avatar-b1.png'

const Index = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <Container sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <Typography component="h1" variant="h5">
          My Profile
        </Typography>
        <Button component={Link} to="edit" variant="contained" endIcon={<EditIcon />}>
          Edit
        </Button>
      </Stack>

      <Grid container spacing={5}>
        <Grid item lg={3}>
          <Paper elevation={1} sx={{ p: 3, mb: 1 }}>
            <Avatar alt={`${user.firstName} ${user.lastName}`} src={avatarb1} sx={{ width: 150, height: 150, mx: 'auto' }} />
          </Paper>
        </Grid>
        <Grid item lg={9}>
          <Card sx={{ mb: 4 }}>
            <CardHeader title="Personal Information"></CardHeader>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="First Name" propertyValue={user.firstName} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Last Name" propertyValue={user.lastName} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Middle Name" propertyValue={user.middleName} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Date of Birth" propertyValue={user.dateOfBirth} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Mobile Number" propertyValue={user.mobileNumber} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Email Address" propertyValue={user.emailAddress} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ mb: 4 }}>
            <CardHeader title="Address Information"></CardHeader>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Region" propertyValue={user.region.value} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Province" propertyValue={user.province.value} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="City" propertyValue={user.city.value} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <ProfileInfoProperty propertyName="Barangay" propertyValue={user.barangay} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Index
