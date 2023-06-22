import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { API_BASE_URL } from 'src/config/apiRoutes'

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json, text/plain, */*' },
})

const useAxios = () => {
  const get = (url) => {
    return instance.get(url).then((response) => response.data)
  }
  const post = (url, data) => {
    return instance.post(url, data).then((response) => response.data)
    // .catch((error) => {
    //   return error.response.data
    // })
  }

  return { get, post }
}

useAxios.propTypes = {
  //names: PropTypes.array,
}

export default useAxios
