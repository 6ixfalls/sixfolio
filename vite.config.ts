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
};
