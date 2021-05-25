<template>
  <b-form-group
    class="mb-3"
    label-cols-lg="4"
    :label="label"
  >
    <div class=""
        v-for="status in options"
        :key="status[showLabel]"
      >
      <div
        :class="`form-check form-radio-${status.color} mx-3`"
        @click="radioValue = status.value"
      >
        <input
          v-model="radioValue"
          :value="status.value"
          class="form-check-input"
          type="radio"
          @input="radioValue = status.value"
        />
        <label class="form-check-label" for="formRadioColor3">
          {{status[showLabel]}}
        </label>
      </div>
    </div>
  </b-form-group>
</template>

<script>
export default {
  name: 'FtthSimpleRadio',
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: String ,
      default: () => ''
    },
    showValue: {
      type: String,
      default: () => 'value'
    },
    showLabel: {
      type: String,
      default: () => 'text'
    },
    options: {
      type: Array,
      default: () => []
    }
  },


  computed:{
    radioValue: {
      get(){
        return this.value
      },
      set(value){
        console.log(value);
        this.$emit('input', value)
      }
    }
  },

  
}
</script>

<style lang="scss" scoped>

</style>