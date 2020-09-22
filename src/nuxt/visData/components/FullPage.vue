<template>
  <div class="full-page-wrap" :style="{ height: height }">
    <div id="fullpage"></div>
  </div>
  <!-- /.full-page-wrap -->
</template>

<script>
let fullpage = null;

if (typeof window !== 'undefined') {
  fullpage = require('fullpage.js');
}

export default {
  components: {},
  data: function() {
    return {
      height: 'auto'
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
.full-page-wrap {
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
}
</style>
