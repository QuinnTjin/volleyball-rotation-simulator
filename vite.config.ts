import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // The app fetches relative URLs like /api/roster; in dev, Vite forwards
    // anything under /api to the Express server, so no CORS setup is needed.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
