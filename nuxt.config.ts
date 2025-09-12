// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: false
  },
  experimental: {
    decorators: true
  },
  runtimeConfig: {
    mediaConfig: {
      mediaStoreDir: process.env.NUXT_MEDIA_STORE_DIR
    }
  },
  modules: ["nuxt-auth-utils"]
});
