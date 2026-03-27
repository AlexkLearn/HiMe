/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
    },
  },
})