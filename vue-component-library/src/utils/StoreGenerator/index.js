
import { makeCrudActions } from './actions'
import mutations from './mutations'

const getters = {
  // oneId
  oneId: state => state.oneId,
  
  // notifications
  isMainLoading: state => state.isMainLoading !== 0,
  error: state => state.error,

  // updates
  created: state => state.created,
  updated: state => state.updated,
  deleted: state => state.deleted,
  
  
  // allIds
  allIds: state => state.allIds,
  allIdsData: state => state.allIds.data,
  totalItems: state => state.allIds.totalItems,
  pageNumber: state => state.allIds.pageNumber
}
const state = () => (
  {
    allIds: {
      data: []
    },
    oneId: {},
    created: null,
    retrieved: null,
    deleted: null,
    error: '',
    isMainLoading: false,
    isMiniLoading: false,
    resetList: false,
    selectItems: null,
    totalItems: 0,
    updated: null,
    view: null,
    violations: null,

    // Page
    pageNumber: 1,
    totalPages: 0
  }
)

export default ({
  namespace
} = {}) => {
  return {
    actions: makeCrudActions(namespace),
    getters,
    mutations: {
      ...mutations
    },
    namespaced: true,
    state
  }
}
