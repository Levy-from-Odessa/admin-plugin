
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
      // by default perm name = store name
      const storeNamePermission = pluralize(this.store.name.toUpperCase(), 1)
      // if recived another perm
      const permissionName = pluralize(this.permissionName.toUpperCase(), 1)

      const profile = this.$store.getters['auth/profile']
      const nameOfGroupRole = permissionName || storeNamePermission

      return profile && profile.roles && profile.roles[nameOfGroupRole]
    },


    tableView () {
      if (this.userRoles) {
        return this.actions.view && this.userRoles.SHOW
      } else if(this.noPermissions){
       return this.actions.view
      }return false
    },
    tableDelete () {
      if (this.userRoles) {
        return this.actions.delete && this.userRoles.DELETE
      } else if(this.noPermissions){
       return this.actions.delete 
      }return false
    },
    tableCreate () {
      if (this.userRoles) {
        return this.topTable.create && this.userRoles.CREATE
      } else if(this.noPermissions){
       return this.actions.create
      }return false
    },

    tableActionColumn(){
      return this.tableView || this.tableDelete || this.tableCreate
    }
  },
}