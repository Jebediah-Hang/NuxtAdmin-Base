// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: false
  },
  experimental: {
    decorators: true
  },
  nitro: {
    sourceMap: false
  },
  runtimeConfig: {
    secretConfig: {
      jwtSignKey: process.env.NUXT_JWT_SIGN_KEY
    },
    mediaConfig: {
      mediaStoreDir: process.env.NUXT_MEDIA_STORE_DIR
    },
    databaseConfig: {
      port: process.env.NUXT_DB_PORT,
      host: process.env.NUXT_DB_HOST,
      user: process.env.NUXT_DB_USER,
      password: process.env.NUXT_DB_PASSWORD,
      database: process.env.NUXT_DB_DATABASE
    }
  },
  css: ["element-plus/dist/index.css", "~/assets/styles/index.scss"],
  modules: ["nuxt-auth-utils", "@element-plus/nuxt"],
  elementPlus: {
    importStyle: false,
    defaultLocale: "zh-cn",
    installMethods: ["ElLoading", "ElMessage", "ElMessageBox", "ElNotification"]
  }
});
