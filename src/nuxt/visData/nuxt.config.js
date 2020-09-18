const now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
month = ("0" + month).slice(-2);
let day = now.getDate();
day = ("0" + day).slice(-2);
let hour = now.getHours();
hour = ("0" + hour).slice(-2);
let minute = now.getMinutes();
minute = ("0" + minute).slice(-2);
let second = now.getSeconds();
second = ("0" + second).slice(-2);
const cashBuster = "?ver=" + year + month + day + hour + minute + second;

export default {
  env: {
    cashBuster: cashBuster
  },
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "visData",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    filenames: {
      app: () => "js/[name].js" + cashBuster,
      chunk: () => "js/[name].js" + cashBuster,
      css: () => "css/[name].css" + cashBuster,
      img: () => "img/[name].[ext]" + cashBuster,
      font: () => "font/[name].[ext]" + cashBuster,
      video: () => "video/[name].[ext]" + cashBuster
    }
  }
};
