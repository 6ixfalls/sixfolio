import vue from '@vitejs/plugin-vue'

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('md-')
      }
    }
  })],
  resolve: { alias: { 'vue': 'vue/dist/vue.esm-bundler.js' } },
}
