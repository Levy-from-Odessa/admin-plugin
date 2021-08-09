<template>
  <div class="input">
      <label v-if="label" :for="name" class="mb-1 mt-3">
        {{label}}
      </label>
      <input
        v-bind="{
          value,
          id:name,
          disabled,
          prefix,
          name,
          color,
          type,
          placeholder,
          backgroundColor
        }"
        autocomplete="off"
        class="form-control"
        :class="{ 'error': hasError,
          'is-invalid': hasError,
        }"

        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur')"
        @keypress.enter.prevent="$emit('submit-form')"
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
export default {
  name: 'FtthValBaseInput',
  data() {
    return {
      key: 'value'
    }
  },
  props: {
    //
    value: {
      type: [String, Number],
      default: () => ''
    },
    //
    disabled: {
      type: Boolean,
      default: () => false
    },
    label: {
      type: String,
      default: () => ''
    },
    prefix: {
      type: String,
      default: () => ''
    },
    name: {
      type: String,
      default: () => ''
    },
    type: {
      type: String,
      default: () => ''
    },
    direction: {
      type: String,
      default: () => ''
    },
    // colors
    color: {
      type: String,
      default: () => 'primary'
    },
    backgroundColor: {
      type: String,
      default: () => 'transparent'
    },
    // error
    error: {
      type: String,
      default: () => ''
    },
    hasError: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default:() => ''
    }
  },
  mounted () {
    // console.log(this.$attrs)
    // this.customevents = {
    //   input: this.$emit('input', 'e'),
    //   blur: this.$emit('blur'),
    //   'keypress.enter.prevent': this.$emit('submit-form')
    // }
  }
}
</script>

<style lang="scss" scoped>
.input{
  position: relative;
  .invalid-tooltip{
    position: absolute;
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
