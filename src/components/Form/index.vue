<template>
  <form class="form-horizontal" role="form">
    <div class="row">
      <template
        v-for="(field, key) in schema"
      >
        <div 
          class="cols-12 sm-12 md-12 "
          :key="key"
          v-if="field.component !== 'BaseRadio' 
          && field.component !== 'BaseCheckbox'"
        >
            <component
              :is="field.component"
              :name="field.label"
              :label="field.label"
              v-bind="{...field}"
              :show-label="field.showLabel"
              :show-value="field.showValue"
              :disabled="field.disabled"
              :type="field.type"

              :value="value[key] || null"
              @input="update(key, $event , field)"
              @search="search(key, $event , field)"
            />
        </div>
        <div 
          v-else
          class="col-6 mb-1" 
          :key="key"
        >
            <component
              :is="field.component"
              :name="field.label"
              :label="field.label"
              v-bind="{...field}"
              :show-label="field.showLabel"
              :show-value="field.showValue"
              :disabled="field.disabled"
              :type="field.type"

              :value="value[key]"
              @input="update(key, $event , field)"
            />
        </div>
      </template>
    </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import BaseInput from './Fields/BaseInput'
import BaseSelect from './Fields/BaseSelect'
import BaseRadio from './Fields/BaseRadio'
import BaseCheckbox from './Fields/BaseCheckbox'
import BaseDatePicker from './Fields/BaseDatePicker'
import BaseRange from './Fields/BaseRange'

// import CreateTable from './CreateTable/index'
export default {
  name: 'FtthSimpleForm',
  components: {
    BaseInput,
    BaseSelect,
    BaseRadio,
    BaseCheckbox,
    BaseDatePicker,
    BaseRange

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
  methods: {
    search(key, value, field){
      this.$emit('search', {
        key,
        value,
        field
      })

    },
    update (key, inputValue, field) {
      const item = field
      let allFormValue = Object.assign({}, this.value)


      // *function
      if (item.function) {
        inputValue = item.function(inputValue)
      }
      console.log(this.value);

      // *range
      if (item.range) {
        allFormValue = this.rangeValues(item, key, inputValue)
      }else{
        allFormValue[key] = inputValue
      }

      // this.$emit('input', {...this.value})

      // *monitor changes
      this.$emit('changedItem', {
        changedItem: {
          key, item, inputValue
        },
        allValues: allFormValue
      })
    },

    rangeValues(item, key, value){
      const result = {}

      const  greaterThan = Math.max(...value) || value[0]
      const  lessThan = Math.min(...value) || value[1]
      if (item.component === 'BaseDatePicker') {
        result[key] = value
        result[`${key}[before]`] = lessThan
        result[`${key}[after]`] = greaterThan
      }else {
        result[key] = value
        result[`${key}[gte]`] = lessThan
        result[`${key}[lte]`] = greaterThan
      }
      
      return result
    }
  }
}
</script>
