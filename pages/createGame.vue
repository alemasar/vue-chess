<template>
  <v-row>
    <v-col cols="5">
      <v-tabs>
        <v-tab> Crear partida </v-tab>
        <v-tab v-if="games.length > 0"> Llistat de partides </v-tab>
        <v-tab-item>
          <CreateGameForm></CreateGameForm>
          <!--v-row v-if="incompleteGames.legnth > 0">
                <v-col cols="12">
                  <v-data-table
                    :headers="headersIncompleteGames"
                    :items="incompleteGames"
                    :items-per-page="5"
                    class="elevation-1"
                    @dblclick:row="completeGameInfo"
                  ></v-data-table>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-data-table
                    :headers="headersIncompleteGames"
                    :items="getToStartGames"
                    :items-per-page="5"
                    class="elevation-1"
                    @dblclick:row="startGame"
                  ></v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-form-->
        </v-tab-item>
        <v-tab-item v-if="games.length > 0">
          <v-data-table
            :headers="headers"
            :items="games"
            :items-per-page="5"
            class="elevation-1"
            @dblclick:row="selectGame"
          ></v-data-table>
        </v-tab-item>
      </v-tabs>
    </v-col>
    <v-spacer cols="1" />
    <v-col v-if="showChessBoard" cols="6">
      <ChessBoard />
    </v-col>
  </v-row>
</template>

<script>
import ChessBoard from '~/components/chessboard/ChessBoard.vue'
import CreateGameForm from '~/components/createGame/CreateGameForm.vue'
import { mapActions } from 'vuex'

export default {
  name: 'CreateGame',
  components: {
    ChessBoard,
    CreateGameForm
  },
  data: function () {
    return {
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'White pieces', value: 'wPlayer' },
        { text: 'Black pieces', value: 'bPlayer' },
        { text: 'Move player', value: 'movePlayer' }
      ],
      headersIncompleteGames: [
        { text: 'Id', value: 'id' },
        { text: 'White pieces', value: 'wPlayer' },
        { text: 'Black pieces', value: 'bPlayer' }
      ],
      games: [],
      incompleteGames: [],
      toStartGames: [],
      gamesMovements: [],
      showChessBoard: false,
      disabledName: true,
      disabledColor: true,
      disabledCreateGame: false,
      creatingGame: true,
      idGame: 0
    }
  },
  computed: {
    getIncompleteGames() {
      return this.incompleteGames
    },
    getToStartGames() {
      return this.toStartGames
    }
  },
  watch: {
    incompleteGames: {
      handler(val) {
        console.log(val)
      },
      deep: true
    }
  },
  mounted() {
    /* this.$fireStore
      .collection('game')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let wPlayer = ''
          let bPlayer = ''
          let movePlayer = 1
          let movePlayerString = 'white'
          const gameInfo = doc.data().user
          const gameMoves = doc.data().moves
          if (
            gameInfo &&
            gameInfo.length > 0 &&
            gameMoves &&
            gameMoves.length > 0
          ) {
            this.gamesMovements.push({ id: doc.id, moves: gameMoves })
            gameInfo.forEach((u) => {
              if (parseInt(u.usercolor) === 1) {
                wPlayer = u.username
              } else if (parseInt(u.usercolor) === -1) {
                bPlayer = u.username
              }
            })
            if (
              this.gamesMovements[this.gamesMovements.length - 1].moves.length >
              0
            ) {
              movePlayer =
                this.gamesMovements[this.gamesMovements.length - 1].moves[
                  this.gamesMovements[this.gamesMovements.length - 1].moves
                    .length - 1
                ].player * -1
            }
            if (movePlayer === -1) {
              movePlayerString = 'black'
            }
            this.games.push({
              id: doc.id,
              wPlayer: wPlayer,
              bPlayer: bPlayer,
              movePlayer: movePlayerString
            })
          } else {
            const info = {}
            info.id = doc.id
            if (gameInfo && gameInfo.length < 2) {
              console.log(gameInfo)
              if (gameInfo[0].usercolor === '1') {
                info.wPlayer = gameInfo[0].username
                info.bPlayer = ''
              } else {
                info.wPlayer = ''
                info.bPlayer = gameInfo[0].username
              }
              this.incompleteGames.push(info)
            } else if (gameInfo && gameInfo.length === 2) {
              gameInfo.forEach((p) => {
                if (p.usercolor === '1') {
                  info.wPlayer = p.username
                } else {
                  info.bPlayer = p.username
                }
              })
              this.toStartGames.push(info)
            }
          }
        })
      })
    console.log(this.incompleteGames)*/
  },
  methods: {
    ...mapActions('chessboard', ['setDirectMove', 'setPieces', 'setPositions']),
    ...mapActions(['setPlayer']),
    createGame() {},
    async modifyGame() {
      if (this.valid) {
        const gameData = {
          username: this.name,
          usercolor: this.color
        }
        if (this.idGame !== 0) {
          this.$fireStore
            .collection('game')
            .doc(this.idGame)
            .update({
              user: this.$fireStoreObj.FieldValue.arrayUnion(gameData)
            })
          this.incompleteGames.forEach((ic, index) => {
            if (ic.id === this.idGame) {
              console.log(ic)
              if (this.color === '1') {
                this.incompleteGames[index].wPlayer = this.name
              } else {
                this.incompleteGames[index].bPlayer = this.name
              }
            }
          })
        } else {
          const docRef = await this.$fireStore.collection('game').add({})
          const addedGame = await this.$fireStore
            .collection('game')
            .doc(docRef.id)
            .set(gameData)
          console.log(docRef.id)
          console.log(addedGame)
          this.name = ''
          this.color = '1'
          this.disabledColor = true
          this.disabledName = true
        }
      }
    },
    completeGameInfo(e, data) {
      this.disabledColor = false
      this.disabledName = false
      console.log(data)
      this.idGame = data.item.id
      if (data.item.wPlayer) {
        this.color = '-1'
      } else {
        this.color = '1'
      }
    },
    selectGame(e, data) {
      //console.log(data.item)
      if (!this.showChessBoard) {
        this.showChessBoard = true
        this.setPieces()
        this.setPositions()
        this.gamesMovements.forEach((m) => {
          if (m.id === data.item.id) {
            //console.log(m.moves)
            if (m.moves.length > 0) {
              m.moves.forEach((movement, index) => {
                //const func = () => {
                this.setDirectMove({
                  xini: movement.inix,
                  yini: movement.iniy,
                  xfi: movement.fix,
                  yfi: movement.fiy
                })
                if (index === m.moves.length - 1) {
                  // console.log(movement)
                  this.setPlayer(movement.player * -1)
                }
                //}
                //setTimeout(func, index * 1000)
              })
            }
          }
        })
      }
    },
    startGame(e, data) {
      if (!this.showChessBoard) {
        console.log(data)
        this.disabledCreateGame = true
        this.creatingGame = false
        this.setPlayer(1)
        this.name = data.wPlayer
        this.showChessBoard = true
      }
    }
  }
}
</script>
