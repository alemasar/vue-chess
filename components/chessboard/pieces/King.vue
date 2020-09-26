<template>
  <div class="king" :class="color"></div>
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
.king {
  position: absolute;
  height: 60px;
  width: 60px;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  &.blanc {
    background-image: url('~assets/images/rei-blanc.svg');
  }
  &.negre {
    background-image: url('~assets/images/rei-negra.svg');
  }
}
</style>
