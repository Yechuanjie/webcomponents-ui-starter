import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.includes('jx-')
        }
      }
    }),
    vueJsx(),
    VueSetupExtend(),
    // dts({
    //   outputDir: 'dist/typings',
    //   staticImport: true,
    //   insertTypesEntry: true,
    //   copyDtsFiles: false,
    //   logDiagnostics: true,
    //   exclude: ['example']
    // }),
    visualizer()
  ],
  build: {
    target: 'es2015',
    outDir: 'dist/v-ui',
    lib: {
      fileName: 'index',
      entry: './packages/v-ui/index.ts',
      formats: ['es', 'cjs', 'umd'],
      name: 'JuexiaoUI'
    }
  }
})
