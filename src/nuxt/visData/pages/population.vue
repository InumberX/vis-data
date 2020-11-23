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
            <div class="result-graph">
              <canvas
                class="result-graph-canvas"
                id="population-graph"
              ></canvas>
            </div>
          </div>
          <!-- /.graph-box -->
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
import PageTitle from '~/components/common/PageTitle.vue';
import Select from '~/components/frm/Select.vue';

export default {
  mixins: [mixinMeta],
  components: {
    PageTitle: PageTitle,
    Select: Select
  },
  async asyncData({ store, $axios }) {
    if (store.state.pref.data.length <= 0) {
      const resPref = await $axios.get('/json/pref.json');
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

    const resPopulation = await $axios.get('/json/population.json');
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
    Chart.defaults.global.defaultFontColor = '#ffffff';
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
          responsive: true
        };

        console.log(target);

        let graphDataTotal = {
          type: 'line',
          label: '総人口',
          data: [],
          borderColor: 'rgba(254, 97, 132, 1)',
          pointBackgroundColor: 'rgba(254, 97, 132, 1)',
          fill: false
        };

        for (
          let i = 0, iLength = target.line.data.length;
          i < iLength;
          i = (i + 1) | 0
        ) {
          const thisLineData = target.line.data[i];
          graphData.labels.push(thisLineData.year + '年');
          graphDataTotal.data.push(thisLineData.value);
        }

        graphData.datasets.push(graphDataTotal);

        console.log(graphData);

        const ctx = document.getElementById('population-graph');
        this.populationGraph = new Chart(ctx, {
          type: 'bar',
          data: graphData,
          options: graphOption
        });
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
    }
  },
  computed: {
    storePref: function() {
      return this.$store.state.pref.data;
    }
  }
};
</script>

<style lang="scss">
.result-graph {
  position: relative;
}
</style>
