<template>
  <main class="mn-wrap" :key="pageKey">
    <PageTitle :title="pageTitle" :titleEn="pageTitleEn" />
    <div class="cnt-wrap">
      <div class="inner">
        <div class="cnt-box">
          <div class="frm-box">
            <div class="frm">
              <div
                class="frm-set animelm animelm-fade-in"
                data-animelm-delay="1200"
              >
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
              data-animelm-delay="1800"
            >
              <canvas
                class="result-graph-canvas"
                id="population-graph"
              ></canvas>
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
    if (!process.server && location.hostname.indexOf('localhost') >= 0) {
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

    const resPopulation = await $axios.get(url + '/json/population.json');
    return {
      pref: prefData,
      population: resPopulation.data
    };
  },
  data: function() {
    return {
      pref: [],
      population: {},
      selectedPref: 13,
      populationGraph: null
    };
  },
  created: function() {
    if (process.browser) {
      if (!this.storeFlgInitPage) {
        this.$store.commit('init_page/setFlgInitPageTrue');
      }

      // localStorageが使用できる場合
      if (window.localStorage) {
        let storageData = localStorage.getItem('population_pref');

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

    this.initPopulationGraph();
  },
  methods: {
    setSelectedPref: function(val) {
      this.selectedPref = val;
    },
    initPopulationGraph: function() {
      const target = this.population[this.selectedPref];

      if (target != null) {
        if (this.populationGraph) {
          this.populationGraph.destroy();
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
                }
              }
            ]
          }
        };

        let graphDataTotal = {
          type: 'line',
          label: '総人口',
          data: [],
          borderColor: 'rgba(246, 79, 89, 1)',
          pointBackgroundColor: 'rgba(246, 79, 89, 1)',
          fill: false
        };

        let graphDataOldAge = {
          type: 'bar',
          label: '老年人口',
          data: [],
          borderColor: 'rgba(169, 113, 237, 1)',
          backgroundColor: 'rgba(169, 113, 237, 1)'
        };

        let graphDataYounger = {
          type: 'bar',
          label: '年少人口',
          data: [],
          borderColor: 'rgba(18, 164, 233, 1)',
          backgroundColor: 'rgba(18, 164, 233, 1)'
        };

        let graphDataProduction = {
          type: 'bar',
          label: '生産年齢人口',
          data: [],
          borderColor: 'rgba(168, 255, 120, 1)',
          backgroundColor: 'rgba(168, 255, 120, 1)'
        };

        for (
          let i = 0, iLength = target.bar.data.length;
          i < iLength;
          i = (i + 1) | 0
        ) {
          const thisLineData = target.bar.data[i];
          graphData.labels.push(thisLineData.year + '年');
          graphDataTotal.data.push(thisLineData.sum);
          graphDataOldAge.data.push(thisLineData.class[0].value);
          graphDataProduction.data.push(thisLineData.class[1].value);
          graphDataYounger.data.push(thisLineData.class[2].value);
        }

        graphData.datasets.push(graphDataTotal);
        graphData.datasets.push(graphDataOldAge);
        graphData.datasets.push(graphDataYounger);
        graphData.datasets.push(graphDataProduction);

        const ctx = document.getElementById('population-graph');
        this.populationGraph = new Chart(ctx, {
          type: 'bar',
          data: graphData,
          options: graphOption
        });
        this.setPopulationGraphHeight();
      }
    },
    setPopulationGraphHeight: function() {
      if (this.storeFlgSp) {
        this.populationGraph.canvas.parentNode.style.height = '320px';
      } else if (this.storeFlgTab) {
        this.populationGraph.canvas.parentNode.style.height = '480px';
      } else {
        this.populationGraph.canvas.parentNode.style.height = '560px';
      }
    }
  },
  watch: {
    selectedPref: function() {
      // localStorageが使用できる場合
      if (window.localStorage) {
        // localStorageのデータを削除
        window.localStorage.removeItem('population_pref');

        // localStorageにデータを追加
        localStorage.setItem('population_pref', this.selectedPref);
      }

      this.initPopulationGraph();
    },
    storeFlgSp: function() {
      this.setPopulationGraphHeight();
    },
    storeFlgTab: function() {
      this.setPopulationGraphHeight();
    },
    storeFlgPc: function() {
      this.setPopulationGraphHeight();
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
