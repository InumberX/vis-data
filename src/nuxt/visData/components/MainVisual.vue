<template>
  <div class="mv-wrap">
    <div class="mv-canvas-box">
      <canvas id="mv-canvas" class="mv-canvas"></canvas>
    </div>
  </div>
  <!-- /.full-page-wrap -->
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {},
  data: function() {
    return {};
  },
  created: function() {},
  mounted: function() {
    initWebGlFluid();
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
// 変数
@import '~assets/css/_common/variable';

.mv-wrap {
  width: 100%;
  height: 100vh;
  min-height: 500px;
}
.mv-canvas-box {
  width: 100%;
  height: 100%;
  position: relative;
  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba($palette-black--0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    z-index: $z-index--1;
  }
}
.mv-canvas {
  width: 100%;
  height: 100%;
}
</style>
