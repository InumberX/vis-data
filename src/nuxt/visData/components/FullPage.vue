<template>
  <div class="full-page-wrap" :style="{ height: height }">
    <div class="full-page-box">
      <div class="full-page-slider-box" id="full-page-slider">
        <div class="inner">
          <div class="full-page-slider is-main" data-js-target="slider">
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
                <li
                  class="full-page-slider-item swiper-slide"
                  v-for="(item, i) in slide"
                  :key="item.id"
                >
                  <nuxt-link
                    :to="item.route"
                    class="full-page-slid-link full-page-slid"
                  ></nuxt-link>
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
        <!-- /.inner -->
        <div class="full-page-slider is-bg" data-js-target="slider-bg">
          <div class="full-page-slider-cnt-box swiper-container">
            <ul class="full-page-slider-items swiper-wrapper">
              <li
                class="full-page-slider-item swiper-slide"
                v-for="(item, i) in slide"
                :key="item.id"
              >
                <nuxt-link
                  :to="item.route"
                  class="full-page-slid-link full-page-slid"
                  :style="[{ 'background-image': 'url(' + item.img + ')' }]"
                ></nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- /.full-page-box -->
  </div>
  <!-- /.full-page-wrap -->
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

import metaConfig from '~/config/meta';

let slide = [];

for (let i = 1, iLength = metaConfig.length; i < iLength; i = (i + 1) | 0) {
  slide.push(metaConfig[i]);
}

export default {
  components: {},
  data: function() {
    return {
      height: 'auto',
      slide: slide,
      slider: {
        main: null,
        bg: null
      }
    };
  },
  created: function() {
    if (process.browser) {
      this.setHeight();
    }
  },
  mounted: function() {
    const self = this;

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

      this.slider.main = new Swiper(swiperContainer, {
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
        effect: 'slide',
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
        },
        // 各種イベント
        on: {
          slideChange: function() {
            if (self.slider.main != null) {
              const num = self.slider.main.realIndex;

              if (num < self.slide.length) {
                const slideInfo = self.slide[num];
                self.$store.commit('slide_info/setTitleEn', slideInfo.titleEn);
                self.$store.commit('slide_info/setTitle', slideInfo.title);
              }
            }
          }
        }
      });

      const sliderBg = sliderBox.querySelector('[data-js-target="slider-bg"]');

      // 要素が存在する場合
      if (sliderBg != null) {
        const swiperBgContainer = sliderBg.querySelector('.swiper-container');

        this.slider.bg = new Swiper(swiperBgContainer, {
          initialSlide: 0,
          loop: true,
          loopedSlides: 2,
          speed: 1000,
          slidesPerView: '1',
          centeredSlides: false,
          spaceBetween: 0,
          direction: 'horizontal',
          effect: 'slide',
          autoplay: false,
          pagination: false,
          navigation: false,
          autoHeight: false,
          longSwipesRatio: 0.3,
          threshold: 50,
          touchAngle: 60,
          roundLengths: false,
          mousewheel: {
            invert: false
          },
          // スライダーを連携させる
          controller: {
            control: this.slider.main,
            inverse: false,
            by: 'slide'
          }
        });

        // スライダーを連携させる
        this.slider.main.controller.control = this.slider.bg;
      }
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

.swiper-container {
  opacity: 0;
  &.swiper-container-initialized {
    opacity: 1;
  }
}
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
  .inner {
    height: 100%;
  }
}
.full-page-slider {
  position: relative;
  width: 100%;
  height: 100%;
  &.is-main {
    z-index: $z-index--full-page-slider-1;
  }
  &.is-bg {
    position: absolute;
    top: 0;
    left: 0;
    .full-page-slid {
      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: radial-gradient(
          circle,
          transparent 0%,
          transparent 20%,
          $palette-black--1 80%,
          $palette-black--1 100%
        );
        z-index: $z-index--2;
      }
    }
  }
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
.full-page-slid-change-btn:not(:root) {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: transparent;
  width: 40px;
  height: 40px;
  &:after {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    border-left: 4px solid #252c41;
    border-bottom: 4px solid #252c41;
  }
  &.is-prev {
    &:after {
      transform: rotate(45deg);
      border-color: $palette-blue--1;
    }
  }
  &.is-next {
    &:after {
      transform: rotate(230deg);
      border-color: $palette-red--1;
    }
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
  background-position: center center;
}
.full-page-slid-link {
  display: block;
}
</style>
