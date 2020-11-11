<template>
  <div class="mv-wrap">
    <transition name="va-fade">
      <div v-if="!flgInitMv" class="mv-loading-box">
        <span class="mv-loading-tx">Now Loading</span>
      </div>
    </transition>
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
    return {
      flgInitMv: false
    };
  },
  created: function() {},
  mounted: function() {
    const self = this;

    scrollTo(0, 0);
    const body = document.body;
    body.style.top = '0px';
    body.classList.add('is-fixed');

    setTimeout(() => {
      self.flgInitMv = true;

      const body = document.body;
      body.classList.remove('is-fixed');
      body.style.top = '';

      setTimeout(() => {
        initWebGlFluid();
      }, 310);
    }, 1000);
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
.mv-loading-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $palette-black--1;
  z-index: $z-index--3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mv-loading-tx {
  font-size: 1.4rem;
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
