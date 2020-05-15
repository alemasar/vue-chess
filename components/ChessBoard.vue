<template>
  <div class="chessboard-container">
    <div class="chessboard">
      <template v-for="fila in items">
        <Box
          v-for="column in fila"
          :key="'column-' + column.left + '-' + column.top"
          :top="column.top"
          :left="column.left"
          :type="column.piece.type"
          :direction="column.piece.direction"
        >
        </Box>
      </template>
    </div>
  </div>
</template>
<script>
import Box from './Box'
import { mapGetters } from 'vuex'

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
    ...mapGetters('chessboard', ['getColumn'])
  },
  created() {
    console.log(this.getColumn())
    this.items = this.getColumn()
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
