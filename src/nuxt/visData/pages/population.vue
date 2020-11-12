<template>
  <main class="mn-wrap" :key="pageKey">
    <PageTitle :title="pageTitle" :titleEn="pageTitleEn" />
  </main>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
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
  created: function() {
    if (process.browser) {
      if (!this.storeFlgInitPage) {
        this.$store.commit('init_page/setFlgInitPageTrue');
      }
    }
  },
  mounted: function() {}
};
</script>

<style lang="scss" scoped></style>
