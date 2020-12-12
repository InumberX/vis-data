<template>
  <div class="top-page-list-wrap">
    <section
      v-for="(item, i) in pageList"
      class="page-list-wrap"
      :key="item.id"
      :id="item.id"
    >
      <div class="inner">
        <div class="page-list-box">
          <div
            class="page-list-img-box animelm"
            :class="[
              i % 2 === 0 ? 'animelm-slide-in-right' : 'animelm-slide-in-left'
            ]"
          >
            <figure class="page-list-img-obj">
              <img :src="item.img" alt="" class="page-list-img" />
            </figure>
          </div>
          <div
            class="page-list-cnt-box animelm"
            :class="[
              i % 2 === 0 ? 'animelm-slide-in-left' : 'animelm-slide-in-right'
            ]"
          >
            <nuxt-link :to="item.to" class="page-list-link">
              <div class="page-list-ttl-box">
                <h2 class="page-list-ttl">
                  <span class="page-list-ttl-mn">{{ item.title }}</span>
                  <span class="page-list-ttl-sub">{{ item.titleEn }}</span>
                </h2>
              </div>
              <div class="page-list-tx-box">
                <p class="page-list-tx">{{ item.tx }}</p>
                <p class="page-list-tx is-en" v-if="item.txEn">
                  {{ item.txEn }}
                </p>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <!-- /.inner -->
    </section>
    <!-- /.page-list-wrap -->
  </div>
  <!-- /.top-page-list-wrap -->
</template>

<script>
import mixinAnimelm from '~/mixins/animelm';

export default {
  mixins: [mixinAnimelm],
  components: {},
  data: function() {
    return {
      pageList: [
        {
          id: 'population',
          to: '/population/',
          img: '/img/img_population.jpg',
          title: '人口増減率',
          titleEn: 'population',
          tx: '各都道府県の人口増減率を表示します。',
          txEn:
            'Displays the percentage change in population for each province.'
        },
        {
          id: 'births',
          to: '/births/',
          img: '/img/img_births.jpg',
          title: '出生数',
          titleEn: 'births',
          tx: '各都道府県の出生数を表示します。',
          txEn: 'Displays the number of births in each prefecture.'
        }
      ]
    };
  },
  created: function() {},
  mounted: function() {},
  methods: {}
};
</script>

<style lang="scss">
// 変数
@import '~assets/css/_common/variable';

.top-page-list-wrap {
  position: relative;
  z-index: $z-index--1;
  background-color: $palette-black--1;
  margin-top: 40px;
  .page-list-wrap {
    &:first-of-type {
      margin-top: 0;
    }
    &:nth-of-type(even) {
      .page-list-img-box {
        left: auto;
        right: 0;
      }
      .page-list-cnt-box {
        margin: 0 auto 0 0;
      }
    }
  }
}
.page-list-wrap {
  position: relative;
  margin-top: 80px;
  overflow: hidden;
}
.page-list-box {
  padding-top: 96px;
  overflow: hidden;
}
.page-list-img-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  max-width: 768px;
  z-index: $z-index--1;
}
.page-list-img-obj {
  position: relative;
  display: block;
  padding-top: 56.25%;
}
.page-list-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.page-list-cnt-box {
  position: relative;
  z-index: $z-index--2;
  width: 80%;
  margin: 0 0 0 auto;
  background-color: $palette-black--1;
  box-sizing: border-box;
}
.page-list-link:not(:root) {
  position: relative;
  display: block;
  color: $palette-white--0;
  text-decoration: none;
  padding: 16px 16px 32px;
  outline: 0;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    bottom: 8px;
    right: 16px;
    display: block;
    width: 80px;
    height: 16px;
    border-bottom: 1px solid $palette-white--0;
    border-right: 4px solid $palette-white--0;
    transform: skew(45deg);
    transition: 0.3s border-color;
  }
  &:hover {
    &:after {
      border-color: $palette-blue--1;
    }
  }
}
.page-list-ttl {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
}
.page-list-ttl-mn {
  display: block;
}
.page-list-ttl-sub {
  display: block;
  font-size: 2rem;
  font-weight: 400;
  margin: 8px 0 0;
  padding: 8px 0 0;
  position: relative;
  &:before {
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background-color: $palette-white--0;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.page-list-tx-box {
  margin: 16px 0 0;
}
.page-list-tx {
  margin: 0;
  + .page-list-tx {
    margin-top: 8px;
  }
  &.is-en {
    font-size: 1.4rem;
  }
}
@media screen and (min-width: $bp--sm), print {
  .top-page-list-wrap {
    margin-top: 56px;
    .page-list-wrap {
      &:nth-of-type(even) {
        .page-list-img-box {
          right: auto;
          margin-left: auto;
        }
        .page-list-cnt-box {
          margin-top: -80px;
        }
      }
    }
  }
  .page-list-img-box {
    position: relative;
    top: auto;
    left: auto;
  }
  .page-list-cnt-box {
    margin-top: -80px;
  }
  .page-list-link:not(:root) {
    padding: 24px 24px 48px;
    &:after {
      bottom: 8px;
      right: 24px;
      width: 120px;
      height: 24px;
      border-bottom-width: 2px;
      border-right-width: 6px;
    }
  }
  .page-list-ttl {
    font-size: 2.6rem;
  }
  .page-list-ttl-sub {
    font-size: 2.2rem;
  }
  .page-list-tx {
    &.is-en {
      font-size: 1.6rem;
    }
  }
}
@media screen and (min-width: $bp--md), print {
  .top-page-list-wrap {
    margin-top: 64px;
    .page-list-wrap {
      &:nth-of-type(even) {
        .page-list-cnt-box {
          margin-top: -96px;
        }
      }
    }
  }
  .page-list-cnt-box {
    margin-top: -96px;
  }
  .page-list-link:not(:root) {
    padding: 48px;
    &:after {
      width: 240px;
    }
  }
  .page-list-ttl {
    font-size: 2.8rem;
  }
  .page-list-ttl-sub {
    font-size: 2.4rem;
  }
}
@media screen and (min-width: $bp--lg), print {
  .page-list-cnt-box {
    margin-top: -136px;
  }
  .page-list-link:not(:root) {
    padding: 64px;
    &:after {
      width: 320px;
    }
  }
  .page-list-ttl {
    font-size: 3.2rem;
  }
  .page-list-ttl-sub {
    font-size: 2.8rem;
  }
}
</style>
