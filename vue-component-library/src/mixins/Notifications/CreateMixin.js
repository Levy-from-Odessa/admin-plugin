
import NotificationMixin from './NotificationMixin'
export default {
  data () {
    return {
      editForm: {}
    }
  },
  mixins: [ NotificationMixin],
  methods: {

    onCreated (item) {
      this.showMessage(`${item['@id']}  ${('Created')} `)
      this.$emit('close')
    },
    onSendForm (additional = null) {
      const createForm = this.$refs.createForm
      createForm.$v.form.$touch()

      const item = createForm.$v.form.$model
      if (!createForm.$v.$invalid) {
          console.log(item);
        this.create({ ...item, ...additional })
      } else {
        this.showError(('Check the form'), createForm.errorMessages)
      }
    },
    clearForm () {
      this.$refs.createForm.$v.$reset()
      this.editForm = {}
    }
  },
  watch: {
    created (created) {
      if (!created) {
        return
      }
      this.onCreated(created)
      this.clearForm()
    },

    error (message) {
      message && this.showError(message)
    }
  }
}
