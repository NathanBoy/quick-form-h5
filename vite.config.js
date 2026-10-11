import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // Relative base makes the built output deployable from any sub-path
  // (e.g. GitHub Pages or a CDN folder).
  base: './',
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 4001,
    proxy: {
      // Optional: when using a real backend, proxy /api to your server.
      // See src/services/api.js for the expected endpoints.
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, '')
      }
    }
  }
})
