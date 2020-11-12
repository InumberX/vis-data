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
const url = protocol + domain;
const description =
  '「vis:Data（ビズデータ）」は、様々なデータをグラフなどを用いてビジュアル的に表現することを目的としたサイトです。';

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
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover'
      },
      {
        hid: 'X-UA-Compatible',
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge'
      },
      {
        hid: 'format-detection',
        name: 'format-detection',
        content: 'telephone=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: url + '/img/img_og.png'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: title
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary'
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@InumberX'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#12c2e9'
      }
    ],
    link: [
      {
        hid: 'icon',
        rel: 'icon',
        href: '/img/favicon.ico'
      },
      {
        hid: 'apple-touch-icon',
        rel: 'apple-touch-icon',
        href: '/img/favicon_180.png'
      },
      {
        hid: 'appleTouchIcon',
        rel: 'apple-touch-icon',
        href: '/img/favicon.png'
      }
    ],
    script: [
      {
        src: '/js/dat.gui.min.js' + cashBuster,
        defer: true,
        body: false
      },
      {
        src: '/js/web-gl-fluid.js' + cashBuster,
        defer: true,
        body: false
      }
    ]
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
  },
  // PWA
  manifest: {
    name: title,
    title: title,
    lang: 'ja',
    theme_color: '#12c2e9',
    background_color: '#111111',
    display: 'standalone',
    scope: '/',
    start_url: url + '/',
    icons: [
      {
        src: '/img/favicon_72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: '/img/favicon_96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: '/img/favicon_128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: '/img/favicon_144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: '/img/favicon_152.png',
        sizes: '152x152',
        type: 'image/png'
      },
      {
        src: '/img/favicon_192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/img/favicon_384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '/img/favicon_512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  workbox: {
    offline: false,
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        // 求人検索APIから取得した結果
        urlPattern: '/*.html',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: {
          cacheExpiration: {
            maxAgeSeconds: 0
          },
          cacheableResponse: {
            statuses: [200]
          }
        }
      },
      {
        // デフォルト（最後に記述する）
        urlPattern: '/*',
        handler: 'networkFirst',
        method: 'GET'
      }
    ]
  }
};
