<template>
	<div>
		<span 
			v-for="(val, index) in value"
			:key="index"
			:class="`
            p-2
            fw-bold
            mx-2
            badge
            bg-dark
            ml-3
						mb-3
      `"
			role="button"
			@click="removeTag(val)"
		>
			{{val[showLabel] || val}}
			<i class="fa fa-times"></i>
		</span>


		<AutoComplete
      ref="autoComplete"
			value=""
			:options="filtredOptions"
			:option-label="showLabel"
			@input="addTag"
		/>
	</div>
</template>

<script>
import AutoComplete from '../BaseSelect/AutoComplete'
export default {
  name: 'FtthValBaseSelectTag',
  components:{
    AutoComplete
  },
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: [String, Array ],
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
    addTag(newValue){
      if (!newValue) {return}
      const values = Object.assign([], this.value)
      values.push(newValue)

      const valuesShowValue = values.map(val => val[this.showValue])

      this.$emit('input', valuesShowValue)
      this.$emit('submit-form' )


      this.$refs.autoComplete.closeOut()
    },
    removeTag(delValue){
      if (!delValue) {
        return
      }
      const valueIndex = this.value.findIndex(value => {
          return value[this.showLabel]  === delValue[this.showLabel]
      })

      const values = Object.assign([], this.value)


      values.splice(valueIndex, 1)

      const valuesShowValue = values.map(val => val[this.showValue])

      this.$emit('input', valuesShowValue)
      this.$emit('submit-form' )
    },
  },
  computed:{
    filtredOptions() {
      const {showLabel } = this
      const showLabelValue = this.value.map(val => val[showLabel])
      return this.options.filter(option => {
        return !showLabelValue.includes(option[showLabel])
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>