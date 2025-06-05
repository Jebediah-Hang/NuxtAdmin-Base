import type { PoolOptions } from 'mysql2/promise';
import type { SecretRuntimeConfig, MediaRuntimeConfig } from '@/types/models/common';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: {
    enabled: false
  },
  devServer: {
    // host: '0.0.0.0'
  },
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: {
    defaultLocale: 'zh-cn'
  },
  nitro: {
    sourceMap: false
  },
  runtimeConfig: {
    databaseConfig: <PoolOptions>{
      host: process.env.NUXT_DB_HOST,
      user: process.env.NUXT_DB_USER,
      password: process.env.NUXT_DB_PASSWORD,
      database: process.env.NUXT_DB_DATABASE
    },
    secretConfig: <SecretRuntimeConfig>{
      jwtSignKey: process.env.NUXT_JWT_SIGN_KEY
    },
    mediaConfig: <MediaRuntimeConfig>{
      imageDir: process.env.NUXT_IMAGE_STORE_DIR,
      imagePublicPath: process.env.NUXT_IMAGE_PUBLIC_PATH
    }
  },
  app: {
    head: {
      title: 'Nuxt Admin'
    }
  }
})
