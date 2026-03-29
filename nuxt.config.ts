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
    // ปิดระบบยามเฝ้าหน้าเว็บ (Global Middleware) ทิ้งชั่วคราว เพื่อให้เข้าได้ทุกหน้าตอนกำลังทำตอนแรก
    redirect: false
  }
});