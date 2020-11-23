<template>
  <main class="mn-wrap is-top" :key="pageKey">
    <MainVisual />
    <TopPageList />
  </main>
</template>

<script>
import mixinMeta from '~/mixins/meta';
import MainVisual from '~/components/MainVisual.vue';
import TopPageList from '~/components/TopPageList.vue';

export default {
  mixins: [mixinMeta],
  components: {
    MainVisual: MainVisual,
    TopPageList: TopPageList
  },
  data: function() {
    return {};
  },
  mounted: function() {}
};
</script>

<style lang="scss"></style>
