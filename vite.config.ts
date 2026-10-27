import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
  build: {
    rollupOptions: {
      // two pages: the brand book (/) and the landing page (/landing.html)
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        landing: path.resolve(import.meta.dirname, 'landing.html'),
      },
    },
  },
})
