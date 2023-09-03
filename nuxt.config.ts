// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@nuxt/content",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "nuxt-icon",
    ],
    imports: {
        presets: [
            {
                from: "veaury",
                imports: ["applyReactInVue"],
            },
            {
                from: "anime",
                imports: ["*"],
            },
        ],
    },
    css: ["~/assets/css/main.css"],
    googleFonts: {
        families: {
            Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            Karla: [100, 200, 300, 400, 500, 600, 700, 800],
        },
    },
    app: {
        head: {
            link: [
                {
                    rel: "shortcut icon",
                    type: "image/png",
                    href: "https://dcdn.dstn.to/avatars/303173495918034945",
                },
            ],
        },
    },
});
