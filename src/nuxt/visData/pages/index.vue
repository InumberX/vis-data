<template>
  <FullPage />
</template>

<script>
import FullPage from '~/components/FullPage.vue';

export default {
  head: {
    title: process.env.title,
    titleTemplate: ''
  },
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
