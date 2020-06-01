export const SETDIRECTION = 'setDirection'
export const SETTYPE = 'setType'

export const state = () => ({
  moves: [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ]
})
export const getters = {
  getMoves: (state) => () => {
    return state.moves
  }
}

export const actions = {
  [SETDIRECTION]({ commit }, direction) {
    commit(SETDIRECTION, direction)
  },
  [SETTYPE]({ commit }, type) {
    commit(SETTYPE, type)
  }
}
