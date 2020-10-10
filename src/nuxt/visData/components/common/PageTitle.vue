<template>
  <div class="page-ttl-wrap" :class="[{ 'is-top': flgTop }]">
    <div class="inner">
      <div class="page-ttl-box">
        <i class="page-ttl-circle"></i>
        <div class="page-ttl">
          <h1 class="page-ttl-tx">
            {{ title }}<span class="page-ttl-en">{{ titleEn }}</span>
          </h1>
        </div>
      </div>
      <!-- /.page-ttl-box -->
    </div>
    <!-- /.inner -->
  </div>
  <!-- /.page-ttl-wrap -->
</template>

<script>
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

      // トップページの場合
      if (path === '/') {
        this.flgTop = true;
        this.title = metaConfig[1].title;
        this.titleEn = metaConfig[1].titleEn;
      }
      // トップページ以外の場合
      else {
        this.flgTop = false;
        for (
          let i = 0, iLength = metaConfig.length;
          i < iLength;
          i = (i + 1) | 0
        ) {
          if (metaConfig[i].route === path) {
            this.title = metaConfig[i].title;
            this.titleEn = metaConfig[i].titleEn;
            break;
          }
        }
      }
    }
  },
  watch: {
    path: function() {
      this.changeTitle();
    },
    titleTx: function() {
      this.changeTitle();
    }
  },
  computed: {
    path: function() {
      return this.$route.path;
    },
    titleTx: function() {
      return this.$store.state.page_info.title;
    }
  }
};
</script>

<style lang="scss" scoped>
// 変数
@import '~assets/css/_common/variable';

.page-ttl-wrap {
  position: relative;
  top: 0;
  left: 0;
  transform: translate(0, 0);
  z-index: $z-index--page-ttl-1;
  transition: 0.3s top, 0.3s left, 0.3s transform, 0.3s padding;
  width: 100%;
  padding-top: 80px;
}
.page-ttl-box {
  position: relative;
}
.page-ttl-circle {
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -40px;
  width: 80px;
  height: 80px;
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
.page-ttl {
  position: relative;
  top: 0;
  left: 0;
  transform: translate(0, 0);
  z-index: $z-index--2;
  width: 100%;
  text-align: left;
  transition: 0.3s top, 0.3s left, 0.3s transform, 0.3s text-align;
}
.page-ttl-tx {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
  color: $palette-white--0;
  transition: 0.3s font-size;
}
.page-ttl-en {
  display: block;
  font-size: 1.6rem;
  font-weight: 400;
  transition: 0.3s font-size;
}
.page-ttl-wrap.is-top {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: 0;
  .page-ttl-circle {
    position: relative;
    top: 0;
    left: 0;
    margin: 0 auto;
    width: 70vw;
    height: 70vw;
  }
  .page-ttl {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .page-ttl-tx {
    font-size: 4rem;
  }
  .page-ttl-en {
    font-size: 2rem;
  }
}
@media screen and (min-width: $bp--sp), print {
  .page-ttl-tx {
    font-size: 3.2rem;
  }
  .page-ttl-en {
    font-size: 1.8rem;
  }
}
@media screen and (min-width: $bp--md), print {
  .page-ttl-tx {
    font-size: 4rem;
  }
  .page-ttl-en {
    font-size: 2rem;
  }
  .page-ttl-wrap.is-top {
    .page-ttl-tx {
      font-size: 5.6rem;
    }
    .page-ttl-en {
      font-size: 2.8rem;
    }
  }
}
@media screen and (min-width: $bp--lg), print {
  .page-ttl-wrap.is-top {
    .page-ttl-tx {
      font-size: 6.4rem;
    }
    .page-ttl-en {
      font-size: 3.2rem;
    }
  }
}
@media screen and (min-width: $bp--xl), print {
  .page-ttl-wrap.is-top {
    .page-ttl-tx {
      font-size: 7.2rem;
    }
    .page-ttl-en {
      font-size: 3.6rem;
    }
  }
}
</style>
