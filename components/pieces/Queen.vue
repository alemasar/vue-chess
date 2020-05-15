<template>
  <div class="queen" :class="color"></div>
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
.queen {
  position: absolute;
  height: 60px;
  width: 60px;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  &.blanc {
    background-image: url('~assets/images/reina-blanc.svg');
  }
  &.negre {
    background-image: url('~assets/images/reina-negra.svg');
  }
}
</style>
