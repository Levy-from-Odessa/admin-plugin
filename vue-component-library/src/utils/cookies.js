
import pluralize from 'pluralize'
/* eslint-disable camelcase */

import Cookie from 'js-cookie'
import jwtDecoded from 'jwt-decode'

/*
  TOKEN
*/

// Get the client cookie
export const getcookiesInClient = (key) => {
  return Cookie.get(key) || false
}

export const setcookiesToken = (token) => {
  Cookie.set('token', token)
}
export const removecookiesToken = () => {
  Cookie.remove('token')
}

export const authorizeProps = (token) => {
  const decodeToken = token && jwtDecoded(token)
  
  const timeAuthorized = (decodeToken.exp > Date.now() / 1000) || false

  return timeAuthorized
  
}
/*
  LANGUAGE
*/

export const setcookiesLanguage = (lang) => {
  Cookie.set('language', lang)
}

export const removecookiesLanguage = () => {
  Cookie.remove('language')
}

/*
  ROUTES by roles
*/
export const setcookiesRoutes = (roles) => {
  const allowedRoutes = [ 'index', 'dictionary-lang']

  Object.keys(roles).forEach((groupName) => {
    if (roles[groupName].LIST) {
      allowedRoutes.push(
        pluralize(groupName.toLowerCase(), 2)
      )
    }
    if (roles[groupName].SHOW) {
      allowedRoutes.push(
        pluralize(groupName.toLowerCase(), 2) + '-show'
      )
    }
  })
  const cookiesArray = allowedRoutes.join('|')
  Cookie.set('routes', cookiesArray)
}

export const removecookiesRoutes = () => {
  Cookie.remove('routes')
}
