export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  /*target: 'static',*/

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Робота Нової пошти під час війни. Графік, відкриті відділення та послуги',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Як працює Нова пошта під час війни? Графік роботи, відкриті відділення та доступні послуги станом на сьогодні.' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-awesome-swiper.js', ssr: false },
    { src: '~/plugins/gtm'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/gtm',
  ],

  gtm: {
    id: 'GTM-PV9WN82', // Used as fallback if no runtime config is provided,
    enabled: true,
  },

  publicRuntimeConfig: {
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://api.novaposhta.ua/v2.0/json/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: ''
  },
}

