<template>
  <div class="page-ttl-wrap">
    <div class="inner">
      <div class="page-ttl-box">
        <i class="page-ttl-circle"></i>
        <div class="page-ttl">
          <h1 class="page-ttl-tx">
            {{ title }}<span class="page-ttl-en">{{ titleEn }}</span>
          </h1>
        </div>
      </div>
      <!-- /.page-ttl-box -->
    </div>
    <!-- /.inner -->
  </div>
  <!-- /.page-ttl-wrap -->
</template>

<script>
import metaConfig from '~/config/meta';

export default {
  components: {},
  props: {
    title: '',
    titleEn: ''
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

.page-ttl-wrap {
  position: relative;
  margin-top: 24px;
}
.page-ttl-box {
  position: relative;
}
.page-ttl-circle {
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -40px;
  width: 80px;
  height: 80px;
  z-index: $z-index--1;
  display: block;
  border-radius: 80px;
  background-color: transparent;
  box-shadow: inset 2px 0 2px 0 $palette-blue--1,
    inset 0 1px 1px 0 $palette-purple--1, inset 0 -1px 1px 0 $palette-purple--1,
    inset 0 0 0 2px $palette-red--1;
}
.page-ttl {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: $z-index--2;
  width: 100%;
  min-height: 80px;
  box-sizing: border-box;
  padding-left: 8px;
}
.page-ttl-tx {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
  color: $palette-white--0;
  transition: 0.3s font-size;
}
.page-ttl-en {
  display: block;
  font-size: 1.6rem;
  font-weight: 400;
  transition: 0.3s font-size;
  padding-left: 16px;
  line-height: 1;
}
@media screen and (min-width: $bp--sm), print {
  .page-ttl-wrap {
    margin-top: 32px;
  }
  .page-ttl-tx {
    font-size: 3.2rem;
  }
  .page-ttl-en {
    font-size: 1.8rem;
  }
}
@media screen and (min-width: $bp--md), print {
  .page-ttl-wrap {
    margin-top: 40px;
  }
  .page-ttl-tx {
    font-size: 4rem;
  }
  .page-ttl-en {
    font-size: 2rem;
  }
}
</style>
