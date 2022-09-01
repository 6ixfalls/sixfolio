import vue from '@vitejs/plugin-vue'

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  resolve: { alias: { 'vue': 'vue/dist/vue.esm-bundler.js' } },
}
