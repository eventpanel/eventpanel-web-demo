import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages deployment
  // Change 'eventpanel-web-demo' to your repository name if different
  base: process.env.NODE_ENV === 'production' ? '/eventpanel-web-demo/' : '/',
  server: {
    port: 5173,
    proxy: {
      // Proxy API requests to NestJS backend
      '/api': {
        target: 'http://localhost:3005',
        changeOrigin: true,
      },
    },
  },
})
