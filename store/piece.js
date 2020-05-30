export const SETID = 'setId'
export const SETDIRECTION = 'setDirection'
export const SETTYPE = 'setType'
export const SETMODULE = 'setModule'
export const SETPOSIBLESMOVES = 'setPosiblesMoves'

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
  },
  [SETPOSIBLESMOVES]({ commit, rootGetters, getters }, chessboardProps) {
    const posiblesMoves = []
    const direction = rootGetters['piece/getDirection']()
    const moves = getters.getMoves()
    const chessboard = [...rootGetters['chessboard/getChessboard']()]
    console.log('PAWN POSIBLEMOVES: ', moves)
    console.log('PAWN POSIBLEMOVES: ', direction)
    console.log('PAWN POSIBLEMOVES: ', chessboard)

    moves.forEach((m) => {
      let xto = parseInt(chessboardProps.x) + m[0] * direction
      let yto = parseInt(chessboardProps.y) + m[1] * direction
      while (
        this.notOutOfBounds(xto, yto) &&
        chessboard[xto][yto].piece.id === 0
      ) {
        posiblesMoves.push([xto, yto])
        xto = parseInt(xto) + m[0] * direction
        yto = parseInt(yto) + m[1] * direction
      }
      if (
        this.notOutOfBounds(xto, yto) &&
        chessboard[xto][yto].piece.id !== 0 &&
        chessboard[xto][yto].piece.direction !== direction
      ) {
        posiblesMoves.push([xto, yto])
      }
    })
    console.log('POSIBLES MOVEMENTS:', posiblesMoves)
    commit('chessboard/setPosiblesMoves', posiblesMoves, { root: true })
    //commit(SETID, id)
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
