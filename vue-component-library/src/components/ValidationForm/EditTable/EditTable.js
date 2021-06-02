
// MIXINS
import getData from '../../../components/UI/ShowMultiData/getData'
import EditItemsMixin from '@/mixins/Converters/EditItemsMixin'
import MixinSchema  from '../../../mixins/Generator/SchemaMixin'
// PARTS
import Headers from './Parts/Headers'
import Actions from './Parts/Actions'
// generated
// import Field from './Parts/Field'
// FORM
import SoloForm from '@/components/ValidationForm/SoloForm'
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
    }
 
  },
  data () {
    return{
      editItems: [],
      editSchemas: {}


    }
  },
  methods: {
    openEditMode (itemName) {
      // this.editItems.forEach((item) => {
      //   if (item.editMode) {
      //     this.closeEditMode(item.name)
      //   }
      // })
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
        const createForm = this.$refs[`${itemName}Form`][0]
        createForm.$v.form.$touch()
        if (!createForm.$v.$invalid) {
          this.editItems.forEach((item) => {
            if (item.name === itemName ) {
              item.editMode = false
              this.$emit('itemUpdated', item, this.editItems) // watch every update
            }
          })
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
    }

  },


  watch:{
    dataGetter(items){
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
  }

}