<template>
  <component
    :is="schema.component"
    :name="schema.label"
    :value="value"
    :show-label="schema.showLabel"
    :show-value="schema.showValue"
    :disabled="schema.disabled"
    :multiple="schema.multiple"
    v-bind="{...schema}"
    :type="schema.type"
    :error="errorMessages"
    :has-error="$v.form.$error"
    @input="update(schema.label, $event,schema.component, schema)"
    @blur="checkInput()"
    @submit-form="$emit('submit-form')"
    @search="$emit('search')"
  />
</template>

<script>
import { validationMixin } from 'vuelidate'
import BaseInput from '../Fields/BaseInput'
import BaseSelect from '../Fields/BaseSelect'
import BaseSelectTag from '../Fields/BaseSelectTag'
import validationRules from '../../../utils/ValidationRules'

export default {
  name: 'FtthValSoloForm',
  components: {
    BaseInput,
    BaseSelect,
    BaseSelectTag,
  },
  mixins: [validationMixin],
  props: {
    schema: {
      type: Object,
      required: true
    },
    value: {
      type: [Number, String, Array, Object],
      default: () => {}
    }
  },
  data () {
    return { form: {}, blur: false
    }
  },
  computed: {
    errorMessages () {
      const validations = this.$v.form
      let messages = ''

      const rules = this.schema.validations
      const rulesKeys = Object.keys(this.schema.validations)
      const validator = validations
      if (!validator) { return messages }

      for (const rule of rulesKeys) {
        if (validator[rule] !== false) { continue }

        messages = rules[rule].message
        return messages
      }

      return messages
    }
  },
  created () {
    for (const name in this.schema) {
      this.$set(this.form, name, null)
    }
  },
  methods: {
    // check field with values
    inzialeForm (newValue) {
      for (const [key, value] of Object.entries(newValue)) {
        if (newValue[key] !== '') {
          this.form[key] = value
          if (this.$v.form[key]) {
            this.$v.form[key].$touch()
          }
        }
      }
    },
    update (key, value, component, field) {
      this.form = value
      if (this.schema.component === 'BaseSelect') {
        this.$v.form.$touch()
      }
      this.checkInput()
      if (field.type === 'number') {
        console.log('number');
        value = parseInt(value)
      }
      this.$emit('input', value)
    },
    // doesnt allow to handle if it error
    checkInput () {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.$emit('error-handler', true)
      } else {
        this.$emit('error-handler', false)
      }
    }
  },
  validations () {
    return { form: validationRules(this.schema) }
  }
}
</script>
