<template>
  <div class="input">
    <v-autocomplete
      v-model="editValue"
      color="#ffa577"
      v-bind="{
        id:name,
        error: hasError,
        errorMessages: hasError ? error : null,
        ariaDescribedby: `${name}-error`,
        name,
        items:options,
        itemValue: showValue || getAllObject,
        itemText: showLabel,
        disabled,
        'searchInput.sync':search,
        multiple,
        label: $t(label)
      }"

      @change="$emit('input', $event)"
      @keydown.enter="$emit('input', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'FtthValBaseSelect',
  props: {
    value: {
      type: [String, Number, Object, Array],
      default: () => ''
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    showLabel: {
      type: [String, Number],
      default: () => ''
    },
    showValue: {
      type: [String, Array],
      default: () => ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },

    options: {
      type: Array,
      required: true
    },

    // error
    hasError: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    errorMessages () {
      return this.error ? this.hasError && this.error : null
    },
    editValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    getAllObject (e) {
      return e
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
