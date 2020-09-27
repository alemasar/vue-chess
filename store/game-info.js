export const SETGAMES = 'setGames'
export const ADDGAME = 'addGame'
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
  [ADDGAME]({ commit /*, getters*/ }, game) {
    commit(ADDGAME, game)
  },
  [SETLOADINGGAMES]({ commit }, loadingGame) {
    commit(SETLOADINGGAMES, loadingGame)
  }
}

export const mutations = {
  [ADDGAME](state, game) {
    state.games.push({ ...game })
  },
  [SETGAMES](state, games) {
    state.games = [...games]
  },
  [SETLOADINGGAMES](state, loadingGame) {
    state.loadingGame = loadingGame
  }
}
