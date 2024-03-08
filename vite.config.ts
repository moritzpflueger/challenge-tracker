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
            "src": "android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "apple-touch-icon.png",
            "sizes": "180x180",
            "type": "image/png"
          },
          {
            "src": "favicon-16x16.png",
            "sizes": "16x16",
            "type": "image/png"
          },
          {
            "src": "favicon-32x32.png",
            "sizes": "32x32",
            "type": "image/png"
          },
          {
            "src": "favicon.ico",
            "sizes": "48x48",
            "type": "image/x-icon"
          }
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
