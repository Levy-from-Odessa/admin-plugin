
import NotificationMixin from '../NotificationMixin'
export default {
  name: 'DeleteMixin',
  mixins: [ NotificationMixin],
  data() {
    return {
      deleteItemId: null,
      showDeleteModal: false,
    }
  },
  methods: {
    deleteItem() {
        this.$store.dispatch(`${this.store.name}/delete`, {id: this.deleteItemId})
    },

    onDeleted (item) {
      this.showMessage(`${item}  ${('deleted')} `)
      this.$emit('close')
    },
    setDeleteItem(id){
      this.deleteItemId = id
      this.showDeleteModal = true
    },
    onDeleteForm (){
      this.deleteItem()
      this.showDeleteModal = false
    },
  },
  computed: {
      deleted(){
          return this.$store.getters[`${this.store.name}/deleted`]
      },
      error(){
          return this.$store.getters[`${this.store.name}/error`]
      }
  },
  watch: {
    deleted (deleted) {
        console.log(deleted);
      if (!deleted) {
        return
      }
      this.onDeleted(deleted)
    },

    error (message) {
      message && this.showError(message)
    }
  }
}
