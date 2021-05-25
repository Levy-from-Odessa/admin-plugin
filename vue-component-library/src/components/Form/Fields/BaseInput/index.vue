<template>
  <b-form-group
    class="mb-3"
    label-cols-lg="4"
    :label="label"
  >
    <b-form-input
      @input="$emit('input', $event)"
      :value="value"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  name: 'FtthSimpleInput',
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: String,
      default: () => ''
    }
  }
  
}
</script>

<style lang="scss" scoped>

</style>