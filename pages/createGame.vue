<template>
  <v-row>
    <v-col v-if="games.length > 0" cols="5">
      <h2>Llistat de partides</h2>
      <v-data-table
        :headers="headers"
        :items="games"
        :items-per-page="5"
        class="elevation-1"
        @dblclick:row="selectGame"
      ></v-data-table>
    </v-col>
    <v-spacer cols="1" />
    <v-col cols="6">
      <v-card class="d-inline-block mx-auto">
        <ChessBoard />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ChessBoard from '~/components/ChessBoard.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    ChessBoard
  },
  data: function () {
    return {
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'White pieces', value: 'wPlayer' },
        { text: 'Black pieces', value: 'bPlayer' },
        { text: 'Move player', value: 'movePlayer' }
      ],
      games: [],
      gamesMovements: []
    }
  },
  mounted() {
    this.$fireStore
      .collection('game')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let wPlayer = ''
          let bPlayer = ''
          let movePlayer = 1
          let movePlayerString = 'white'
          const gameInfo = doc.data().user
          this.gamesMovements.push({ id: doc.id, moves: doc.data().moves })
          gameInfo.forEach((u) => {
            if (parseInt(u.usercolor) === 1) {
              wPlayer = u.username
            } else if (parseInt(u.usercolor) === -1) {
              bPlayer = u.username
            }
          })
          if (
            this.gamesMovements[this.gamesMovements.length - 1].moves.length > 0
          ) {
            /* console.log(
              this.gamesMovements[this.gamesMovements.length - 1].moves[
                this.gamesMovements[this.gamesMovements.length - 1].moves
                  .length - 1
              ].player
            )*/
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
        })
      })
  },
  methods: {
    ...mapActions('chessboard', ['setDirectMove', 'setPieces', 'setPositions']),
    ...mapActions(['setPlayer']),
    selectGame(e, data) {
      //console.log(data.item)
      this.setPieces()
      this.setPositions()
      this.gamesMovements.forEach((m) => {
        if (m.id === data.item.id) {
          //console.log(m.moves)
          if (m.moves.length > 0) {
            m.moves.forEach((movement, index) => {
              const func = () => {
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
              }
              setTimeout(func, index * 1000)
            })
          }
        }
      })
    }
  }
}
</script>
