<template>
  <div class="slide-ttl-wrap">
    <div class="inner">
      <div class="slide-ttl-box">
        <i class="slide-ttl-circle"></i>
        <div class="slide-ttl">
          <h1 class="slide-ttl-tx">
            {{ title }}<span class="slide-ttl-en">{{ titleEn }}</span>
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
      flgTop: false
    };
  },
  created: function() {
    this.changeTitle();
  },
  methods: {
    changeTitle: function() {
      const path = this.$route.path;

      // タイトルが設定されていない場合
      if (this.$store.state.slide_info.title === '') {
        this.title = metaConfig[1].title;
        this.titleEn = metaConfig[1].titleEn;
      }
      // タイトルが設定されている場合
      else {
        this.title = this.$store.state.slide_info.title;
        this.titleEn = this.$store.state.slide_info.titleEn;
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
.slide-ttl-en {
  display: block;
  font-size: 2rem;
  font-weight: 400;
  transition: 0.3s font-size;
}
@media screen and (min-width: $bp--sp), print {
  .slide-ttl-tx {
    font-size: 4.8rem;
  }
  .slide-ttl-en {
    font-size: 2.4rem;
  }
}
@media screen and (min-width: $bp--md), print {
  .slide-ttl-tx {
    font-size: 5.6rem;
  }
  .slide-ttl-en {
    font-size: 2.8rem;
  }
}
@media screen and (min-width: $bp--lg), print {
  .slide-ttl-wrap.is-top {
    .slide-ttl-tx {
      font-size: 6.4rem;
    }
    .slide-ttl-en {
      font-size: 3.2rem;
    }
  }
}
@media screen and (min-width: $bp--xl), print {
  .slide-ttl-tx {
    font-size: 7.2rem;
  }
  .slide-ttl-en {
    font-size: 3.6rem;
  }
}
</style>
