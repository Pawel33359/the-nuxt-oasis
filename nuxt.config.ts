// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxtjs/google-fonts"],
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
