// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css", "v-calendar/dist/es/style.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxt/icon",
    "@sidebase/nuxt-auth",
  ],
  auth: {
    baseURL: "http://localhost:3000/api/auth",
    provider: {
      type: "authjs",
      defaultProvider: "google",
      addDefaultCallbackUrl: true,
    },
    globalAppMiddleware: false,
  },
  runtimeConfig: {
    supabaseUrl:
      process.env.SUPABASE_URL || process.env.NUXT_SUPABASE_URL || "",
    supabaseKey:
      process.env.SUPABASE_KEY || process.env.NUXT_SUPABASE_KEY || "",
  },
  app: {
    head: {
      title: "The Nuxt Oasis",
      meta: [{ name: "description", content: "Cabin rental platform" }],
    },
  },
  googleFonts: {
    families: {
      "Josefin Sans": [400, 500, 600],
    },
    display: "swap",
  },
});
