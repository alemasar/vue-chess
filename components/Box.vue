<template>
  <div
    class="box"
    :style="{ left: left + 'px', top: top + 'px' }"
    @click="clickBox"
  >
    <component :is="component" :color="color"></component>
  </div>
</template>
<script>
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
    type: {
      type: String,
      default: ''
    },
    direction: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      component: null,
      color: 'blanc'
    }
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
    clickBox: function (event) {
      console.log('Clicked', event)
    },
    getType: function () {
      let piece = '0'
      if (!this.type) {
        return null
      } else {
        switch (this.type) {
          case '2':
            piece = 'Tower'
            break
          case '3':
            piece = 'Horse'
            break
          case '4':
            piece = 'Bishop'
            break
          case '5':
            piece = 'King'
            break
          case '6':
            piece = 'Queen'
            break
          default:
            piece = 'Pawn'
        }
      }
      console.log(this.type)
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
}
</style>
