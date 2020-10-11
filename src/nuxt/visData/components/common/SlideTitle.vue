<template>
  <div class="slide-ttl-wrap">
    <div class="inner">
      <div class="slide-ttl-box">
        <i class="slide-ttl-circle"></i>
        <div class="slide-ttl">
          <h1 class="slide-ttl-tx">
            <transition name="va-ttl-mn">
              <span class="slide-ttl-mn-box" v-if="flgShowTtlMn">
                <span class="slide-ttl-mn">{{ title }}</span>
              </span>
            </transition>
            <transition name="va-ttl-sub">
              <span class="slide-ttl-sub-box" v-if="flgShowTtlSub">
                <span class="slide-ttl-sub">{{ titleEn }}</span>
              </span>
            </transition>
          </h1>
        </div>
      </div>
      <!-- /.slide-ttl-box -->
    </div>
    <!-- /.inner -->
  </div>
  <!-- /.slide-ttl-wrap -->
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import metaConfig from '~/config/meta';

export default {
  components: {},
  data: function() {
    return {
      title: '',
      titleEn: '',
      flgTop: false,
      flgShowTtlMn: true,
      flgShowTtlSub: true
    };
  },
  created: function() {
    this.changeTitle();
  },
  methods: {
    changeTitle: function() {
      const self = this;
      const path = this.$route.path;

      // タイトルが設定されていない場合
      if (this.$store.state.slide_info.title === '') {
        this.title = metaConfig[1].title;
        this.titleEn = metaConfig[1].titleEn;
      }
      // タイトルが設定されている場合
      else {
        this.flgShowTtlMn = false;
        this.flgShowTtlSub = false;

        setTimeout(function() {
          self.title = self.$store.state.slide_info.title;
          self.titleEn = self.$store.state.slide_info.titleEn;

          self.flgShowTtlMn = true;
          self.flgShowTtlSub = true;
        }, 500);
      }
    }
  },
  watch: {
    titleTx: function() {
      this.changeTitle();
    }
  },
  computed: {
    titleTx: function() {
      return this.$store.state.slide_info.title;
    }
  }
};
</script>

<style lang="scss" scoped>
// 変数
@import '~assets/css/_common/variable';

.slide-ttl-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: $z-index--page-ttl-1;
  transition: 0.3s top, 0.3s left, 0.3s transform, 0.3s padding;
  width: 100%;
}
.slide-ttl-box {
  position: relative;
}
.slide-ttl-circle {
  position: relative;
  top: 0;
  left: 0;
  margin: 0 auto;
  width: 70vw;
  height: 70vw;
  z-index: $z-index--1;
  display: block;
  max-width: 640px;
  max-height: 640px;
  border-radius: 640px;
  background-color: transparent;
  box-shadow: inset 2px 0 2px 0 $palette-blue--1,
    inset 0 1px 1px 0 $palette-purple--1, inset 0 -1px 1px 0 $palette-purple--1,
    inset 0 0 0 2px $palette-red--1;
  transition: 0.3s top, 0.3s left, 0.3s margin, 0.3s width, 0.3s height;
}
.slide-ttl {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: $z-index--2;
  width: 100%;
  transition: 0.3s top, 0.3s left, 0.3s transform, 0.3s text-align;
}
.slide-ttl-tx {
  margin: 0;
  font-size: 4rem;
  font-weight: 700;
  color: $palette-white--0;
  transition: 0.3s font-size;
}
.slide-ttl-main {
  display: inline-block;
}
.slide-ttl-sub {
  display: inline-block;
  font-size: 2rem;
  font-weight: 400;
  transition: 0.3s font-size;
}
.slide-ttl-mn-box {
  display: block;
  overflow: hidden;
}
.slide-ttl-sub-box {
  display: block;
  overflow: hidden;
}
/* メインタイトルアニメーション */
.va-ttl-mn {
  &-enter {
    &-active {
      transition: opacity 0.5s, 0.5s transform;
    }
    opacity: 0 !important;
    transform: translateY(50%);
    &-to {
      opacity: 1 !important;
      transform: translateY(0);
    }
  }
  &-leave {
    &-active {
      transition: opacity 0.5s, 0.5s transform;
    }
    opacity: 1 !important;
    transform: translateY(0);
    &-to {
      opacity: 0 !important;
      transform: translateY(-50%);
    }
  }
}
/* サブタイトルアニメーション */
.va-ttl-sub {
  &-enter {
    &-active {
      transition: opacity 0.5s;
    }
    opacity: 0 !important;
    &-to {
      opacity: 1 !important;
    }
  }
  &-leave {
    &-active {
      transition: opacity 0.5s;
    }
    opacity: 1 !important;
    &-to {
      opacity: 0 !important;
    }
  }
}
@media screen and (min-width: $bp--sp), print {
  .slide-ttl-tx {
    font-size: 4.8rem;
  }
  .slide-ttl-sub {
    font-size: 2.4rem;
  }
}
@media screen and (min-width: $bp--md), print {
  .slide-ttl-tx {
    font-size: 5.6rem;
  }
  .slide-ttl-sub {
    font-size: 2.8rem;
  }
}
@media screen and (min-width: $bp--lg), print {
  .slide-ttl-wrap.is-top {
    .slide-ttl-tx {
      font-size: 6.4rem;
    }
    .slide-ttl-sub {
      font-size: 3.2rem;
    }
  }
}
@media screen and (min-width: $bp--xl), print {
  .slide-ttl-tx {
    font-size: 7.2rem;
  }
  .slide-ttl-sub {
    font-size: 3.6rem;
  }
}
</style>
