<template>
  <div class="">
    <b-form-group
      v-if="label"
      class="mb-3"
      label-cols-lg="4"
      :label="label"
    >
      <AutoComplete
        :value="value"
        :options="options"
        :option-label="showLabel "
        :option-key="showValue "
        @input="input"
        @search="search"
      />
    </b-form-group>
    <AutoComplete
      v-else
      :value="value"
      :options="options"
      :option-label="showLabel "
      :option-key="showValue "
      @input="input"
      @search="search"
    />
  </div>
</template>

<script>
import AutoComplete from '../../../ValidationForm/Fields/BaseSelect/AutoComplete'
export default {
  name: 'FtthSimpleSelect',
  components:{
    AutoComplete
  },
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: [String, Object, Number],
      default: () => ''
    },
    showValue: {
      type: String,
      default: () => null
    },
    showLabel: {
      type: String,
      default: () => null
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    search(val){
      this.$emit('search', val)
    },
    input(value){
      // if (!value) {return;}

      // const option = this.options.find(option => {
      //   return option[this.showValue] === value|| 
      //   option === value
      // })

      // const valueOfOption = option[this.showValue] || option 


      // option ?
        this.$emit('input', value)
        this.$emit('start-input',  value);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>