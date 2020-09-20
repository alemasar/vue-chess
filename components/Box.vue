<template>
  <div
    class="box"
    :class="cssClass"
    :style="{ left: left + 'px', top: top + 'px' }"
    @click="clickBox"
  >
    <component :is="component" :color="color"></component>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    type: {
      type: Number,
      default: 0
    },
    direction: {
      type: Number,
      default: 0
    },
    cssClass: {
      type: String,
      default: 'noSelected'
    }
  },
  data() {
    return {
      component: null,
      color: ''
    }
  },
  computed: {
    ...mapGetters(['getStatus', 'getPlayer', 'getXIni', 'getYIni'])
  },
  watch: {
    type(newType) {
      console.log('WATCH TYPE: ', newType)
      this.setPiece()
    },
    direction(newDirection) {
      console.log('WATCH TYPE: ', newDirection)
      this.setPiece()
    }
  },
  mounted() {
    this.setPiece()
  },
  methods: {
    ...mapActions(['setStatus', 'setXIni', 'setYIni', 'setXFi', 'setYFi']),

    clickBox: function () {
      const status = this.getStatus()
      const player = this.getPlayer()

      //console.log('status: ', status)
      if (status === 0 && player === this.direction) {
        if (this.type !== 0) {
          this.setStatus(1)
          this.setXIni(this.x)
          this.setYIni(this.y)
        }
      } else if (status === 1) {
        /*console.log(
            this.getXIni() +
              ' !==' +
              this.x +
              ' && ' +
              this.getYIni() +
              ' !== ' +
              this.y
          )*/
        if (this.getXIni() === this.x && this.getYIni() === this.y) {
          this.setStatus(3)
        } else {
          this.setStatus(2)
          this.setXFi(this.x)
          this.setYFi(this.y)
        }
      }
    },
    async setPiece() {
      const piece = this.getType()
      if (piece !== null) {
        const c = await import(`./pieces/${piece}`)
        const comp = c.default
        this.$options.components[piece] = comp
        if (this.direction === -1) {
          this.color = 'negre'
        } else if (this.direction === 1) {
          this.color = 'blanc'
        }
        this.component = piece
      } else {
        this.component = null
      }
    },
    getType: function () {
      let piece = ''
      if (!this.type) {
        return null
      } else {
        switch (this.type) {
          case 2:
            piece = 'Tower'
            break
          case 3:
            piece = 'Horse'
            break
          case 4:
            piece = 'Bishop'
            break
          case 5:
            piece = 'King'
            break
          case 6:
            piece = 'Queen'
            break
          default:
            piece = 'Pawn'
        }
      }
      return piece
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  position: absolute;
  height: 60px;
  width: 60px;
  &.selected {
    background-color: red;
    opacity: 0.5;
  }
  &.posibleMove {
    background-color: green;
    opacity: 0.5;
  }
}
</style>
