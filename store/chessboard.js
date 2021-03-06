export const SETCSSCLASS = 'setCssClass'
export const SETPOSITIONS = 'setPositions'
export const SETPIECES = 'setPieces'
export const SETPOSIBLESMOVES = 'setPosiblesMoves'
export const SETPIECEMOVED = 'setPieceMove'
export const SETMOVE = 'setMove'
export const SETDIRECTMOVE = 'setDirectMove'
export const DESELECTPIECE = 'deselectPiece'

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
  },
  getPosiblesMoves: (state) => () => {
    // console.log('GET POSIBLES MOVES ', state.posiblesMoves)
    return state.posiblesMoves
  }
}

export const actions = {
  [SETCSSCLASS]({ commit }, payload) {
    commit(SETCSSCLASS, payload)
  },
  [SETPIECEMOVED]({ commit }, payload) {
    commit(SETPIECEMOVED, payload)
  },
  [SETPIECES]({ commit, rootState, rootGetters }) {
    const types = [...rootGetters['generate-chessboard/getTypePieces']()]
    const pieces = []
    types.forEach((type) => {
      commit('piece/setId', type.id, { root: true })
      commit('piece/setDirection', null, { root: true })
      commit('piece/setType', type.type, { root: true })
      commit('piece/setModule', type.module, { root: true })
      pieces.push({ ...rootState.piece })
    })
    commit(SETPIECES, pieces)
  },
  [SETPOSITIONS]({ commit, getters, rootGetters }) {
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
        const pieces = getters.getPieces()

        if (iy < 2) {
          direction = 1
        } else {
          direction = -1
        }
        const piece = []
        pieces.forEach((p) => {
          const pieceCopy = { ...p }
          if (pieceCopy.id === y.piece) {
            pieceCopy.direction = direction
            piece.push({ ...pieceCopy })
          }
        })
        // console.log(piece)
        if (piece.length === 0) {
          piece.push({
            id: 0
          })
        }
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
    //console.log(finalChessboard)
    commit(SETPOSITIONS, [...finalChessboard])
  },
  [SETPOSIBLESMOVES]({ dispatch, rootGetters, getters }) {
    const x = rootGetters.getXIni()
    const y = rootGetters.getYIni()
    const chessboard = [...getters.getChessboard()]
    let movements = []
    //console.log(chessboard[x][y])
    dispatch('piece/setDirection', chessboard[x][y].piece.direction, {
      root: true
    })
    dispatch(
      chessboard[x][y].piece.module + '/setPosiblesMoves',
      { x, y },
      {
        root: true
      }
    )
    //console.log('GET POSIBLES MOVES ', getters.getPosiblesMoves())
    movements = getters.getPosiblesMoves()
    movements.forEach((mov) => {
      dispatch(SETCSSCLASS, { x: mov[0], y: mov[1], cssClass: 'posibleMove' })
    })
    //commit(SETPOSIBLEMOVES)
  },
  [SETMOVE]({ dispatch, commit, getters, rootGetters }) {
    //console.log(payload)
    const xini = rootGetters.getXIni()
    const yini = rootGetters.getYIni()
    const xfi = rootGetters.getXFi()
    const yfi = rootGetters.getYFi()
    const movements = getters.getPosiblesMoves()
    const chessboard = [...getters.getChessboard()]
    const player = rootGetters.getPlayer()
    let move = false
    movements.forEach((mov) => {
      if (mov[0] === xfi && mov[1] === yfi) {
        move = true
      }
    })
    if (move) {
      commit(SETMOVE, {
        xini,
        yini,
        xfi,
        yfi
      })
      movements.forEach((mov) => {
        dispatch(SETCSSCLASS, { x: mov[0], y: mov[1], cssClass: 'notSelected' })
      })
      dispatch(SETCSSCLASS, { x: xini, y: yini, cssClass: 'notSelected' })
      if (chessboard[xfi][yfi].piece.id === 1) {
        // console.log('CHESSBOARD PAWN: ', chessboard[xfi][yfi].piece)
        //        chessboard[xfi][yfi].piece.moved = true
        commit(SETPIECEMOVED, { x: xfi, y: yfi, moved: true })
      }
      commit('setStatus', 0, { root: true })
      commit('setPlayer', player * -1, { root: true })
    } else {
      commit('setStatus', 1, { root: true })
    }
  },
  [SETDIRECTMOVE]({ commit }, payload) {
    commit(SETMOVE, {
      xini: payload.xini,
      yini: payload.yini,
      xfi: payload.xfi,
      yfi: payload.yfi
    })
  },
  [DESELECTPIECE]({ dispatch, commit, rootGetters, getters }) {
    const x = rootGetters.getXIni()
    const y = rootGetters.getYIni()
    const movements = getters.getPosiblesMoves()
    commit(SETCSSCLASS, { x, y, cssClass: 'notSelected' })
    movements.forEach((mov) => {
      dispatch(SETCSSCLASS, { x: mov[0], y: mov[1], cssClass: 'notSelected' })
    })
    commit('setStatus', 0, { root: true })
  }
}

export const mutations = {
  [SETCSSCLASS](state, { x, y, cssClass }) {
    state.chessboard[x][y].cssClass = cssClass
  },
  [SETPIECEMOVED](state, { x, y, moved }) {
    state.chessboard[x][y].piece.moved = moved
  },
  [SETPOSIBLESMOVES](state, posiblesMoves) {
    state.posiblesMoves = [...posiblesMoves]
    //console.log('setPosiblesMoves ', state.posiblesMoves)
  },
  [SETPIECES](state, pieces) {
    state.pieces = pieces
  },
  [SETPOSITIONS](state, chessboard) {
    state.chessboard = chessboard
  },
  [SETMOVE](state, { xini, yini, xfi, yfi }) {
    state.chessboard[xfi][yfi].piece = state.chessboard[xini][yini].piece
    state.chessboard[xini][yini].piece = {}
    // console.log('xini' + xini + ' yini ' + yini)
    state.chessboard[xini][yini].piece.id = 0
    //console.log('MUTATION SET MOVE', state)
  }
}
