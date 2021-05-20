<template>
  <b-modal
    v-model="showModal"
    size= 'sm'
    okVariant= 'danger'
    okTitle= 'YES'
    cancelTitle= 'NO'
    footerClass= 'p-2'
    :hideHeaderClose= false
    :centered= true
  >
    Are you sure?
   <template #modal-footer>
      <b-button size="sm"  @click="showModal = false">
        Cancel
      </b-button>
      <b-button size="sm" variant="danger" @click="$emit('delete')">
        Delete
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
    props: {
        show:{
            type:Boolean,
            default: () => false
        }
    },
    computed:{
        showModal:{
            get(){
                return this.show
            },
            set(){
                this.$emit('close')
            }
        }
    }
  
}
</script>

<style lang="scss" scoped>

</style>