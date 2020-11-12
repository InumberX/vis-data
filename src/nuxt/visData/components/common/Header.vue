<template>
  <header class="hd-wrap">
    <div class="hd-box">
      <div class="inner">
        <div class="hd">
          <div class="hd-logo-box">
            <nuxt-link to="/" exact class="hd-logo-link">
              <img
                src="/img/img_logo.svg"
                :alt="imgLogoAlt"
                class="hd-logo-img"
                width="120px"
                height="32px"
              />
            </nuxt-link>
          </div>
          <!-- /.hd-logo-box -->
        </div>
        <!-- /.hd -->
      </div>
      <!-- /.inner -->
    </div>
    <!-- /.hd-box -->
  </header>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data: function() {
    return {
      imgLogoAlt: process.env.title
    };
  },
  created: function() {
    if (process.browser) {
      // リサイズ時にウィンドウサイズを更新する処理を設定
      window.addEventListener('resize', this.checkSp, false);
      // 画面の向きを判定する処理を設定
      this.initOrientation();
    }
  },
  mounted: function() {
    this.checkSp();
  },
  // 各処理
  methods: {
    // ウィンドウサイズを更新する処理
    checkSp: function() {
      const width = window.innerWidth;

      // SPの場合
      if (width < this.storeBpSp) {
        if (!this.storeFlgSp) {
          this.$store.commit('flg_bp/setFlgSpTrue');
          this.$store.commit('flg_bp/setFlgTabFalse');
          this.$store.commit('flg_bp/setFlgPcFalse');
        }
      }
      // TABの場合
      else if (width >= this.storeBpSp && width < this.storeBpTab) {
        if (!this.storeFlgTab) {
          this.$store.commit('flg_bp/setFlgSpFalse');
          this.$store.commit('flg_bp/setFlgTabTrue');
          this.$store.commit('flg_bp/setFlgPcFalse');
        }
      }
      // PCの場合
      else if (width >= this.storeBpTab) {
        if (!this.storeFlgPc) {
          this.$store.commit('flg_bp/setFlgSpFalse');
          this.$store.commit('flg_bp/setFlgTabFalse');
          this.$store.commit('flg_bp/setFlgPcTrue');
        }
      }
    },
    // 画面の向きを判定する処理
    initOrientation: function() {
      const _body = document.body;
      // 画面の向きが存在する場合
      if (window.orientation != null) {
        _body.classList.remove('not-orient');
        _body.classList.add('orient');
        this.setOrientationClass();

        // 画面の向きが変わった時の処理を設定
        window.addEventListener(
          'orientationchange',
          this.changeOrientation,
          false
        );
      }
      // 画面の向きが存在しない場合
      else {
        _body.classList.remove('orient');
        _body.classList.add('not-orient');
      }
    },
    // 画面の向きが変わった時の処理
    changeOrientation: function() {
      const self = this;
      // 向きが完全に切り替わってから処理を行う
      setTimeout(function() {
        self.setOrientationClass();
      }, 10);
    },
    // 画面の向きに応じてクラスを付与する処理
    setOrientationClass: function() {
      // 画面の角度を設定
      let orientation = window.orientation;
      // 付与するクラス
      const addClassName = {
        vertical: 'is-vertical',
        horizontal: 'is-horizontal'
      };

      const _body = document.body;

      // 縦画面時の処理
      if (orientation === 0) {
        _body.classList.remove(addClassName.horizontal);
        _body.classList.add(addClassName.vertical);
      }
      // 横画面時の処理
      else {
        _body.classList.remove(addClassName.vertical);
        _body.classList.add(addClassName.horizontal);
      }
    }
  },
  watch: {},
  computed: {
    storeFlgSp: function() {
      return this.$store.state.flg_bp.flgSp;
    },
    storeFlgTab: function() {
      return this.$store.state.flg_bp.flgTab;
    },
    storeFlgPc: function() {
      return this.$store.state.flg_bp.flgPc;
    },
    storeBpSp: function() {
      return this.$store.state.flg_bp.bpSp;
    },
    storeBpTab: function() {
      return this.$store.state.flg_bp.bpTab;
    },
    storeBpPc: function() {
      return this.$store.state.flg_bp.bpPc;
    }
  }
};
</script>

<style lang="scss" scoped>
// 変数
@import '~assets/css/_common/variable';

.hd-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  background-color: transparent;
  box-shadow: none;
  z-index: $z-index--header-1;
  .inner {
    height: 100%;
  }
}
.hd-box {
  height: 100%;
}
.hd {
  height: 100%;
  display: flex;
  align-items: center;
}
.hd-logo-box {
  display: flex;
  width: 120px;
}
.hd-logo-link {
  display: block;
}
.hd-logo-img {
  width: 120px;
  height: 32px;
}
@media screen and (min-width: $bp--sm), print {
  .hd-wrap {
    height: 64px;
  }
  .hd-logo-box {
    width: 160px;
  }
  .hd-logo-img {
    width: 160px;
    height: 44px;
  }
}
</style>
