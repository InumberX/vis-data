<template>
  <div class="back-top-box">
    <nuxt-link to="/" exact class="back-top-link">
      <span class="back-top-link-tx">戻る</span>
    </nuxt-link>
  </div>
  <!-- /.back-top-box -->
</template>

<script>
export default {
  components: {},
  props: {
    hash: ''
  },
  data: function() {
    return {};
  },
  created: function() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
// 変数
@import '~assets/css/_common/variable';

.back-top-box {
  margin-top: 24px;
}
.back-top-link:not(:root) {
  position: relative;
  display: inline-block;
  color: $palette-white--0;
  text-decoration: none;
  padding: 12px 12px 12px 40px;
  outline: 0;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 16px;
    display: block;
    width: 40px;
    height: 8px;
    border-bottom: 1px solid $palette-white--0;
    border-left: 4px solid $palette-white--0;
    transform: skew(-45deg);
    transition: 0.3s border-color;
  }
  &:hover {
    color: $palette-blue--1;
    &:after {
      border-color: $palette-blue--1;
    }
  }
}
@media screen and (min-width: $bp--sm), print {
}
@media screen and (min-width: $bp--md), print {
}
</style>
