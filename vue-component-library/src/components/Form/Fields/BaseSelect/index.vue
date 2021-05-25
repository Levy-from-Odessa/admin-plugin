<template>
  <b-form-group
    class="mb-3"
    label-cols-lg="4"
    :label="label"
  >
    <b-form-select
      class="form-control"
      style="width: 100%"
    >
      <b-form-select-option 
        :value="null"
        @click="$emit('input', null)"
      >
        All
      </b-form-select-option>

      <b-form-select-option
        class="option"
        v-for="item in options"
        :key="item[showValue]"
        :value="item"
        @click="$emit('input', item[showValue])"
      >
        {{ item[showLabel] }}
      </b-form-select-option>
    </b-form-select>
  </b-form-group>
</template>

<script>
export default {
  name: 'FtthSimpleSelect',
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: String,
      default: () => ''
    },
    showValue: {
      type: String,
      default: () => 'value'
    },
    showLabel: {
      type: String,
      default: () => 'name'
    },
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>