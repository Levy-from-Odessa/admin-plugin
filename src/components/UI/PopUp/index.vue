<template>
    <b-modal v-model="showModal" hide-footer centered header-class="border-0">
      <div class="text-center mb-4">
        <div class="avatar-md mx-auto mb-4">
          <div class="avatar-title bg-light rounded-circle text-primary h1">
            <i class="mdi mdi-email-open"></i>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-xl-10">
            <h4 class="text-primary">Subscribe !</h4>
            <p class="text-muted font-size-14 mb-4">
              Subscribe our newletter and get notification to stay update.
            </p>

            <div class="input-group bg-light rounded">
              <input
                type="email"
                class="form-control bg-transparent border-0"
                placeholder="Enter Email address"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />

              <button class="btn btn-primary" type="button" id="button-addon2">
                <i class="bx bxs-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    
</template>

<script>

export default {
  name: 'FtthModalPopup',
  props:{ 
        show:{
            type: Boolean,
            default: () => false
        }
    },

    computed:{
        showModal: {
            set(){
                this.$emit('close')
            },
            get(){
                return this.show
            }
        }
    }

}
</script>
