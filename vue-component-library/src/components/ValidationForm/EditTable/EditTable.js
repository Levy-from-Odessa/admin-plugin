
// MIXINS
import getData from '../../../components/UI/ShowMultiData/getData'
import EditItemsMixin from '../../../mixins/Converters/EditItemsMixin'
import MixinSchema  from '../../../mixins/Generator/SchemaMixin'
// PARTS
import Headers from './Parts/Headers'
import Actions from './Parts/Actions'
// generated
// import Field from './Parts/Field'
// FORM
import SoloForm from '../SoloForm'
export default {
  name: 'FtthValEditTable',
  mixins: [
    getData, 
    EditItemsMixin, 
    MixinSchema,

    // Field
  ],
  components:{
    Headers,
    Actions,
    SoloForm
  },
  props:{
    schemas: {
      type: Object,
      default: () => {}
    },
    ignoreArray:{
      type: Array,
      default: () => []
    },
    readOnlyArray:{
      type: Array,
      default: () => []
    },
 
  },
  data () {
    return{
      editItems: [],
      editSchemas: {}
    }
  },
  methods: {
    openEditMode (itemName) {
      this.editItems.forEach((item) => {
        if (item.name === itemName) {
          item.editMode = true
        }
      })
    },
    closeEditMode (itemName) {
      
      const currentItem = this.editItems.find(item => (item.name === itemName))
      if (currentItem.table) {
        this.editItems.forEach((item) => {
          if (item.name === itemName) {
            item.editMode = false
          }
        })
      } else {
        const allRefs = Object.keys(this.$refs)
        const isFormExist = (allRefs.findIndex(ref => ref === itemName + 'Form')) !== -1
        const currItem = this.editItems.find(item => item.name === itemName)
        
        if (!isFormExist) {
          currItem.editMode = false
          return
        } 
          
        const createForm = this.$refs[`${itemName}Form`][0] || ''

        createForm.$v.form.$touch()


        if (!createForm.$v.$invalid) {
          currItem.editMode = false
          this.$emit('itemUpdated', currItem, this.editItems) // watch every update
        } else {
          alert(('Check the form'), createForm.errorMessages)
        }
      }
    },
    deleteItem (item) {
      this.$emit('itemDelete', item)
    },
    slotExist(name){
      return typeof this.$scopedSlots[name] !== 'undefined'
    },

    setSchemas(items){
      const editData = items.data || items 
      this.editSchemas = {
        ...this.schemaGenerator(editData, 'BaseInput'),
        ...this.schemas
      }
      this.editItems = Object.assign(
        [], 
        this.toEditItemsProp(
          editData, 
          this.ignoreArray,
          this.readOnlyArray
        )
      )
    }

  },
  mounted(){
    if (this.readyItems) {
      this.setSchemas(this.readyItems)
    }
  },

  watch:{
    dataGetter(items){
      this.setSchemas(items)
    },
  }

}