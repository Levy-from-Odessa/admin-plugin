<template>
  <div
    class="input"
  >
    <label v-if="label" class="mb-1 mt-3">
      {{label}}
    </label>
        <!-- 'error': hasError, -->
		<AutoComplete
      :class="{ 
        'is-invalid': hasError,
      }"
			:value="value"
			:options="options"
			:option-label="showLabel || null"
			@input="input"
			@search="search"
		/>
        <div
          v-if="hasError"
          class="invalid-tooltip width-100"
        >
            {{error}}
        </div>
  </div>
</template>

<script>
import AutoComplete from './AutoComplete'
export default {
  name: 'FtthValBaseSelect',
  components:{
    AutoComplete
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
    },
    error: {
      type: String,
      default: () => ''
    },
    hasError: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    search(val){
      this.$emit('search', val)
    },
    input(value){
      if (!value) {
        return;
      }
      const option = this.options.find(option => {
        return option[this.showValue] === value|| 
        option === value
      })

      const valueOfOption = option[this.showValue] || option 

      console.log(valueOfOption);


      option 
        ? this.$emit('input', valueOfOption )
        : this.$emit('start-input',  value);
    }
  }
}
</script>

<style lang="scss" scoped>
.input{
  position: relative;
  .invalid-tooltip{
    position: absolute;
    z-index: 4;
    top: auto;

  }
}
.error{
  animation-name: shakeError;
  animation-fill-mode: forwards;
  animation-duration: .3s;
  animation-timing-function: ease-in-out; 
}


@keyframes shakeError {
  0% {
    transform: translateX(0); }
  15% {
    transform: translateX(0.375rem); }
  30% {
    transform: translateX(-0.375rem); }
  45% {
    transform: translateX(0.375rem); }
  60% {
    transform: translateX(-0.375rem); }
  75% {
    transform: translateX(0.375rem); }
  90% {
    transform: translateX(-0.375rem); }
  100% {
    transform: translateX(0); } 
 }
</style>
