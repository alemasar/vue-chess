export const state = () => ({
  moves: [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
  ]
})
export const getters = {
  getMoves: (state) => () => {
    return state.moves
  }
}
