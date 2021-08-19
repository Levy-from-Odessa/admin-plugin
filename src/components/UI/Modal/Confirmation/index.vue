<template>
  <b-modal
    v-model="show"
    size= 'sm'
    okVariant= 'danger'
    okTitle= 'YES'
    cancelTitle= 'NO'
    footerClass= 'p-2'
    :hideHeaderClose= false
    :centered= true
  >
    {{message}}
   <template #modal-footer>
      <b-button size="sm"  @click="close">
        Cancel
      </b-button>
      <b-button size="sm" :variant="action.color || 'danger'" @click="actionHandler">
        {{action.text || action}}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
    name: 'FtthModalConfirmation',
		data() {
			return {
				show: false,
				message: 'Are you sure?',
				action: 'Yes',

				payload: '',

				controller: {}
			}
		},
		methods: {
			open(message = '', action = '', payload) {
				const promise = new Promise((res, rej) => {
					this.controller = {res, rej}
				}) 
				this.show = true;
				this.message = message || this.message;
				this.action = action || this.action;
				this.payload = payload;

				return promise;
			},
			clear(){
				this.show= false
				this.message= 'Are you sure?'
				this.action= 'Yes'
				this.controller = {}
			},
			actionHandler(){
				this.controller.res(this.payload)
				this.clear()
			},
			close(){
				this.controller.res(false)
				this.clear()
			}
		},
  
}
</script>

<style lang="scss" scoped>

</style>