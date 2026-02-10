import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],

  // 👇 ВАЖЛИВО ДЛЯ GITHUB PAGES
  base: '/Mistarium/',
  build: {
    outDir: 'docs',       // замість dist
  },
})