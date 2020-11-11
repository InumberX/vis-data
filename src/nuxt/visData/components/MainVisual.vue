<template>
  <div class="mv-wrap" :style="{ height: height }">
    <transition name="va-fade">
      <div v-if="!flgInitMv" class="mv-loading-box">
        <i v-if="flgShowLoadingCircle" class="mv-loading-circle"></i>
        <transition name="va-fade">
          <span v-if="flgShowLoadingTx" class="mv-loading-tx">Now Loading</span>
        </transition>
      </div>
    </transition>
    <div class="mv-ttl-wrap">
      <div class="inner">
        <div class="mv-ttl-box">
          <div class="mv-ttl-box">
            <h1 class="mv-ttl-tx">
              <span class="mv-ttl-tx-mn">Visualize Data</span>
              <span class="mv-ttl-tx-sub"
                >「vis:Data（ビズデータ）」は、様々なデータをグラフなどを用いてビジュアル的に表現することを目的としたサイトです。</span
              >
            </h1>
          </div>
        </div>
      </div>
    </div>
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
      height: '',
      flgInitMv: false,
      flgShowLoadingTx: false,
      flgShowLoadingCircle: false
    };
  },
  created: function() {
    if (process.browser) {
      this.setHeight();
    }
  },
  mounted: function() {
    // リサイズ時にコンテンツの高さを設定する処理を設定
    window.addEventListener('resize', this.setHeight, false);

    this.initMv();
  },
  methods: {
    // コンテンツの高さを設定する処理
    setHeight: function() {
      this.height = window.innerHeight + 'px';
    },
    // メインビジュアルを初期化する処理
    initMv: function() {
      const self = this;

      scrollTo(0, 0);
      const body = document.body;
      body.style.top = '0px';
      body.classList.add('is-fixed');

      this.flgShowLoadingTx = true;
      setTimeout(() => {
        self.flgShowLoadingCircle = true;

        setTimeout(() => {
          self.flgInitMv = true;

          const body = document.body;
          body.classList.remove('is-fixed');
          body.style.top = '';

          setTimeout(() => {
            initWebGlFluid();
          }, 310);
        }, 4510);
      }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
// 変数
@import '~assets/css/_common/variable';

.mv-wrap {
  width: 100%;
  height: 100vh;
  min-height: 500px;
  position: relative;
}
.mv-loading-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $palette-black--1;
  z-index: $z-index--4;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.mv-loading-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 240px;
  height: 240px;
  display: block;
  border-radius: 240px;
  background-color: transparent;
  box-shadow: inset 2px 0 2px 0 $palette-blue--1,
    inset 0 1px 1px 0 $palette-purple--1, inset 0 -1px 1px 0 $palette-purple--1,
    inset 0 0 0 2px $palette-red--1;
  z-index: $z-index--1;
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 240px;
    height: 240px;
    display: block;
    background-color: $palette-black--1;
    z-index: $z-index--2;
  }
  &:before {
    left: calc(50% - 120px);
    transform-origin: right 0;
    animation: rotate-circle-left 2s 2.5s linear forwards;
  }
  &:after {
    left: calc(50% + 120px);
    transform-origin: left 120px;
    animation: rotate-circle-right 1.5s 1s linear forwards;
  }
}
@keyframes rotate-circle-right {
  0% {
    transform: translateY(-50%) translateX(-50%) rotate(0deg);
    opacity: 1;
  }
  60% {
    transform: translateY(-50%) translateX(-50%) rotate(120deg);
  }
  80% {
    transform: translateY(-50%) translateX(-50%) rotate(140deg);
  }
  99.9% {
    transform: translateY(-50%) translateX(-50%) rotate(180deg);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes rotate-circle-left {
  0% {
    transform: translateY(-50%) translateX(-50%) rotate(0deg);
    opacity: 1;
  }
  40% {
    transform: translateY(-50%) translateX(-50%) rotate(20deg);
  }
  80% {
    transform: translateY(-50%) translateX(-50%) rotate(40deg);
  }
  89% {
    transform: translateY(-50%) translateX(-50%) rotate(140deg);
  }
  90% {
    transform: translateY(-50%) translateX(-50%) rotate(160deg);
  }
  99.9% {
    transform: translateY(-50%) translateX(-50%) rotate(180deg);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.mv-loading-tx {
  position: relative;
  z-index: $z-index--3;
  font-size: 1.6rem;
}
.mv-canvas-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba($palette-black--1, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    z-index: $z-index--1;
  }
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 80px;
    background-image: linear-gradient(
      180deg,
      rgba($palette-black--1, 0) 0%,
      $palette-black--1 100%
    );
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: $z-index--2;
  }
}
.mv-canvas {
  width: 100%;
  height: 100%;
}
.mv-ttl-wrap {
  position: relative;
  z-index: $z-index--3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mv-ttl-tx {
  margin: 0;
  font-size: 4rem;
  font-weight: 700;
}
.mv-ttl-tx-sub {
  margin: 8px 0 0;
  padding: 16px 0 0;
  position: relative;
  display: block;
  font-size: 1.6rem;
  font-weight: 400;
  max-width: 620px;
  &:before {
    content: '';
    display: block;
    width: 80px;
    height: 1px;
    background-color: $palette-white--0;
    position: absolute;
    top: 0;
    left: 0;
  }
}
@media screen and (min-width: $bp--sp), print {
  .mv-ttl-tx {
    font-size: 5.6rem;
  }
  .mv-ttl-tx-sub {
    font-size: 1.8rem;
  }
}
@media screen and (min-width: $bp--md), print {
  .mv-ttl-tx {
    font-size: 6.4rem;
  }
  .mv-ttl-tx-sub {
    padding-top: 24px;
    font-size: 2rem;
  }
}
@media screen and (min-width: $bp--lg), print {
  .mv-ttl-tx {
    font-size: 7.2rem;
  }
  .mv-ttl-tx-sub {
    font-size: 2.2rem;
  }
}
@media screen and (min-width: $bp--xl), print {
  .mv-ttl-tx {
    font-size: 8rem;
  }
}
</style>
