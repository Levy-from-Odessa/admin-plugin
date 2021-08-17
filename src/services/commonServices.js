/* eslint-disable no-console */
import pluralize from 'pluralize'
import Api from './Api'

export default {
  post (namespace, data) {
    const url = pluralize(namespace.toLowerCase())
    return Api.post(url, data)
  },
  getItem (namespace, id) {
    const url = pluralize(namespace.toLowerCase())
    return Api.get(url + '/' + id)
  },
  getItems (namespace, {query}) {
    let url = pluralize(namespace.toLowerCase())
    if (query) {
      url += '?'
      Object.keys(query)
      .forEach((key) => {
        if (query[key]) {
          url += key + '=' + query[key] + '&'
        }
      })
    }
    console.log(url);
    return Api.get(url)
  },
  deleteItem (namespace, id) {
    const url = pluralize(namespace.toLowerCase())
    return Api.delete(url + '/' + id)
  },
  update (namespace, { id, credentials }) {
    const url = pluralize(namespace.toLowerCase())
    return Api.patch(`/${url}/${id}`, credentials)
  }

}
