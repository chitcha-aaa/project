// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  },
  modules: [
    "@nuxt/icon",
    "@nuxtjs/supabase"
  ],

  supabase: {
    redirect: false,
    // Service Role Key สำหรับ server-side เท่านั้น (invite user, admin operations)
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
    // ชี้ไปที่ไฟล์ types ที่ generate มาจาก Supabase CLI
    // หลังจาก run: npx supabase gen types typescript --project-id hqtsrzlgatgtmzvhjeyh > types/database.types.ts
    types: './types/database.types.ts',
  }
});