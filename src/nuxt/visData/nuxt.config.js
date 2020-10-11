const now = new Date();
const cashBuster =
  '?ver=' +
  now.getFullYear() +
  ('0' + (now.getMonth() + 1)).slice(-2) +
  ('0' + now.getDate()).slice(-2) +
  ('0' + now.getHours()).slice(-2) +
  ('0' + now.getMinutes()).slice(-2) +
  ('0' + now.getSeconds()).slice(-2);

const title = 'vis:Data';
const protocol = 'https://';
const domain = 'vis-data.netlify.app';
const url = protocol + domain + '/';
const description = 'description';

export default {
  env: {
    cashBuster: cashBuster,
    title: title,
    protocol: protocol,
    domain: domain,
    url: url,
    description: description
  },
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    // ページ遷移時の設定
    scrollBehavior: function(to, from, savedPosition) {
      // トップまでスクロールする
      return { x: 0, y: 0 };
    },
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'notFound',
        path: '*',
        component: resolve(__dirname, 'pages/index.vue')
      });
    }
  },
  // ページ遷移の設定
  pageTransition: {
    name: 'va-page',
    mode: 'out-in'
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s | ' + title,
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    {
      src: '@/assets/css/common.scss',
      lang: 'scss'
    }
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    filenames: {
      app: () => 'js/[name].js' + cashBuster,
      chunk: () => 'js/[name].js' + cashBuster,
      css: () => 'css/[name].css' + cashBuster,
      img: () => 'img/[name].[ext]' + cashBuster,
      font: () => 'font/[name].[ext]' + cashBuster,
      video: () => 'video/[name].[ext]' + cashBuster
    }
  }
};
