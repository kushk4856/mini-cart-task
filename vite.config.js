import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/ (configured base path for github pages)
export default defineConfig({
  plugins: [react()],
  base: '/mini-cart-task/',
})
