import metaConfig from '~/config/meta';

export default {
  data: function() {
    return {
      pageTitle: '',
      pageTitleEn: ''
    };
  },
  head: function() {
    const path = this.$route.path;
    let meta = {
      title: '',
      meta: []
    };
    let metaTargetNum = 0;

    for (let i = 0, iLength = metaConfig.length; i < iLength; i = (i + 1) | 0) {
      const thisMetaConfig = metaConfig[i];
      if (thisMetaConfig.route === path) {
        metaTargetNum = i;
        break;
      }
    }

    if (metaTargetNum === 0) {
      meta.titleTemplate = '';
    }

    const targetMeta = metaConfig[metaTargetNum];

    meta.title = targetMeta.title;

    if (targetMeta.description != null) {
      meta.meta.push({
        hid: 'description',
        name: 'description',
        content: targetMeta.description
      });
    }

    return meta;
  },
  created: function() {
    this.pageTitle = this.getPageTitle();
    this.pageTitleEn = this.getPageTitleEn();
  },
  methods: {
    getPageTitle: function() {
      let result = '';
      const path = this.$route.path;

      for (
        let i = 0, iLength = metaConfig.length;
        i < iLength;
        i = (i + 1) | 0
      ) {
        const thisMetaConfig = metaConfig[i];
        if (thisMetaConfig.route === path) {
          result = metaConfig[i].title;
          break;
        }
      }
      return result;
    },
    getPageTitleEn: function() {
      let result = '';
      const path = this.$route.path;

      for (
        let i = 0, iLength = metaConfig.length;
        i < iLength;
        i = (i + 1) | 0
      ) {
        const thisMetaConfig = metaConfig[i];
        if (thisMetaConfig.route === path) {
          result = metaConfig[i].titleEn;
          break;
        }
      }
      return result;
    }
  },
  computed: {
    pageKey: function() {
      return this.$route.name;
    }
  }
};
