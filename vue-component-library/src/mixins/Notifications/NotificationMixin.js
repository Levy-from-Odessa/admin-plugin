import {mapActions} from 'vuex'

export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('notification', [
      'successAlert',
      'errorAlert'
    ]),
    cleanState () {
      setTimeout(() => {
        this.show = false
      }, this.timeout)
    },

    showError (error) {
      this.errorAlert(error)
    },

    showMessage (message) {
      let  msg = message

      if (message.response) {
        msg = message.response.data['hydra:description']
      }

      this.successAlert(msg)
    }
  },
  watch: {
    error (err) {
      this.showError(err)
    }
  }
}
