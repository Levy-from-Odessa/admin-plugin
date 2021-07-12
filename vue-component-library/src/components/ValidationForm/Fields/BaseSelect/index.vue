<template>
  <div
    class="input"
  >
    <label v-if="label" class="mb-1 mt-3">
      {{label}}
    </label>
    <b-form-input 
      class="form-control"
      style="width: 100%"
      list="input-list" 
      id="input-with-list"
      @input="input"
    />
    <datalist id="input-list">
      <option
        :value="null"
      >
        All
      </option>
      <option 
        class="option"
        v-for="item in options"
        :key="item[showValue]"
        :value="item[showLabel]"
      >
          {{ item[showLabel] || item  }}
        </option>
    </datalist>
  </div>
</template>

<script>
export default {
  name: 'FtthValBaseSelect',
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: [String, Object ],
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
  },
  methods: {
    input(valueLabel){
      console.log(valueLabel);
      const item = this.options.find(option => {
        return option[this.showLabel] === valueLabel
      })
      item 
        ? this.$emit('input',  item)
        : this.$emit('start-input',  valueLabel);
    }
  },
}
</script>

<style lang="scss" scoped>

</style>