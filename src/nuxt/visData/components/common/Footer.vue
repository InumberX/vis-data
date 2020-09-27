<template>
  <footer class="ft-wrap">
    <div class="ft-copy-wrap">
      <div class="inner">
        <div class="ft-copy-box">
          <p class="ft-copy">
            <small class="ft-copy-tx" lang="en"
              >&copy;
              <i class="ft-copy-year" id="ft-copy-year" vcloak>{{
                currentYear
              }}</i>
              N/NE, All rights reserved.
            </small>
          </p>
        </div>
        <!-- /.ft-copy-box -->
      </div>
      <!-- /.inner -->
    </div>
    <!-- /.ft-copy-wrap -->
  </footer>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      // 現在年
      currentYear: ''
    };
  },
  created: function() {
    // 現在年を取得
    const now = new Date();
    const year = now.getFullYear();
    this.currentYear = year;
  }
};
</script>

<style lang="scss" scoped>
// 変数
@import '~assets/css/_common/variable';

.ft-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: transparent;
  z-index: $z-index--footer-1;
}
.ft-copy-wrap {
  margin: 0;
  padding: 16px 0;
}
.ft-copy {
  text-align: right;
  font-size: 1rem;
  margin: 0;
}
</style>
