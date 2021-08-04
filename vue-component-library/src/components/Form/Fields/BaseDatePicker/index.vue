<template>
  <div class="">
    <b-form-group
      class="mb-3"
      label-cols-lg="4"
      :label="label"
      v-if="label"
    >
      <DatePicker 
        v-model="pickerValue"
        value-type="format"
        range 
        append-to-body 
        lang="en" 
        confirm
      />
    </b-form-group>
    <DatePicker 
      v-else
      v-model="pickerValue"
      value-type="format"
      range 
      append-to-body 
      lang="en" 
      confirm
    />
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
export default {
  name: 'FtthSimpleDatePicker',
  components: {DatePicker},
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    pickerValue: {
      get(){
        return this.value
      },
      set(value){
        console.log(value);
        this.$emit('input', value)
      }
    }
  },
  methods: {
    onContext(ctx) {
      // The date formatted in the locale, or the `label-no-date-selected` string
      this.formatted = ctx.selectedFormatted
      // The following will be an empty string until a valid date is entered
      this.selected = ctx.selectedYMD
    },
  }
}
</script>

<style lang="scss" scoped>

</style>