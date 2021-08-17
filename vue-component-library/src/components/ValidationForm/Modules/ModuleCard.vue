<template>
  <div :class="$style.ModuleCard">
    <v-card class="elevation-3">
      <v-card-title>
        {{ $t(moduleItem.moduleName) }}
      </v-card-title>

      <v-card-text>
        <div
          v-for="role in moduleItem.roles"
          :key="role.id"
          class=""
        >
          <v-checkbox
            v-model="role.checked"
            :label="role.name"
            @change="updateValue"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    moduleItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateValue () {
      this.$emit('change-permissions', this.moduleItem.roles)
    }
  }
}
</script>

<style lang="scss" module>
.ModuleCard{
  width: 30%;
  margin: 10px 0;

}

</style>
<style lang="scss" scoped>
.v-card__title{
  background: rgba(255, 177, 114, 0.404) !important;
}
</style>
