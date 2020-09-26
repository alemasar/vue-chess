export const SETGAMES = 'setGames'
export const SETLOADINGGAMES = 'setLoadingGames'

export const state = () => ({
  games: [],
  loadingGames: false
})

export const getters = {
  getGames: (state) => () => {
    return state.games
  }
}

export const actions = {
  async [SETGAMES]({ commit /*, getters*/ }, games) {
    commit(SETLOADINGGAMES, true)
    console.log('GAME TO ADD:', games)
    commit(SETGAMES, games)
    commit(SETLOADINGGAMES, false)
  },
  [SETLOADINGGAMES]({ commit }, loadingGame) {
    commit(SETLOADINGGAMES, loadingGame)
  }
}

export const mutations = {
  [SETGAMES](state, games) {
    state.games = [...games]
  },
  [SETLOADINGGAMES](state, loadingGame) {
    state.loadingGame = loadingGame
  }
}
