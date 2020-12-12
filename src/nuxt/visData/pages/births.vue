<template>
  <main class="mn-wrap" :key="pageKey">
    <PageTitle :title="pageTitle" :titleEn="pageTitleEn" />
    <div class="cnt-wrap">
      <div class="inner">
        <div class="cnt-box">
          <div class="frm-box">
            <div class="frm">
              <div class="frm-set">
                <div class="frm-cnt is-right">
                  <Select
                    :items="pref"
                    :currentVal="selectedPref"
                    @change="setSelectedPref"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- /.frm-box -->
          <div class="graph-box">
            <div
              class="result-graph animelm animelm-slide-in-top"
              data-animelm-delay="1200"
            >
              <canvas class="result-graph-canvas" id="births-graph"></canvas>
            </div>
          </div>
          <!-- /.graph-box -->
          <BackToTop />
        </div>
        <!-- /.cnt-box -->
      </div>
      <!-- /.inner -->
    </div>
    <!-- /.cnt-wrap -->
  </main>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import mixinMeta from '~/mixins/meta';
import mixinAnimelm from '~/mixins/animelm';
import PageTitle from '~/components/common/PageTitle.vue';
import Select from '~/components/frm/Select.vue';
import BackToTop from '~/components/common/BackToTop.vue';

export default {
  mixins: [mixinMeta, mixinAnimelm],
  components: {
    PageTitle: PageTitle,
    Select: Select,
    BackToTop: BackToTop
  },
  async asyncData({ store, $axios }) {
    let url = process.env.url;
    if (process.env.NODE_ENV === 'development') {
      url = process.env.urlLocal;
    }

    if (store.state.pref.data.length <= 0) {
      const resPref = await $axios.get(url + '/json/pref.json');
      store.commit('pref/setData', resPref.data);
    }

    let prefData = [];

    for (
      let i = 0, iLength = store.state.pref.data.length;
      i < iLength;
      i = (i + 1) | 0
    ) {
      const thisPref = store.state.pref.data[i];
      prefData.push({
        id: thisPref.prefCode,
        val: thisPref.prefCode,
        tx: thisPref.prefName
      });
    }

    const resBirths = await $axios.get(url + '/json/births.json');
    return {
      pref: prefData,
      births: resBirths.data
    };
  },
  data: function() {
    return {
      pref: [],
      births: {},
      selectedPref: 13,
      birthsGraph: null
    };
  },
  created: function() {
    if (process.browser) {
      if (!this.storeFlgInitPage) {
        this.$store.commit('init_page/setFlgInitPageTrue');
      }

      // localStorageが使用できる場合
      if (window.localStorage) {
        let storageData = localStorage.getItem('births_pref');

        // データを取得できた場合
        if (storageData != null && storageData !== '') {
          this.selectedPref = storageData;
        }
      }
    }
  },
  mounted: function() {
    Chart.defaults.global.defaultFontColor = 'rgba(255, 255, 255, 1)';
    Chart.defaults.global.defaultFontFamily =
      '-apple-system, BlinkMacSystemFont, Lucida Grande, Helvetica, Arial, "游ゴシック体", YuGothic, "游ゴシック Medium", "Yu Gothic Medium", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, sans-serif';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.tooltips.mode = 'index';
    Chart.defaults.global.tooltips.titleFontSize = 16;
    Chart.defaults.global.tooltips.titleFontStyle = '700';
    Chart.defaults.global.tooltips.bodyFontSize = 14;
    Chart.defaults.global.tooltips.bodyFontStyle = '400';

    this.initBirthsGraph();
  },
  methods: {
    setSelectedPref: function(val) {
      this.selectedPref = val;
    },
    initBirthsGraph: function() {
      const target = this.births[this.selectedPref];

      if (target != null) {
        if (this.birthsGraph) {
          this.birthsGraph.destroy();
        }

        let graphData = {
          labels: [],
          datasets: []
        };

        const graphOption = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: 'rgba(255, 255, 255, 0)'
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  color: 'rgba(255, 255, 255, 0.4)',
                  zeroLineColor: 'rgba(255, 255, 255, 1)'
                },
                ticks: {
                  userCallback: function(item) {
                    return item.toLocaleString() + '人';
                  }
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                const thisData = data.datasets[tooltipItem.datasetIndex];
                let label =
                  thisData.label +
                  '：' +
                  thisData.data[tooltipItem.index].toLocaleString() +
                  '人';

                return label;
              }
            }
          }
        };

        let graphDataBirths = {
          type: 'bar',
          label: '出生数',
          data: [],
          borderColor: 'rgba(18, 164, 233, 1)',
          backgroundColor: 'rgba(18, 164, 233, 1)'
        };

        for (
          let i = 0, iLength = target.data[3].data.length;
          i < iLength;
          i = (i + 1) | 0
        ) {
          const thisLineData = target.data[3].data[i];
          graphData.labels.push(thisLineData.year + '年');
          graphDataBirths.data.push(thisLineData.value);
        }

        graphData.datasets.push(graphDataBirths);

        const ctx = document.getElementById('births-graph');
        this.birthsGraph = new Chart(ctx, {
          type: 'bar',
          data: graphData,
          options: graphOption
        });
        this.setBirthsGraphHeight();
      }
    },
    setBirthsGraphHeight: function() {
      if (this.storeFlgSp) {
        this.birthsGraph.canvas.parentNode.style.height = '320px';
      } else if (this.storeFlgTab) {
        this.birthsGraph.canvas.parentNode.style.height = '480px';
      } else {
        this.birthsGraph.canvas.parentNode.style.height = '560px';
      }
    }
  },
  watch: {
    selectedPref: function() {
      // localStorageが使用できる場合
      if (window.localStorage) {
        // localStorageのデータを削除
        window.localStorage.removeItem('births_pref');

        // localStorageにデータを追加
        localStorage.setItem('births_pref', this.selectedPref);
      }

      this.initBirthsGraph();
    },
    storeFlgSp: function() {
      this.setBirthsGraphHeight();
    },
    storeFlgTab: function() {
      this.setBirthsGraphHeight();
    },
    storeFlgPc: function() {
      this.setBirthsGraphHeight();
    }
  },
  computed: {
    storePref: function() {
      return this.$store.state.pref.data;
    },
    storeFlgSp: function() {
      return this.$store.state.flg_bp.flgSp;
    },
    storeFlgTab: function() {
      return this.$store.state.flg_bp.flgTab;
    },
    storeFlgPc: function() {
      return this.$store.state.flg_bp.flgPc;
    }
  }
};
</script>

<style lang="scss">
.graph-box {
  margin-top: 24px;
}
.result-graph {
  position: relative;
}
</style>
