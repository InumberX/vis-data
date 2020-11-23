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

<style lang="scss">
// 変数
@import '~assets/css/_common/variable';

.ft-wrap {
  width: 100%;
  margin-top: 40px;
}
.ft-copy-wrap {
  margin: 0;
  padding: 24px 0;
}
.ft-copy {
  text-align: right;
  font-size: 1.2rem;
  margin: 0;
}
@media screen and (min-width: $bp--sm), print {
  .ft-wrap {
    margin-top: 64px;
  }
  .ft-copy-wrap {
    padding: 40px 0;
  }
}
</style>
