export const SETID = 'setId'
export const SETDIRECTION = 'setDirection'
export const SETTYPE = 'setType'
export const SETMODULE = 'setModule'

export const state = () => ({
  id: 0,
  direction: 0,
  type: '',
  module: ''
})

export const getters = {
  getDirection: (state) => () => {
    return state.direction
  }
}

export const actions = {
  [SETDIRECTION]({ commit }, direction) {
    commit(SETDIRECTION, direction)
  },
  [SETTYPE]({ commit }, type) {
    commit(SETTYPE, type)
  },
  [SETMODULE]({ commit }, module) {
    commit(SETMODULE, module)
  },
  [SETID]({ commit }, id) {
    commit(SETID, id)
  }
}

export const mutations = {
  [SETDIRECTION](state, direction) {
    state.direction = direction
  },
  [SETTYPE](state, type) {
    state.type = type
  },
  [SETMODULE](state, module) {
    state.module = module
  },
  [SETID](state, id) {
    state.id = id
  }
}
