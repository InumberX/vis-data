<template>
  <FullPage />
</template>

<script>
import metaMixin from '~/mixins/meta';
import FullPage from '~/components/FullPage.vue';

export default {
  mixins: [metaMixin],
  components: {
    FullPage: FullPage
  },
  data: function() {
    return {};
  },
  mounted: function() {}
};
</script>

<style lang="scss" scoped></style>
