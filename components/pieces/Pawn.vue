<template>
  <div class="pawn" :class="color"></div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.pawn {
  height: 60px;
  width: 60px;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  &.blanc {
    background-image: url('~assets/images/peo-blanc.svg');
  }
  &.negre {
    background-image: url('~assets/images/peo-negra.svg');
  }
}
</style>
