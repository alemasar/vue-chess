export const actions = {
  nuxtServerInit({ commit }) {
    console.log(' PASO AL INICI')
    commit('chessboard/setPositions')
  }
}
