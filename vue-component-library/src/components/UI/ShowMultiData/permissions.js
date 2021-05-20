
import pluralize from 'pluralize'
export default{
  computed:{
    
    translatedHeaders () {
      return this.headers.map((field) => {
        return { ...field, text: this.$t(field.text) }
      })
    },
    translatedItems () {
      return this.allIds.map((item) => {
        return Object.keys(item).reduce((prevKey, key) => {
          return {
            ...prevKey,
            [key]: item[key] !== null ? this.$t((item[key]).toString()) : item[key]
          }
        }, {})
      })
    },
    
    
    userRoles () {
      const profile = this.$store.getters['auth/profile']
      const nameOfGroupRole = pluralize(this.store.name.toUpperCase(), 1)
      return profile && profile.roles && profile.roles[nameOfGroupRole]
    },


    tableView () {
      if (this.userRoles) {
        return this.actions.view && this.userRoles.SHOW
      } return false
    },
    tableDelete () {
      if (this.userRoles) {
        return this.actions.delete && this.userRoles.DELETE
      } return false
    },
    tableCreate () {
      if (this.userRoles) {
        return this.topTable.create && this.userRoles.CREATE
      } return false
    },
  },
}