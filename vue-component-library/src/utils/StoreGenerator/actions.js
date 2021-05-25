import * as types from './mutation_types'
import commonServices from '@/services/commonServices'

const permMsg = 'Check your permissions'

export const makeCrudActions = (namespace) => {
  return {
    // FETCH ALL by initialize
    fetchAll: async ({ commit }, query = {}) => {
      commit(types.SET_ERROR, '')
      commit(types.TOGGLE_LOADING, true)
      try {
        const { data, totalItems } = await commonServices.getItems(namespace, query)

        let pageNumber = 1
        if (query && query.page) {
          pageNumber = query.page
        }
        commit(types.SET_ALLIDS, {data, totalItems, pageNumber})
        commit(types.TOGGLE_LOADING, false)
      } catch (error) {
        commit(types.SET_ALLIDS, [])
        commit(types.TOGGLE_LOADING, false)
        commit(types.SET_ERROR, 'Unfortunately, no data received.' + permMsg)
      }
    },
    // FETCH ONE by initializekkkk
    fetchOne: async ({ commit }, {id}) => {
      commit(types.SET_ERROR, '')
      commit(types.TOGGLE_LOADING, true)
      try {
        const { data } = await commonServices.getItem(namespace, id)
        commit(types.TOGGLE_LOADING, false)
        commit(types.SET_ONEID, data)
      } catch (error) {
        commit(types.TOGGLE_LOADING, false)
        commit(types.SET_ERROR, "Cant get " + id + '.' + permMsg)
      }
    },
    // CREATE ONE ITEM by push
    create: async ({ commit }, value) => {
      commit(types.SET_ERROR, '')
      commit(types.TOGGLE_LOADING, true)
      try {
        const { data } = await commonServices.post(namespace, value)
        commit(types.SET_CREATED, data)
        commit(types.TOGGLE_LOADING, false)
      } catch (error) {
        commit(types.TOGGLE_LOADING, false)
        commit(types.SET_ERROR, 'Cant create ' + permMsg)
      }
    },
    // DELETE ONE ITEM
    delete: async ({ commit }, { id }) => {
      commit(types.SET_ERROR, '')
      commit(types.TOGGLE_LOADING, true)
      try {
        await commonServices.deleteItem(namespace, id)
        commit(types.SET_DELETED, id)
        commit(types.TOGGLE_LOADING, false)
      } catch (error) {
        commit(types.TOGGLE_LOADING, false)
        commit(types.SET_ERROR, 'Cant delete ' + permMsg)
      }
    },
    // update data in one item
    update: async ({ commit }, { id, credentials }) => {
      commit(types.SET_ERROR, '')
      commit(types.TOGGLE_LOADING, true)
      try {
        const { data } = await commonServices.update(namespace, { id, credentials })

        commit(types.SET_UPDATED, data)
        commit(types.TOGGLE_LOADING, false)
      } catch (error) {
        commit(types.TOGGLE_LOADING, false)
        commit(types.SET_ERROR, 'Cant update ' + permMsg)
      }
    },
    setError: ({ commit }, error) => {
      commit(types.SET_ERROR, error)
    }

  }
}
