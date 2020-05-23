export const SETSTATUS = 'setStatus'
export const SETXINI = 'setXIni'
export const SETYINI = 'setYIni'

export const state = () => ({
  status: 0,
  xini: 0,
  yini: 0
})

export const getters = {
  getStatus: (state) => () => {
    return state.status
  },
  getXIni: (state) => () => {
    return state.xini
  },
  getYIni: (state) => () => {
    return state.yini
  }
}

export const actions = {
  nuxtServerInit({ dispatch /*, dispatch*/ }) {
    console.log(' PASO AL INICI')
    dispatch('chessboard/setPieces')
    dispatch('chessboard/setPositions')
  },
  [SETSTATUS]({ commit }, status) {
    console.log(status)
    commit(SETSTATUS, status)
  },
  [SETXINI]({ commit }, x) {
    console.log(x)
    commit(SETXINI, x)
  },
  [SETYINI]({ commit }, y) {
    console.log(y)
    commit(SETYINI, y)
  }
}

export const mutations = {
  [SETSTATUS](state, status) {
    state.status = status
  },
  [SETXINI](state, xini) {
    state.xini = xini
  },
  [SETYINI](state, yini) {
    state.yini = yini
  }
}
