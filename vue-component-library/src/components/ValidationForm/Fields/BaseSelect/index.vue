<template>
  <div
    class="input"
  >
    <label v-if="label" class="mb-1 mt-3">
      {{label}}
    </label>
		<SingleSelect
			:value="valueBuffer"
			:options="options"
			:option-label="showLabel || null"
			@input="input"
		/>
			<!-- :option-key="showValue" -->
  </div>
</template>

<script>
export default {
  name: 'FtthValBaseSelect',
  data() {
    return {
      valueBuffer: ''
    }
  },
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
      if (!valueLabel) {
        return;
      }
      const option = this.options.find(option => {
        return option[this.showLabel] === valueLabel|| 
        option === valueLabel
      })



      const valueOfOption = option[this.showValue] || option 

      console.log(valueOfOption);


      option 
        ? this.$emit('input', valueOfOption )
        : this.$emit('start-input',  valueLabel);
    }
  },
}
</script>

<style lang="scss" scoped>

</style>