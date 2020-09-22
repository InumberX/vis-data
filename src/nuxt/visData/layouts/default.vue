<template>
  <div class="wrap-all">
    <Header />
    <main class="mn-wrap">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
// コンポーネント読み込み
import Header from "~/components/common/Header.vue";
import Footer from "~/components/common/Footer.vue";

export default {
  // コンポーネント設定
  components: {
    Header: Header,
    Footer: Footer
  },
  created: function() {},
  // 各処理
  methods: {}
};
</script>

<style lang="scss" scoped></style>
