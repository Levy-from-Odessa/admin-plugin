<template>
  <form>
      <div class="row">
        <div class="cols-12 sm-12 md-12">
          <component
            :is="field.component"
            v-for="(field, key) in schema"
            :key="field.label"
            :name="field.label"
            :label="field.label"
            v-bind="{...field}"
            :show-label="field.showLabel"
            :show-value="field.showValue || key"
            :disabled="field.disabled"
            :type="field.type"

            :error="errorMessages[key]"
            :has-error="$v.form[key].$error"

            :value="value[key]"


            @input="update(key, $event, field.component, field)"
            @blur="checkInput(key)"
            @submit-form="submit(key)"
          />
        </div>
      </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import BaseInput from './Fields/BaseInput'
// import BaseSelect from './Fields/BaseSelect'
// import DatePicker from './Fields/DatePicker'

// import CreateTable from './CreateTable/index'
import  ValidationRules  from '../../utils/ValidationRules'
export default {
  name: 'FtthValForm',
  components: {
    BaseInput,
    // BaseSelect,
    // DatePicker,

    // CreateTable
  },
  mixins: [validationMixin],
  props: {
    schema: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      test: 'data',
      form: {},
      blur: false
    }
  },
  computed: {
    errorMessages () {

      const validations = this.$v.form

      return Object.keys(this.schema).reduce((messages, key) => {
        const rules = this.schema[key].validations
        const rulesKeys = Object.keys(this.schema[key].validations)
        const validator = validations[key]

        if (!validator) { return messages }

        for (const rule of rulesKeys) {
          if (validator[rule] !== false) { continue }

          messages[key] = rules[rule].message

          return messages
        }

        return messages
      }, {})
    }
  },
  watch: {
    value (newValue) {
      this.inzialeForm(newValue)
    }
  },
  created () {
    for (const name in this.schema) {
      this.$set(this.form, name, null)
    }
    this.inzialeForm(this.value)
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
      const item = field
      // *function
      if (item.function) {
        value = item.function(value)
      }
      if (component === 'BaseSelect') {
        this.$v.form[key].$touch()
      }

      this.value[key] = value
      this.form[key] = value

      this.$emit('input', {...this.value})
    },
    // doesnt allow to handle if it error
    checkInput () {
      this.$v.form.$touch
      if (!this.$v.form.$invalid) {
        this.$emit('error-handler', true)
      } else {
        this.$emit('error-handler', false)
      }
    },
    submit () {
      this.checkInput()
      this.$emit('submit-form')
    }
  },
  validations () {
    return { form: ValidationRules(this.schema) }
  }
}
</script>
