// import GenerateChessboard from './helpers/generate-chessboard'
//import pawn from './pawn'
/*import tower from './tower'
import horse from './horse'
import bishop from './bishop'
import queen from './queen'
import king from './king'*/

// const generate = new GenerateChessboard()
export const SETCSSCLASS = 'setCssClass'
export const SETPOSITIONS = 'setPositions'
export const SETPIECES = 'setPieces'
export const SETPOSIBLEMOVES = 'setPosibleMoves'

export const state = () => ({
  chessboard: [],
  pieces: [],
  posiblesMoves: []
})

export const getters = {
  getChessboard: (state) => () => {
    return state.chessboard
  },
  getPieces: (state) => () => {
    return state.pieces
  }
}

export const actions = {
  [SETCSSCLASS]({ commit }, payload) {
    console.log(payload.x)
    commit(SETCSSCLASS, payload)
  },
  [SETPIECES]({ commit, rootState, rootGetters }) {
    const types = [...rootGetters['generate-chessboard/getTypePieces']()]
    console.log(types)
    const pieces = []
    types.forEach((type) => {
      commit('piece/setId', type.id, { root: true })
      commit('piece/setDirection', null, { root: true })
      commit('piece/setType', type.type, { root: true })
      commit('piece/setModule', type.module, { root: true })
      pieces.push({ ...rootState.piece })
    })
    console.log(pieces)
    commit(SETPIECES, pieces)
  },
  [SETPOSITIONS]({ commit, getters, rootGetters }) {
    console.log('PASO PER SETPOSITIONS', [
      ...rootGetters['generate-chessboard/getChessboard']()
    ])
    const chessboard = [...rootGetters['generate-chessboard/getChessboard']()]
    const initialTop = 480
    const initialLeft = 60
    const widthPiece = 60
    const heightPiece = 60
    let finalChessboard = []
    let direction = -1
    const cssClass = 'notSelected'
    chessboard.forEach((x, ix) => {
      finalChessboard[ix] = []
      const left = initialLeft + ix * widthPiece
      x.forEach((y, iy) => {
        const top = initialTop - iy * heightPiece
        const pieces = [...getters.getPieces()]
        if (iy < 2) {
          direction = 1
        } else {
          direction = -1
        }
        console.log(direction)
        const piece = pieces.filter((p) => p.id === y.piece)
        if (piece.length > 0) {
          piece[0].direction = direction
        }
        console.log(piece)
        /* const piece = state.pieces
          .map((piece) => {
            if (parseInt(Object.keys(piece)[0]) === y.piece) {
              piece[Object.keys(piece)[0]].direction = direction
              piece[Object.keys(piece)[0]].type = parseInt(
                Object.keys(piece)[0]
              )
              return piece[Object.keys(piece)[0]]
            }
          })
          .filter((p) => p)
        console.log(piece)*/
        finalChessboard[ix][iy] = {
          piece: { ...piece[0] },
          top,
          left,
          x: ix,
          y: iy,
          cssClass
        }
      })
    })
    commit(SETPOSITIONS, [...finalChessboard])
  },
  [SETPOSIBLEMOVES]({ commit }) {
    commit(SETPOSIBLEMOVES)
  }
}

export const mutations = {
  [SETCSSCLASS](state, { x, y, cssClass }) {
    console.log(x)
    state.chessboard[x][y].cssClass = cssClass
  },
  [SETPOSIBLEMOVES]({ commit }) {
    commit('setPosiblesMoves')
  },
  [SETPIECES](state, pieces) {
    state.pieces = pieces
  },
  [SETPOSITIONS](state, chessboard) {
    state.chessboard = chessboard
  }
}
