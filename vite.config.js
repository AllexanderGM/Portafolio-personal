import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import * as sass from 'sass'

const shouldGenerateSourceMap = (mode) => mode === 'analyze' || process.env.VITE_SOURCEMAP === 'true'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), VitePWA()],
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
    sourcemap: shouldGenerateSourceMap(mode),
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('swiper')) return 'swiper'
          if (id.includes('@heroui')) return 'heroui'
          if (id.includes('react')) return 'react-vendor'
          return 'vendor'
        }
      }
    }
  }
}))
