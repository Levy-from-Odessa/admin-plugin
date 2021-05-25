<template>
  <div class="">
   <b-form-group 
    class="mb-3"
    label-cols-lg="4"
    :label="label"
   >
      <b-form-checkbox-group
        v-model="checkboxValue"
        :name="label"
      >
        <b-form-checkbox
          v-for="option in options"
          :key="option.name"
          :value="option[showValue]"

          :class="`form-check  mx-3`"
          :variant="option.color"
        >
            {{option[showLabel]}}
        </b-form-checkbox>
      
      </b-form-checkbox-group>
    </b-form-group>

  </div>
</template>

<script>
export default {
  name: 'FtthSimpleCheckBox',
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: [String, Array],
      default: () => []
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

  data() {
    return {
      select: []
    }
  },

  computed:{
    checkboxValue: {
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
    setChecked(option){
      this.$emit('input', option.value)
    },
    test(e){
      console.log(e);
      this.checkboxValue = e 
    }
  },

  
}
</script>

<style lang="scss" scoped>

</style>