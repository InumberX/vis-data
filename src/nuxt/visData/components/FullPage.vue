<template>
  <div class="full-page-wrap" :style="{ height: height }">
    <div class="full-page-box">
      <div class="full-page-slider-box" id="full-page-slider">
        <div class="full-page-slider" data-js-target="slider">
          <div class="full-page-slid-change-btn-box is-prev">
            <button
              class="full-page-slid-change-btn is-prev"
              title="前へ"
              aria-label="前へ"
              data-js-trigger="slid-prev"
            ></button>
          </div>
          <div class="full-page-slider-cnt-box swiper-container">
            <ul class="full-page-slider-items swiper-wrapper">
              <li class="full-page-slider-item swiper-slide">
                <div
                  class="full-page-slid"
                  style="background-image: url(/img/img_main_visual_01.jpg)"
                ></div>
              </li>
              <li class="full-page-slider-item swiper-slide">
                <div
                  class="full-page-slid"
                  style="background-image: url(/img/img_main_visual_02.jpg)"
                ></div>
              </li>
            </ul>
          </div>
          <div class="full-page-slid-change-btn-box is-next">
            <button
              class="full-page-slid-change-btn is-next"
              title="次へ"
              aria-label="次へ"
              data-js-trigger="slid-next"
            ></button>
          </div>
        </div>
      </div>
    </div>
    <!-- /.full-page-box -->
  </div>
  <!-- /.full-page-wrap -->
</template>

<script>
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

import metaConfig from '~/config/meta';

export default {
  components: {},
  data: function() {
    return {
      height: 'auto',
      slider: null
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

    // スライダーを生成
    const sliderBox = document.getElementById('full-page-slider');
    // 要素が存在する場合
    if (sliderBox != null) {
      const slider = sliderBox.querySelector('[data-js-target="slider"]');
      const swiperContainer = slider.querySelector('.swiper-container');
      const btnNext = slider.querySelector('[data-js-trigger="slid-next"]');
      const btnPrev = slider.querySelector('[data-js-trigger="slid-prev"]');

      this.slider = new Swiper(swiperContainer, {
        // 一番最初に表示させるスライド
        initialSlide: 0,
        // 最後のスライドまで到達した場合、最初に戻らずに続けてスライド可能にするか
        loop: true,
        // スライドの枚数
        loopedSlides: 2,
        // スライドが切り替わるトランジション時間（ミリ秒）
        speed: 1000,
        // 何枚のスライドを表示するか
        slidesPerView: '1',
        // アクティブなスライドを中央に配置するか
        centeredSlides: false,
        // スライド間の余白サイズ（ピクセル）
        spaceBetween: 0,
        // スライド方向：horizontal（水平）, vertical（垂直）（effectオプションが 'slide' 以外は無効）
        direction: 'horizontal',
        // slide, fade(フェード), cube（キューブ回転）, coverflow（カバーフロー）, flip（平面回転）
        effect: 'fade',
        // スライダーの自動再生
        autoplay: false,
        // ページネーション
        pagination: false,
        // 前後スライドへのナビゲーション
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev
        },
        // スライダーの高さを可変にするか
        autoHeight: false,
        // 時間の長いスワイプをした時に、どのくらい次（もしくは前）のスライドが見えてたら次（もしくは前）のスライドに行くか
        longSwipesRatio: 0.3,
        // スワイプのしきい値（この数値よりスワイプ距離が短い場合、スライダーは動かない）
        threshold: 50,
        // スワイプを認識する角度（デフォルト：45）
        touchAngle: 60,
        // テキストや画像をぼやけないように調整
        roundLengths: false,
        // アクセシビリティ設定
        a11y: {
          prevSlideMessage: '前へ',
          nextSlideMessage: '次へ'
        },
        // マウスホイールでスライダーを操作できるようにするか
        mousewheel: {
          invert: false
        }
      });

      console.log(this.slider);
    }
  },
  methods: {
    // コンテンツの高さを設定する処理
    setHeight: function() {
      this.height = window.innerHeight + 'px';
    }
  }
};
</script>

<style lang="scss" scoped>
// 変数
@import '~assets/css/_common/variable';

.full-page-wrap {
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
}
.full-page-box {
  width: 100%;
  height: 100%;
}
.full-page-slider-box {
  width: 100%;
  height: 100%;
}
.full-page-slider {
  position: relative;
  width: 100%;
  height: 100%;
}
.full-page-slid-change-btn-box {
  position: absolute;
  top: 50%;
  z-index: $z-index--3;
  &.is-prev {
    left: 0;
  }
  &.is-next {
    right: 0;
  }
}
.full-page-slider-cnt-box {
  width: 100%;
  height: 100%;
}
.full-page-slider-items {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  height: 100%;
}
.full-page-slider-item {
  margin: 0;
  width: 100%;
  height: 100%;
}
.full-page-slid {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: radial-gradient(
      transparent 0%,
      transparent 20%,
      $palette-black--1 100%
    );
    z-index: $z-index--2;
  }
}
</style>
