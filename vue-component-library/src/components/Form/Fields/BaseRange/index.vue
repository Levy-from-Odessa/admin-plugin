<template>
  <b-form-group
    label-cols-lg="4"
    :label="label"
    class="mb-3"
  >
    <VueSlider 
      v-model="rangeValue" 
      :data="options"
      class="range"
      :marks="allOptions"
      height="8px"
    />

  </b-form-group>
</template>

<script>
export default {
  name: 'FtthSimpleRange',
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: Array,
      default: () => null
    },
    options: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    lastOption(){
      return this.options[this.options.length - 1]
    },
    firstOption(){
      return this.options[0]
    },
    allOptions(){
      return [
          this.firstOption,
          this.lastOption
        ]
    },



    rangeValue: {
      get(){
        return this.value || this.allOptions
      },
      set(value){
        this.$emit('input', value)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.range {
  padding: 16px 0 !important;
}
</style>