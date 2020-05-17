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
          :type="column.piece.type"
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
    ...mapGetters('chessboard', ['getColumn']),
    ...mapGetters(['getXIni', 'getYIni', 'getStatus']),
    status() {
      return this.getStatus()
    }
  },
  watch: {
    status(newStatus) {
      // Our fancy notification (2).
      console.log(newStatus)
      if (newStatus === 1) {
        const x = this.getXIni()
        const y = this.getYIni()
        this.setCssClass({ x, y, cssClass: 'selected' })
      }
    }
  },
  created() {
    console.log(this.getColumn())
    this.items = this.getColumn()
  },
  methods: {
    ...mapActions('chessboard', ['setCssClass'])
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
