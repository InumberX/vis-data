import metaConfig from '~/config/meta';

export default {
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
  }
};
