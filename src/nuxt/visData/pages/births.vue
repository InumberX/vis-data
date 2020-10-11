<template>
  <main class="mn-wrap" :key="pageKey">
    <PageTitle :title="pageTitle" :titleEn="pageTitleEn" />
  </main>
</template>

<script>
import metaMixin from '~/mixins/meta';
import PageTitle from '~/components/common/PageTitle.vue';

export default {
  mixins: [metaMixin],
  components: {
    PageTitle: PageTitle
  },
  data: function() {
    return {};
  },
  mounted: function() {}
};
</script>

<style lang="scss" scoped></style>
