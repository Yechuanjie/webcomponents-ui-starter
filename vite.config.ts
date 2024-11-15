import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue/macros'],
      eslintrc: {
        enabled: true
      },
      dts: true
    })
  ],
  build: {
    outDir: 'dist/vast',
    lib: {
      fileName: 'index',
      entry: './packages/vast/index.ts',
      formats: ['es', 'cjs', 'umd'],
      name: 'vast'
    }
  }
})
