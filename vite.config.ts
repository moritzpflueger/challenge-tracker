import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Challenge Counter',
        short_name: 'Counter',
        theme_color: '#000',
        background_color: '#000',
        icons: [
          {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          },
        ],
      },
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('swiper-') // exclude web components from being compiled
        }
      
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
