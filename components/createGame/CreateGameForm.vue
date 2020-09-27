<template>
  <v-container fluid>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" :disabled="status !== 0" @click="createGame()"
          >Crear una partida</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :disabled="status !== 0"
          @click="joinCreateGame()"
          >Unir-se a una partida</v-btn
        >
      </v-col>
    </v-row>
    <component :is="formComponent"></component>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CreateGameForm',
  data: function () {
    return {
      formComponent: '',
      overlay: false,
      unsubscribe: {},
      games: [],
      initState: true
    }
  },
  computed: {
    ...mapGetters('game', [
      'getStatus',
      'getAddingGame',
      'getIdGame',
      'getWPlayer',
      'getBPlayer',
      'getActivePlayer'
    ]),
    ...mapGetters('game-info', ['getGames']),
    status() {
      return this.getStatus()
    }
  },
  watch: {
    status: async function (value) {
      console.log('STATUS', value)
      if (value === 0) {
        this.unsubscribe = this.$fireStore
          .collection('game')
          .onSnapshot(async (snapshot) => {
            if (this.initState) {
              this.initState = false
            } else {
              snapshot.docChanges().forEach((change) => {
                const changes = change.doc.data()
                if (change.type === 'added') {
                  if (change.status === '3') {
                    console.log('New game id: ', change.doc.id)
                    console.log('New game: ', change.doc.data())
                    this.addGame(this.parseUser(change.doc, changes))
                  }
                }
                if (change.type === 'modified') {
                  this.setStatus(4)
                  console.log('Modified game: ', changes)
                }
                if (change.type === 'removed') {
                  console.log('Removed game: ', changes)
                }
              })
            }
          })
      } else if (value === 1) {
        console.log('ADDED A NEW GAME WITH A USER')
        this.loadComponent('CreateUserForm')
      } else if (value === 2) {
        console.log('ADDED THE VERSUS USER')
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

          games.push(this.parseUser(doc, changes))
        })
        this.setGames(games)
        this.loadComponent('CreateGameTable')
      } else if (value === 3) {
        console.log('ESPERANDO CONTRINCANTE')
        this.overlay = false
      } else if (value === 4) {
        console.log('CONTRINCANTE UNIDO')
        this.overlay = false
      }
    }
  },
  mounted() {
    this.setStatus(0)
  },
  methods: {
    ...mapActions('game', [
      'setStatus',
      'setIdGame',
      'setWPlayer',
      'setBPlayer',
      'setActivePlayer',
      'setGame',
      'setJoinGame',
      'getGame'
    ]),
    ...mapActions('game-info', ['setGames', 'addGame']),
    parseUser(doc, changes) {
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
    },
    async loadComponent(filename) {
      const comp = await import(
        /* webpackChunkName: "forms" */ `~/components/createGame/forms/${filename}.vue`
      )
      const cmp = comp.default
      this.$options.components[cmp.name] = cmp
      this.formComponent = cmp.name
    },
    createGame() {
      this.setStatus(1)
    },
    async joinCreateGame() {
      //await this.setGames()
      /*let gamesArray = []

      gamesArray = [...this.getGames()]
      console.log(gamesArray)
      gamesArray.forEach((g) => {
        const wPlayer = g.bPlayer
        const bPlayer = g.wPlayer
        const activePlayer = g.activePlayer
        console.log('GAME ', g)
        this.games.push({ id: g.id, wPlayer, bPlayer, activePlayer })
      })*/
      this.setStatus(2)
      //console.log(this.getStatus())
    },
    async saveNewGame() {
      if (this.status === 1) {
        this.setIdGame(this.gameName)
        if (this.color === '1') {
          this.setWPlayer(this.name)
        } else {
          this.setBPlayer(this.name)
        }
        this.setActivePlayer(this.activeColor)
        await this.setGame()
        this.overlay = true
        console.log('SAVE NEW GAME')
      }
    },
    async selectGame(e, item) {
      let playerName = ''
      let userColor = '1'
      let versusUserColor = '-1'
      if (this.lastItem && this.lastItem.select) {
        this.lastItem.select(false)
      }
      item.select(true)
      this.lastItem = item
      await this.getGame(item.item.id)
      this.joinGameName = this.getIdGame()
      playerName = this.getWPlayer()
      if (playerName === '') {
        userColor = '-1'
        versusUserColor = '1'
        playerName = this.getBPlayer()
      }
      this.joinName = playerName
      this.joinColor = userColor
      this.versusColor = versusUserColor
      this.joinActiveColor = this.getActivePlayer()
    },
    joinGameButton() {
      if (this.joinValid) {
        if (this.versusColor === '1') {
          this.setWPlayer(this.versusName)
        } else {
          this.setBPlayer(this.versusName)
        }
        this.setJoinGame(this.versusColor)
      }
    }
  }
}
</script>
