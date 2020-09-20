<template>
  <div class="info-container">
    Player: {{ player }}
    <v-card class="d-inline-block mx-auto">
      <div class="chessboard-container">
        <div class="chessboard">
          <template v-for="fila in items">
            <Box
              v-for="column in fila"
              :key="'column-' + column.left + '-' + column.top"
              :left="column.left"
              :top="column.top"
              :x="column.x"
              :y="column.y"
              :type="column.piece.id"
              :direction="column.piece.direction"
              :css-class="column.cssClass"
            >
            </Box>
          </template>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import Box from './Box'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Box
  },
  data: function () {
    return {
      items: []
    }
  },
  computed: {
    ...mapGetters('chessboard', ['getChessboard']),
    ...mapGetters([
      'getXIni',
      'getYIni',
      'getXFi',
      'getYFi',
      'getStatus',
      'getPlayer'
    ]),
    player() {
      let playerString = 'Negres'
      if (this.getPlayer() === 1) {
        playerString = 'Blanques'
      }
      return playerString
    },
    status() {
      return this.getStatus()
    }
  },
  watch: {
    status(newStatus) {
      // console.log(newStatus)
      if (newStatus === 1) {
        const x = this.getXIni()
        const y = this.getYIni()
        this.setCssClass({ x, y, cssClass: 'selected' })
        this.setPosiblesMoves()
      } else if (newStatus === 2) {
        this.setMove({})
      } else if (newStatus === 3) {
        this.deselectPiece()
      }
    }
  },

  created() {
    this.items = [...this.getChessboard()]
  },
  methods: {
    ...mapActions('chessboard', [
      'setCssClass',
      'setPosiblesMoves',
      'setMove',
      'deselectPiece'
    ])
  }
}
</script>
<style lang="scss" scoped>
.chessboard-container {
  position: relative;
  height: 600px;
  width: 600px;
  .chessboard {
    position: absolute;
    height: 600px;
    width: 600px;
    background-image: url('~assets/images/chess-board.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>
