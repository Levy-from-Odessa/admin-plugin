
<template>
  <div :class="$style.ModulesTemplate">
    <ModuleCard
      v-for="(moduleItem, index) in convertedRoles"
      :key="moduleItem.id"
      :module-item="moduleItem"
      @change-permissions="updateMudule($event, index)"
    />
  </div>
</template>

<script>
/*

Interface of module item
  moduleName: str,
  modules: [{
    checked: boolean,
    id: int,
    name: str,
    role: str - which go to backend
  }]

*/
import { mapActions, mapGetters } from 'vuex'
import ModuleCard from './ModuleCard'
export default {
  name: 'FtthModules',
  components: {
    ModuleCard
  },
  props: {
    defRoles: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters('modules', {
      allModules: 'allIds'
    }),
    convertedRoles: {
      get () {
        const allModulesData = this.allModules && this.allModules.data
        console.log(allModulesData);
        const modulesCopy =  allModulesData.map((Module) => {
          const rolesCopy = Module.roles.map((role) => {
            const roleCopy = Object.assign({}, role)
            if (this.defRoles.some(itemRole => itemRole.role === role.role)) {
              roleCopy.checked = true
            }

            return roleCopy
          })
          return {
            moduleName: Module.name,
            modules: rolesCopy
          }
        })
        return modulesCopy
      }
    }

  },
  mounted () {
    this.fetchAll()
  },
  methods: {
    ...mapActions('modules', ['fetchAll']),
    updateMudule (modules, index) {
      console.log(modules)
      this.convertedRoles[index].modules = modules

      this.$emit('input-modules', this.convertedRoles)
    }
  }

}
</script>

<style lang="scss" module>
.ModulesTemplate{
  width: 80%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

</style>
