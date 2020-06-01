export default {
  state: () => ({
    moves: [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ]
  })
}

export const getters = {
  getMoves: (state) => () => {
    return state.moves
  }
}
