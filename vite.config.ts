import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.includes('v-')
        }
      }
    })
  ],
  build: {
    target: 'es2015',
    outDir: 'dist/v-ui',
    lib: {
      fileName: 'index',
      entry: './packages/v-ui/index.ts',
      formats: ['es', 'cjs', 'umd'],
      name: 'v-ui'
    }
  }
})
