import React, { Suspense, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { connect } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

import LoaderOverlay from 'src/components/LoaderOverlay'
import ErrorBoundary from 'src/components/ErrorBoundary'
import PageNotFound from 'src/views/errors/PageNotFound'
import useAxios from 'src/hooks/useAxios'
import { GET_PROFILE_API_URL } from 'src/config/apiRoutes'
import { loginSuccess } from 'src/store/actions/authActions'
import Splash from 'src/components/Splash'

const Home = React.lazy(() => import('/src/views/Index'))
const Login = React.lazy(() => import('/src/views/Login'))

import Layout from 'src/layouts/Layout'
import PrivateLayout from 'src/layouts/PrivateLayout'

// USERS
const Users = React.lazy(() => import('src/views/users/List'))
const UserProfile = React.lazy(() => import('src/views/users/Profile'))
const CreateUser = React.lazy(() => import('src/views/users/Create'))

// CONTESTANTS
const Contestants = React.lazy(() => import('src/views/contestants/List'))
const ContestantProfile = React.lazy(() => import('src/views/contestants/Profile'))
const SelectContestantType = React.lazy(() => import('src/views/contestants/SelectType'))
const CreateContestant = React.lazy(() => import('src/views/contestants/Create'))

// JUDGES
const JudgesLogin = React.lazy(() => import('src/views/judges/Login'))

// COMPETITIONS
const Competitions = React.lazy(() => import('src/views/competitions/List'))
const CreateCompetition = React.lazy(() => import('src/views/competitions/Create'))
const CompetitionMechanics = React.lazy(() => import('src/views/competitions/Mechanics'))

const Dashboard = React.lazy(() => import('src/views/Dashboard'))
const Invite = React.lazy(() => import('src/views/Invite'))
const Files = React.lazy(() => import('src/views/Files'))
const Profile = React.lazy(() => import('src/views/profile/Index'))
const EditProfile = React.lazy(() => import('src/views/profile/Edit'))
const Settings = React.lazy(() => import('src/views/Settings'))
const Register = React.lazy(() => import('src/views/Register'))

const Index = ({ user, login }) => {
  const { get } = useAxios()

  const [initialized, setInitialized] = useState(false)
  const [userId, setUserId] = useState()

  const userDetailsQuery = useQuery({
    queryKey: ['user_details', userId],
    queryFn: () => get(GET_PROFILE_API_URL.replace('{id}', userId)),
    refetchOnWindowFocus: false,
    enabled: !!userId,
    retry: 1,
    onSuccess: (response) => {
      if (response.status === 200) {
        login(response.message)
        setInitialized(true)
      }
    },
  })

  const router = useMemo(
    () =>
      createBrowserRouter(
        [
          {
            path: '/',
            element: user ? <PrivateLayout /> : <Layout />,
            children: [{ index: true, element: <Home /> }],
          },
          // {
          //   path: '/',
          //   //element: <PrivateLayout />,
          //   children: [
          //     { index: true, element: <Dashboard /> },
          //   ],
          // },
          {
            path: '/',
            element: <Layout />,
            children: [
              //{ index: true, element: <Home /> },
              { path: 'login', element: <Login />, errorElement: <ErrorBoundary />, title: 'Login' },
              { path: 'register/:id', element: <Register />, errorElement: <ErrorBoundary />, title: 'User Registration' },
              {
                path: 'judges',
                children: [{ path: 'login', index: true, element: <JudgesLogin />, errorElement: <ErrorBoundary />, title: 'Judge Login' }],
              },
            ],
          },
          // { path: '/', index: true, element: <Home /> },
          // { path: '/login', element: <Login />, errorElement: <ErrorBoundary />, title: 'Login' },
          // { path: '/register/:id', element: <Register />, errorElement: <ErrorBoundary />, title: 'User Registration' },
          // {
          //   path: '/judges',
          //   children: [{ path: 'login', index: true, element: <JudgesLogin />, errorElement: <ErrorBoundary />, title: 'Judge Login' }],
          // },
          {
            path: '/',
            element: <PrivateLayout />,
            children: [
              //{ index: true, element: <Dashboard />, errorElement: <ErrorBoundary />, title: 'Dashboard' },
              { path: 'users', element: <Users />, errorElement: <ErrorBoundary />, title: 'Users' },
              { path: 'users/:id', element: <UserProfile />, errorElement: <ErrorBoundary />, title: 'User Profile' },
              { path: 'users/add', element: <CreateUser />, errorElement: <ErrorBoundary />, title: 'Create User' },
              { path: 'contestants', element: <Contestants />, errorElement: <ErrorBoundary />, title: 'Contestants' },
              { path: 'contestants/:id', element: <ContestantProfile />, errorElement: <ErrorBoundary />, title: 'Contestants' },
              { path: 'contestant/select', element: <SelectContestantType />, errorElement: <ErrorBoundary />, title: 'Select Contestant Type' },
              { path: 'contestant/add', element: <CreateContestant />, errorElement: <ErrorBoundary />, title: 'Create Contestant' },
              { path: 'competitions', element: <Competitions />, errorElement: <ErrorBoundary />, title: 'Competitions' },
              { path: 'competition/add', element: <CreateCompetition />, errorElement: <ErrorBoundary />, title: 'Create Competition' },
              { path: 'competition/mechanics', element: <CompetitionMechanics />, errorElement: <ErrorBoundary />, title: 'Competition Mechanics' },

              { path: 'invite', element: <Invite />, errorElement: <ErrorBoundary />, title: 'Invite User' },
              { path: 'files', element: <Files />, errorElement: <ErrorBoundary />, title: 'Files' },
              { path: 'profile', element: <Profile />, errorElement: <ErrorBoundary />, title: 'Profile' },
              { path: 'profile/edit', element: <EditProfile />, errorElement: <ErrorBoundary />, title: 'Edit Profile' },
              { path: 'settings', element: <Settings />, errorElement: <ErrorBoundary />, title: 'Settings' },
            ],
          },
          {
            path: '*',
            element: <PageNotFound />,
          },
        ],
        { basename: '/philcopa' },
      ),
    [user],
  )

  useEffect(() => {
    const uid = localStorage.getItem('_uid')
    if (uid) {
      setUserId(uid)
    } else {
      setInitialized(true)
    }
  }, [])

  return initialized ? <RouterProvider router={router} /> : <Splash />
}

Index.propTypes = {
  login: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(loginSuccess(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
