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
        { text: 'Black pieces', value: 'bPlayer' }
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
          const gameInfo = doc.data().user
          this.gamesMovements.push({ id: doc.id, moves: doc.data().moves })
          gameInfo.forEach((u) => {
            if (parseInt(u.usercolor) === 1) {
              wPlayer = u.username
            } else if (parseInt(u.usercolor) === -1) {
              bPlayer = u.username
            }
          })
          this.games.push({ id: doc.id, wPlayer: wPlayer, bPlayer: bPlayer })
        })
      })
  },
  methods: {
    ...mapActions('chessboard', ['setDirectMove', 'setPieces', 'setPositions']),
    selectGame(e, data) {
      console.log(data.item)
      this.setPieces()
      this.setPositions()
      this.gamesMovements.forEach((m) => {
        if (m.id === data.item.id) {
          console.log(m.moves)
          if (m.moves.length > 0) {
            m.moves.forEach((movement) => {
              console.log(movement)
              this.setDirectMove({
                xini: movement.inix,
                yini: movement.iniy,
                xfi: movement.fix,
                yfi: movement.fiy
              })
            })
          }
        }
      })
    }
  }
}
</script>
