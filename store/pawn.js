export const SETPOSIBLESMOVES = 'setPosiblesMoves'
export const SETMOVED = 'setMoved'

export const state = () => ({
  moves: [
    [0, 1],
    [0, 2],
    [1, 1],
    [-1, 1]
  ],
  moved: false
})

export const getters = {
  getMoves: (state) => () => {
    return state.moves
  },
  getMoved: (state) => () => {
    return state.moved
  }
}

export const actions = {
  [SETMOVED]({ commit }, moved) {
    commit(SETMOVED, moved)
  },
  [SETPOSIBLESMOVES]({ commit, rootGetters, getters }, chessboardProps) {
    const posiblesMoves = []
    const direction = rootGetters['piece/getDirection']()
    const moves = getters.getMoves()
    const moved = getters.getMoved()
    const chessboard = [...rootGetters['chessboard/getChessboard']()]
    const x = chessboardProps.x
    const y = chessboardProps.y
    let xto = x + moves[0][0] * direction
    let yto = y + moves[0][1] * direction
    console.log(chessboard[xto][yto])
    if (this.notOutOfBounds(xto, yto) && chessboard[xto][yto].piece.id === 0) {
      console.log('PAWN POSIBLEMOVES: ', xto, yto)
      posiblesMoves.push([xto, yto])
    }

    if (moved === false && posiblesMoves.length > 0) {
      xto = x + moves[1][0] * direction
      yto = y + moves[1][1] * direction
      if (
        this.notOutOfBounds(xto, yto) &&
        chessboard[xto][yto].piece.id === 0
      ) {
        posiblesMoves.push([xto, yto])
      }
      //this.moved = true;
    }

    xto = x + moves[2][0] * direction
    yto = y + moves[2][1] * direction
    if (
      this.notOutOfBounds(xto, yto) &&
      chessboard[xto][yto].piece.id !== 0 &&
      chessboard[xto][yto].piece.direction !== direction
    ) {
      posiblesMoves.push([xto, yto])
    }

    xto = x + moves[3][0] * direction
    yto = y + moves[3][1] * direction
    if (
      this.notOutOfBounds(xto, yto) &&
      chessboard[xto][yto].piece.id !== 0 &&
      chessboard[xto][yto].piece.direction !== direction
    ) {
      posiblesMoves.push([xto, yto])
    }
    //console.log('PAWN POSIBLES MOVEMENTS:', posiblesMoves)
    commit('chessboard/setPosiblesMoves', posiblesMoves, { root: true })
    //commit(SETID, id)
  }
}

export const mutations = {
  [SETMOVED](state, moved) {
    state.moved = moved
  }
}
