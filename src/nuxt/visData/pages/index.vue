<template>
  <main class="mn-wrap is-top" :key="pageKey">
    <SlideTitle />
    <FullPage />
  </main>
</template>

<script>
import metaMixin from '~/mixins/meta';
import SlideTitle from '~/components/common/SlideTitle.vue';
import FullPage from '~/components/FullPage.vue';

export default {
  mixins: [metaMixin],
  components: {
    SlideTitle: SlideTitle,
    FullPage: FullPage
  },
  data: function() {
    return {};
  },
  mounted: function() {}
};
</script>

<style lang="scss" scoped></style>
