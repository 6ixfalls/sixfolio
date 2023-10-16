// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@nuxt/content",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "nuxt-icon",
        "@nuxt/image",
        "nuxt-og-image",
        "nuxt-link-checker",
        "nuxt-simple-robots",
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
            Lora: [600],
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
            htmlAttrs: {
                lang: "en",
            },
        },
    },
    content: {
        highlight: {
            theme: "github-dark",
        },
        markdown: {
            remarkPlugins: ["remark-twemoji", "remark-breaks"],
        },
        navigation: {
            fields: ["layout_order"],
        },
        documentDriven: true,
    },
    site: {
        url: "https://sixfal.ls",
    },
    linkChecker: {
        failOnError: false,
    },
    nitro: {
        prerender: {
            crawlLinks: true,
            routes: ["/_ipx/h_1024/img/hu_tao_qixia.jpg", "/robots.txt"],
        },
    },
    robots: {
        // disallow admin cms route
        disallow: ["/admin"],
    },
});
