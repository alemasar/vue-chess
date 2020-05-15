// import GenerateChessboard from './helpers/generate-chessboard'
import pawn from './pawn'
import tower from './tower'
import horse from './horse'
import bishop from './bishop'
import queen from './queen'
import king from './king'
import chessboard from './generate-chessboard'

// const generate = new GenerateChessboard()

export const state = () => ({
  chessboard: [],
  pieces: [
    { 1: { ...pawn.state() } },
    { 2: { ...tower.state() } },
    { 3: { ...horse.state() } },
    { 4: { ...bishop.state() } },
    { 5: { ...king.state() } },
    { 6: { ...queen.state() } }
  ]
})

export const getters = {
  getColumn: (state) => () => {
    return state.chessboard
  }
}

export const mutations = {
  setPositions(state) {
    //console.log('PASO PER SETPOSITIONS', chessboard)
    const initialTop = 480
    const initialLeft = 60
    const widthPiece = 60
    const heightPiece = 60
    let direction = -1
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
        const piece = state.pieces
          .map((piece) => {
            if (parseInt(Object.keys(piece)[0]) === y.piece) {
              piece[Object.keys(piece)[0]].direction = direction
              piece[Object.keys(piece)[0]].type = Object.keys(piece)[0]
              return piece[Object.keys(piece)[0]]
            }
          })
          .filter((p) => p)

        state.chessboard[ix][iy] = {
          piece: { ...piece[0] },
          top,
          left
        }
      })
    })
  }
}
