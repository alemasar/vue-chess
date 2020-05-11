<template>
  <div class="chessboard-container">
    <div class="chessboard"></div>
    <Pawn color="negre" />
  </div>
</template>
<script>
import Pawn from './pieces/Pawn'
import { mapGetters } from 'vuex'

export default {
  components: {
    Pawn
  },
  computed: {
    ...mapGetters('chessboard', ['getColumn'])
  },
  created() {
    console.log(this.$store)
  }
}
</script>
<style lang="scss" scoped>
.chessboard-container {
  position: relative;

  .chessboard {
    height: 600px;
    width: 600px;
    background-image: url('~assets/images/chess-board.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>
