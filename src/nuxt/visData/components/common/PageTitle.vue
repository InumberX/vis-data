<template>
  <div class="page-ttl-wrap">
    <i class="page-ttl-circle"></i>
  </div>
  <!-- /.page-ttl-wrap -->
</template>

<script>
export default {
  components: {},
  data: function() {
    return {};
  },
  created: function() {}
};
</script>

<style lang="scss" scoped>
// 変数
@import '~assets/css/_common/variable';

.page-ttl-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.page-ttl-circle {
  display: block;
  width: 300px;
  height: 300px;
  border-radius: 640px;
  background-color: transparent;
  box-shadow: inset 2px 0 2px 0 $palette-blue--1,
    inset 0 1px 1px 0 $palette-purple--1, inset 0 -1px 1px 0 $palette-purple--1,
    inset 0 0 0 2px $palette-red--1;
}
@media screen and (min-width: $bp--sp), print {
  .page-ttl-circle {
    width: 400px;
    height: 400px;
  }
}
@media screen and (min-width: $bp--md), print {
  .page-ttl-circle {
    width: 640px;
    height: 640px;
  }
}
</style>
