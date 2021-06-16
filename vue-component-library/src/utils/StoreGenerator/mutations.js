import remove from 'lodash/remove'
import Vue from 'vue'
import * as types from './mutation_types'
export default {

  [types.SET_ALLIDS]: (state, items) => {
    Object.assign(state, { allIds: items })
  },
  [types.SET_ONEID]: (state, item) => {
    Object.assign(state, { oneId: item })
  },

  [types.RESET_LIST]: (state) => {
    Object.assign(state, {
      allIds: {},
      oneId: {},
      resetList: false
    })
  },
  [types.SET_CREATED]: (state, created) => {
    if (state.allIds.data.includes(created['@id'])) { return }

    // Vue.set(state.oneId, created['@id'], created)
    state.allIds.data.push(created)
    state.allIds.totalItems++
    Object.assign(state, {
      oneId: created,
      created,
    })
  },
  [types.SET_DELETED]: (state, id) => {
    Object.assign(state, {
      allIds: {
        data: remove(state.allIds.data, item => item.id !== id),
        totalItems: state.allIds.totalItems--
      },
      oneId: remove(state.oneId, id => id.id !== id),
      deleted: id,
    })
  },
  [types.SET_ERROR]: (state, error) => {
    Object.assign(state, { error })
  },
  [types.SET_SELECT_ITEMS]: (state, selectItems) => {
    Object.assign(state, {
      error: '',
      isMainLoading: false,
      selectItems
    })
  },
  [types.SET_UPDATED]: (state, updated) => {
    if(state.allIds.data.length > 0){
      const index = state.allIds.data.findIndex(el => el['@id'] === updated['@id'])
      Vue.set(state.allIds.data, index, updated)
    }
    Object.assign(state, { updated, oneId: updated })
  },
  [types.SET_VIEW]: (state, view) => {
    Object.assign(state, { view })
  },
  [types.SET_VIOLATIONS]: (state, violations) => {
    Object.assign(state, { violations })
  },
  [types.TOGGLE_LOADING]: (state, isMainLoading) => {
    const count = isMainLoading ? +1 : -1
    const loadingCount = state.isMainLoading + count
    Object.assign(state, {
      isMainLoading: loadingCount
    })
  },
  [types.TOGGLE_MINI_LOADING]: (state) => {
    Object.assign(state, { error: '', isMiniLoading: !state.isMiniLoading })
  },
  [types.SET_RETRIEVED]: (state, retrieved) => {
    Object.assign(state, { retrieved })
  }
}
