import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@models': path.resolve(__dirname, './src/models'),
      '@services': path.resolve(__dirname, './src/services'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@router': path.resolve(__dirname, './src/router'),
      '@util': path.resolve(__dirname, './src/util')
    }
  }
})
