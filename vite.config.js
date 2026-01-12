import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import image from '@rollup/plugin-image'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import * as sass from 'sass'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), image(), VitePWA()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        implementation: sass
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@library': path.resolve(__dirname, './src/library'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@context': path.resolve(__dirname, './src/context'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@data': path.resolve(__dirname, './src/_data'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services')
    }
  },
  base: './',
  build: {
    sourcemap: true
  }
})
