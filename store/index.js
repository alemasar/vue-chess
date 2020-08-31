import { pluginsImpl } from './plugins'

export const SETSTATUS = 'setStatus'
export const SETXINI = 'setXIni'
export const SETYINI = 'setYIni'
export const SETXFI = 'setXFi'
export const SETYFI = 'setYFi'
export const SETPLAYER = 'setPlayer'
export const plugins = [pluginsImpl]

export const state = () => ({
  status: 0,
  xini: 0,
  yini: 0,
  xfi: 0,
  yfi: 0,
  player: -1
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
  },
  getXFi: (state) => () => {
    return state.xfi
  },
  getYFi: (state) => () => {
    return state.yfi
  },
  getPlayer: (state) => () => {
    console.log(state.player)
    return state.player
  }
}

export const actions = {
  nuxtServerInit({ dispatch }) {
    console.log(' PASO AL INICI')
    dispatch('chessboard/setPieces')
    dispatch('chessboard/setPositions')
  },
  [SETSTATUS]({ commit }, status) {
    console.log(status)
    commit(SETSTATUS, status)
  },
  [SETXINI]({ commit }, x) {
    commit(SETXINI, x)
  },
  [SETYINI]({ commit }, y) {
    commit(SETYINI, y)
  },
  [SETXFI]({ commit }, x) {
    commit(SETXFI, x)
  },
  [SETYFI]({ commit }, y) {
    commit(SETYFI, y)
  },
  [SETPLAYER]({ commit }, player) {
    console.log(player)
    commit(SETPLAYER, player)
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
  },
  [SETXFI](state, xini) {
    state.xfi = xini
  },
  [SETYFI](state, yini) {
    state.yfi = yini
  },
  [SETPLAYER](state, player) {
    state.player = player
  }
}
