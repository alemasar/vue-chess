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
      color: 'blanc'
    }
  },
  computed: {
    ...mapGetters(['getStatus'])
  },
  async mounted() {
    const piece = this.getType()
    if (piece !== null) {
      const c = await import(`./pieces/${piece}`)
      const comp = c.default
      this.$options.components[piece] = comp
      this.component = piece
      if (this.direction === -1) {
        this.color = 'negre'
      }
    }
  },
  methods: {
    ...mapActions(['setStatus', 'setXIni', 'setYIni']),
    clickBox: function () {
      if (this.type !== 0) {
        const status = this.getStatus()
        console.log(status)
        if (status === 0) {
          this.setStatus(1)
          this.setXIni(this.x)
          this.setYIni(this.y)
        }
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
}
</style>
