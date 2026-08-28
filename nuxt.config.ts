export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "nuxt-tiptap-editor",
    "@nuxtjs/robots",
    "nuxt-rate-limit",
    "nuxt-swiper",
    "@vite-pwa/nuxt",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
  ],
  i18n: {
    langDir: "locales",
    defaultLocale: "en",
    strategy: "no_prefix",

    locales: [
      {
        code: "vi",
        name: "Tiếng Việt",
        file: "vi.json",
      },
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "zh",
        name: "中文",
        file: "zh.json",
      },
      {
        code: "ko",
        name: "한국어",
        file: "ko.json",
      },
      {
        code: "de",
        name: "Deutsch",
        file: "de.json",
      },
      {
        code: "ja",
        name: "日本語",
        file: "ja.json",
      },
      {
        code: "fr",
        name: "Français",
        file: "fr.json",
      },
    ],
  },
  vite: {
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "@vueuse/core",
        "socket.io-client",
        'dayjs',
        'dayjs/plugin/relativeTime',
        'dayjs/plugin/utc',
        'dayjs/plugin/timezone',
        'dayjs/locale/vi',
      ],
    },
  },
  devtools: {
    enabled: false,
  },
  runtimeConfig: {
    dev: process.env.NODE_ENV === "production" ? false : true,
    mongoURI: process.env.MONGO_URI,
    mongoDB: process.env.MONGO_DB,
    apiSecret: process.env.SECRET,
    tz: process.env.TZ,
    public: {
      dev: process.env.NODE_ENV !== "production",
      clientURL: process.env.CLIENT_URL,
      domain: process.env.DOMAIN,
      ipx: process.env.IPX_ON !== "false",
      cookieConfig: {
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        ...(process.env.NODE_ENV === "production" && {
          domain: `.${process.env.DOMAIN}`,
        }),
      },
      version: process.env.VERSION,
    },
  },
  googleFonts: {
    display: "swap",
    download: true,
    families: {
      Lexend: [300, 400, 500, 600, 700, 800, 900],
    },
  },
  site: {
    url: process.env.CLIENT_URL,
    name: process.env.NAME,
  },
  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },
  nuxtRateLimit: {
    routes: {
      "/api/*": {
        maxRequests: 10,
        intervalSeconds: 1,
      },
    },
  },
  icon: {
    serverBundle: "remote",
  },
  image: {
    provider: "ipx",
    domains: [process.env.DOMAIN as string],
  },
  colorMode: {
    preference: "light",
  },
  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
  nitro: {
    externals: {
      external: ["node-cron"],
    },
  },
});
