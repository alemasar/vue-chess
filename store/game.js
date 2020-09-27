export const SETIDGAME = 'setIdGame'
export const SETSTATUS = 'setStatus'
export const SETWPLAYER = 'setWPlayer'
export const SETBPLAYER = 'setBPlayer'
export const SETACTIVEPLAYER = 'setActivePlayer'
export const SETGAME = 'setGame'
export const JOINGAME = 'setJoinGame'
export const GETGAME = 'getGame'
export const SETADDINGGAME = 'setAddingGame'

export const state = () => ({
  idGame: '',
  status: -1,
  wPlayer: '',
  bPlayer: '',
  activePlayer: 0,
  addingGame: false
})

export const getters = {
  getIdGame: (state) => () => {
    return state.idGame
  },
  getStatus: (state) => () => {
    return state.status
  },
  getWPlayer: (state) => () => {
    return state.wPlayer
  },
  getBPlayer: (state) => () => {
    return state.bPlayer
  },
  getActivePlayer: (state) => () => {
    return state.activePlayer
  },
  getAddingGame: (state) => () => {
    return state.addingGame
  }
}

export const actions = {
  async [GETGAME]({ commit /*, getters */ }, gameName) {
    const game = await this.$fireStore.collection('game').doc(gameName).get()
    if (game.exists) {
      const gameInfo = game.data()
      commit(SETIDGAME, gameName)
      commit(SETACTIVEPLAYER, gameInfo.activePlayer)
      if (gameInfo.user.length === 1) {
        if (gameInfo.user[0].usercolor === '1') {
          commit(SETWPLAYER, gameInfo.user[0].name)
        } else {
          commit(SETBPLAYER, gameInfo.user[0].name)
        }
      } else {
        console.log('LA INFORMACION DE ESTA PARTIDA YA ESTA COMPLETA')
      }
    } else {
      console.log('LA PARTIDA QUE BUSCA NO EXISTE')
    }
  },
  async [SETGAME]({ commit, getters }) {
    const nameGame = getters.getIdGame()
    let name = getters.getWPlayer()
    let usercolor = '1'
    let activePlayer = getters.getActivePlayer()
    commit(SETSTATUS, 3)
    commit(SETADDINGGAME, true)
    if (name === '') {
      name = getters.getBPlayer()
      usercolor = '-1'
    }
    console.log(nameGame)
    try {
      const status = getters.getStatus()
      await this.$fireStore
        .collection('game')
        .doc(nameGame)
        .set({
          activePlayer,
          status,
          user: [
            {
              name,
              usercolor
            }
          ]
        })
    } catch (e) {
      console.log(e)
    }
    //.add({ name: nameGame })
    commit(SETADDINGGAME, false)
    /* this.$fireStore
      .collection('game')
      .doc(nameGame)
      .onSnapshot((doc) => {
        const data = doc.data()
        if (data.status === 4) {
          data.user.forEach((u) => {
            if (u.usercolor === '1') {
              commit(SETWPLAYER, u.name)
            } else {
              commit(SETBPLAYER, u.name)
            }
          })
          commit(SETACTIVEPLAYER, data.activePlayer)
          commit(SETSTATUS, data.status)
        }
      })*/
  },
  async [JOINGAME]({ commit, getters }, addColor) {
    const nameGame = getters.getIdGame()
    let name = getters.getWPlayer()
    let activePlayer = getters.getActivePlayer()
    let usercolor = '1'
    console.log('NOMBRE PARTIDA', nameGame)
    // commit(SETSTATUS, 4)
    commit(SETADDINGGAME, true)
    if (addColor === '-1') {
      name = getters.getBPlayer()
      usercolor = '-1'
    }
    try {
      const status = getters.getStatus()
      console.log('UPDATE THE GAME')
      await this.$fireStore
        .collection('game')
        .doc(nameGame)
        .update({
          activePlayer,
          status,
          user: this.$fireStoreObj.FieldValue.arrayUnion({
            name,
            usercolor
          })
        })
    } catch (e) {
      console.log(e)
    }

    //.add({ name: nameGame })
    commit(SETADDINGGAME, false)
    /* this.$fireStore
      .collection('game')
      .doc(nameGame)
      .onSnapshot((doc) => {
        const data = doc.data()
        console.log('UNEIXO A PARTIDA', doc.data())
        data.user.forEach((u) => {
          if (u.usercolor === '1') {
            commit(SETWPLAYER, u.name)
          } else {
            commit(SETBPLAYER, u.name)
          }
        })
        commit(SETACTIVEPLAYER, data.activePlayer)
        commit(SETSTATUS, data.status)
      })*/
  },
  [SETIDGAME]({ commit }, idGame) {
    commit(SETIDGAME, idGame)
  },
  [SETSTATUS]({ commit }, status) {
    commit(SETSTATUS, status)
  },
  [SETWPLAYER]({ commit }, wPlayer) {
    commit(SETWPLAYER, wPlayer)
  },
  [SETBPLAYER]({ commit }, bPlayer) {
    commit(SETBPLAYER, bPlayer)
  },
  [SETACTIVEPLAYER]({ commit }, activePlayer) {
    commit(SETACTIVEPLAYER, activePlayer)
  },
  [SETADDINGGAME]({ commit }, addingGame) {
    commit(SETADDINGGAME, addingGame)
  }
}

export const mutations = {
  [SETIDGAME](state, idGame) {
    state.idGame = idGame
  },
  [SETSTATUS](state, status) {
    state.status = status
  },
  [SETWPLAYER](state, wPlayer) {
    state.wPlayer = wPlayer
  },
  [SETBPLAYER](state, bPlayer) {
    state.bPlayer = bPlayer
  },
  [SETACTIVEPLAYER](state, activePlayer) {
    state.activePlayer = activePlayer
  },
  [SETADDINGGAME](state, addingGame) {
    state.addingGame = addingGame
  }
}
