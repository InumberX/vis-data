<template>
  <div class="wrap-all">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import metaConfig from '~/config/meta';
// コンポーネント読み込み
import Header from '~/components/common/Header.vue';
import Footer from '~/components/common/Footer.vue';

export default {
  // コンポーネント設定
  components: {
    Header: Header,
    Footer: Footer
  },
  data: function() {
    return {
      bodyClassNamePath: ''
    };
  },
  created: function() {},
  mounted: function() {
    this.changeBodyClassName();
  },
  methods: {
    changeBodyClassName: function() {
      const path = this.$route.path;
      const body = document.body;

      if (this.bodyClassNamePath !== '') {
        body.classList.remove(this.bodyClassNamePath);
      }

      this.bodyClassNamePath = '';

      for (
        let i = 0, iLength = metaConfig.length;
        i < iLength;
        i = (i + 1) | 0
      ) {
        if (metaConfig[i].route === path) {
          this.bodyClassNamePath = 'is-' + metaConfig[i].id;
          break;
        }
      }

      if (this.bodyClassNamePath !== '') {
        body.classList.add(this.bodyClassNamePath);
      }
    }
  },
  watch: {
    path: function() {
      this.changeBodyClassName();
    }
  },
  computed: {
    path: function() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
/* ページ遷移アニメーション */
.va-page {
  &-enter {
    &-active {
      transition: opacity 0.6s;
    }
    opacity: 0 !important;
    &-to {
      opacity: 1 !important;
    }
  }
  &-leave {
    &-active {
      transition: opacity 0.6s;
    }
    opacity: 1 !important;
    &-to {
      opacity: 0 !important;
    }
  }
}
</style>
