import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      // template: {
      //   compilerOptions: {
      //     isCustomElement: (tag: string) => tag.includes('vast-')
      //   }
      // }
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
