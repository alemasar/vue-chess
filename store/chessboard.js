// import GenerateChessboard from './helpers/generate-chessboard'
import pawn from './pawn'
import tower from './tower'
import horse from './horse'
import bishop from './bishop'
import queen from './queen'
import king from './king'

// const generate = new GenerateChessboard()

export const state = () => ({
  chessboard: { ...pawn.state() },
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
  setPositions(/*state*/) {
    console.log('PASO PER SETPOSITIONS')
  }
}
