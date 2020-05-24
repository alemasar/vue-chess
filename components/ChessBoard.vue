<template>
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
    ...mapGetters(['getXIni', 'getYIni', 'getStatus']),
    status() {
      return this.getStatus()
    }
  },
  watch: {
    status(newStatus) {
      console.log(newStatus)
      if (newStatus === 1) {
        const x = this.getXIni()
        const y = this.getYIni()
        this.setCssClass({ x, y, cssClass: 'selected' })
        this.setPosibleMoves()
      }
    }
  },
  created() {
    this.items = [...this.getChessboard()]
    console.log(this.items)
  },
  methods: {
    ...mapActions('chessboard', ['setCssClass', 'setPosibleMoves'])
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
