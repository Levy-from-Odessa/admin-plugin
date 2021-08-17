/* eslint-disable dot-notation */
/* eslint-disable quote-props */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import axios from 'axios'
import {getcookiesInClient , authorizeProps} from '@/utils/cookies'
const Api = axios.create({
  baseURL: process.env.VUE_APP_ENTRYPOINT,
  timeout: 30000

})

// check req/res before they are handled
// REQ
Api.interceptors.request.use(
  (request) => {
    const token = getcookiesInClient('token')
    const timeAuthorized = authorizeProps(token)
  
    if (timeAuthorized) {
      request.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      request.headers.common['Authorization'] = ''
    }
    return request
  },
  (error) => {
    console.log('error token')

    return Promise.reject(error)
  }
)
// RES
Api.interceptors.response.use(
  (response) => {
    const { data } = response
    if (response.data['hydra:member']) {
      return {
        data: data['hydra:member'],
        totalItems: data['hydra:totalItems']
      }
    } else {
      console.log('there are usual response')
      return { data }
    }
  },
  (error) => {
    // if (
    //   error.response &&
    //   error.response.status &&
    //   error.response.status === 401 &&
    //   error.response.data.message !== 'Bad credentials'
    // ) {
    //   window.location.href = '/login'
    // }

    const message = error
    global.console.log(error)
    return Promise.reject(message)
  }
)

export default Api
