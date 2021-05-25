
import pluralize from 'pluralize'
// inner
import NotificationMixin from '../NotificationMixin'
import ArrayToObjectMixin from '@/mixins/Converters/ArrayToObjectMixin'
export default {
  name: 'UpdateMixin',
  data () {
    return {
      editItemsProp: [],
      itemId: null
    }
  },
  mixins: [NotificationMixin, ArrayToObjectMixin],
  methods: {
    onUpdated (item) {
      this.showMessage(`${item['@id']}  ${('Updated')} `)
      this.$emit('close')
    },
    onUpdateForm (oneItem, allItems, additional = '') {
      const edited = this.convertArrayToObject(allItems)
      this.update({ id: this.id, credentials: { ...edited, ...additional } })
    },

  },
  computed: {
    isAllowEdit () {
      const profile = this.$store.getters['auth/profile']
      let nameOfGroupRole = pluralize(this.$route.name.split('-')[0].toUpperCase(), 1)
      if (nameOfGroupRole === 'SETTING') {
        nameOfGroupRole = 'SETTINGS'
      }
      const groupRole = profile.roles[nameOfGroupRole]
      if (groupRole) {
        return (groupRole.UPDATE)
      } else if (nameOfGroupRole === 'DICTIONARY') {
        return true
      }

      return false
    }
  },
  watch: {
    updated (updated) {
      if (!updated) {
        return
      }
      this.onUpdated(updated)
    },

    error (message) {
      message && this.showError(message)
    }
  }
}
