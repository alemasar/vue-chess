export const SETGAMESEVENT = 'setGamesEvent'
export const SETUNSUBSCRIBEGAMESEVENT = 'setUnsubscribeGamesEvent'
export const UNSUBSCRIBEGAMESEVENT = 'unsubscribeGamesEvent'
export const SETINITSTATE = 'setInitState'
export const SETGAMES = 'setGames'

const parseUser = (doc, changes) => {
  let wPlayer = ''
  let bPlayer = ''
  changes.user.forEach((u) => {
    if (u.usercolor === '1') {
      wPlayer = u.name
    } else if (u.usercolor === '-1') {
      bPlayer = u.name
    }
  })
  return {
    id: doc.id,
    activePlayer: changes.activePlayer,
    wPlayer,
    bPlayer
  }
}

export const state = () => ({
  unsubscribe: {},
  initState: true
})

export const getters = {
  getInitState: (state) => () => {
    return state.initState
  },
  getUnsubscribe: (state) => () => {
    return state.unsubscribe
  }
}

export const actions = {
  [SETINITSTATE]({ commit /*, getters*/ }, initState) {
    commit(SETINITSTATE, initState)
  },
  [SETUNSUBSCRIBEGAMESEVENT]({ commit /*, getters*/ }, unsubscribe) {
    console.log(unsubscribe)
    commit(SETUNSUBSCRIBEGAMESEVENT, unsubscribe)
  },
  [UNSUBSCRIBEGAMESEVENT]({ commit, getters }) {
    const unsubscribe = getters.getUnsubscribe()
    unsubscribe()
    commit(SETUNSUBSCRIBEGAMESEVENT, {})
  },
  async [SETGAMESEVENT]({ /*commit , */ dispatch, getters } /*, games*/) {
    const unsubscribe = this.$fireStore
      .collection('game')
      .onSnapshot(async (snapshot) => {
        const initState = getters.getInitState()
        console.log(initState)
        if (initState) {
          dispatch(SETINITSTATE, false)
        } else {
          snapshot.docChanges().forEach((change) => {
            const changes = change.doc.data()
            if (change.type === 'added') {
              console.log(changes.status)
              if (changes.status === 3) {
                console.log('New game id: ', change.doc.id)
                console.log('New game: ', change.doc.data())
                dispatch('game-info/addGame', parseUser(change.doc, changes), {
                  root: true
                })
              }
            }
            if (change.type === 'modified') {
              //this.setStatus(4)
              console.log('Modified game: ', changes)
            }
            if (change.type === 'removed') {
              console.log('Removed game: ', changes)
            }
          })
        }
      })
    console.log(unsubscribe)
    dispatch(SETUNSUBSCRIBEGAMESEVENT, unsubscribe)
  },
  async [SETGAMES]({ /*commit , */ dispatch /*, getters*/ } /*, games*/) {
    const docs = await this.$fireStore
      .collection('game')
      .where('status', '==', 3)
      .get()
    const games = []
    console.log('AÑADO GAMES TO THE LIST')
    docs.forEach((doc) => {
      const changes = doc.data()
      // changes.forEach((c) => {
      //console.log(c.doc.data())

      games.push(parseUser(doc, changes))
    })
    dispatch('game-info/setGames', games, {
      root: true
    })
  }
}

export const mutations = {
  [SETINITSTATE](state, initState) {
    state.initState = initState
  },
  [SETUNSUBSCRIBEGAMESEVENT](state, unsubscribe) {
    console.log(unsubscribe)
    state.unsubscribe = unsubscribe
  }
}
