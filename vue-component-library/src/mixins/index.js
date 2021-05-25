// Convertors
import ArrayToObjectMixin from './Converters/ArrayToObjectMixin'
import EditItemsMixin from './Converters/EditItemsMixin'


// Generators
// import RoutesMixin from './Generator/RoutesMixin'
import SchemaMixin from './Generator/SchemaMixin'
// import StoreMixin from './Generator/StoreMixin'


// Notifications
import CreateMixin from './Notifications/CreateMixin'
import DeleteMixin from './Notifications/DeleteMixin'
import UpdateMixin from './Notifications/NotificationMixin'
import NotificationMixin from './Notifications/UpdateMixin'

// validation
// import validationRules from './validationRules'

const mixinsData = {
  ArrayToObjectMixin,
  EditItemsMixin,

  // RoutesMixin,
  // StoreMixin,
  SchemaMixin,

  CreateMixin,
  DeleteMixin,
  UpdateMixin,
  NotificationMixin,

  // validationRules
}

export default mixinsData