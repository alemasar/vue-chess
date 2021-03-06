import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.NUXT_ENV_APIKEY,
          authDomain: process.env.NUXT_ENV_AUTHDOMAIN,
          databaseURL: process.env.NUXT_ENV_DATABASEURL,
          projectId: process.env.NUXT_ENV_PROJECTID,
          storageBucket: process.env.NUXT_ENV_STORAGEBUCKET,
          messagingSenderId: process.env.NUXT_ENV_MESSAGINGSENDERID,
          appId: process.env.NUXT_ENV_APPID,
          measurementId: process.env.NUXT_ENV_MEASUREMENTID
        },
        services: {
          auth: false, // Just as example. Can be any other service.
          messaging: true,
          firestore: true
        },
        firestore: {
          memoryOnly: false // default
        }
      }
    ]
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
  }
}
