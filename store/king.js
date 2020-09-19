export const SETPOSIBLESMOVES = 'setPosiblesMoves'

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
  [SETPOSIBLESMOVES]({ commit, rootGetters, getters }, chessboardProps) {
    const posiblesMoves = []
    const direction = rootGetters['piece/getDirection']()
    const moves = getters.getMoves()
    const chessboard = [...rootGetters['chessboard/getChessboard']()]
    const x = chessboardProps.x
    const y = chessboardProps.y
    moves.forEach((m) => {
      let xto = x + m[0] * direction
      let yto = y + m[1] * direction
      if (this.notOutOfBounds(xto, yto)) {
        if (
          (chessboard[xto][yto].piece.id !== 0 &&
            chessboard[xto][yto].piece.direction !== direction) ||
          chessboard[xto][yto].piece.id === 0
        ) {
          posiblesMoves.push([xto, yto])
        }
      }
    })
    //console.log('POSIBLES MOVEMENTS:', posiblesMoves)
    commit('chessboard/setPosiblesMoves', posiblesMoves, { root: true })
  }
}
