import vue from "@vitejs/plugin-vue";
import UnheadVite from "@unhead/addons/vite";

/**
 * @type {import('vite').UserConfig}
 */
export default {
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith("md-"),
                },
            },
        }),
        UnheadVite(),
    ],
    resolve: { alias: { vue: "vue/dist/vue.esm-bundler.js" } },
};
