// import GenerateChessboard from './helpers/generate-chessboard'
//import pawn from './pawn'
/*import tower from './tower'
import horse from './horse'
import bishop from './bishop'
import queen from './queen'
import king from './king'*/
import chessboard from './generate-chessboard'

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
  getColumn: (state) => () => {
    return state.chessboard
  }
}

export const actions = {
  [SETCSSCLASS]({ commit }, payload) {
    console.log(payload.x)
    commit(SETCSSCLASS, payload)
  },
  [SETPIECES]({ commit, rootState }) {
    const types = [
      {
        id: 1,
        type: 'pawn',
        module: 'pawn'
      },
      {
        id: 2,
        type: 'tower',
        module: 'piece'
      },
      {
        id: 3,
        type: 'horse',
        module: 'horse'
      },
      {
        id: 4,
        type: 'bishop',
        module: 'piece'
      },
      {
        id: 5,
        type: 'king',
        module: 'king'
      },
      {
        id: 6,
        type: 'queen',
        module: 'piece'
      }
    ]
    const pieces = []
    types.forEach((type) => {
      pieces.push({ ...rootState.piece })
      commit('piece/setId', type.id, { root: true })
      commit('piece/setDirection', null, { root: true })
      commit('piece/setType', type.type, { root: true })
      commit('piece/setModule', type.module, { root: true })
    })
    console.log(pieces)
    /*const pieces = [
      { 1: { ...rootState.pawn } },
      { 2: { ...rootState.tower } },
      { 3: { ...rootState.horse } },
      { 4: { ...rootState.bishop } },
      { 5: { ...rootState.king } },
      { 6: { ...rootState.queen } }
    ]*/
    commit(SETPIECES, pieces)
  },
  [SETPOSITIONS]({ commit }) {
    commit(SETPOSITIONS)
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
  [SETPOSITIONS](state) {
    console.log('PASO PER SETPOSITIONS', state)
    console.log('PASO PER SETPOSITIONS', chessboard)
    /*const initialTop = 480
    const initialLeft = 60
    const widthPiece = 60
    const heightPiece = 60
    let direction = -1
    const cssClass = 'notSelected'
    // console.log(chessboard.state().initialChessboard)
    chessboard.state().initialChessboard.forEach((x, ix) => {
      state.chessboard[ix] = []
      const left = initialLeft + ix * widthPiece
      x.forEach((y, iy) => {
        const top = initialTop - iy * heightPiece
        if (iy < 2) {
          direction = 1
        } else {
          direction = -1
        }
        console.log(state.pieces)
        const piece = state.pieces
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
        console.log(piece)
        state.chessboard[ix][iy] = {
          piece: { ...piece[0] },
          top,
          left,
          x: ix,
          y: iy,
          cssClass
        }
      })
    })*/
  }
}
