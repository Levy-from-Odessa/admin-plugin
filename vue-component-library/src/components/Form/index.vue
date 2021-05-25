<template>
  <form class="form-horizontal" role="form">
    <div class="row">
      <template
        v-for="(field, key) in schema"
      >
        <div 
          class="cols-12 sm-12 md-12 mb-2"
          :key="field.label"
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

              :value="value[key]"
              @input="update(key, $event , field)"
            />
        </div>
        <div class="col-6 mb-1" v-else
          :key="field.label"
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
    update (key, value, field) {
      const item = field
      // *function
      if (item.function) {
        value = item.function(value)
      }

      // *range
      if (item.range) {
        this.value = this.rangeValues(item, key, value)
      }else{
        this.value[key] = value
      }

      // this.$emit('input', {...this.value})

      // *monitor changes
      this.$emit('changedItem', {
        changedItem: {
          key, item, value
        },
        allValues: this.value
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
