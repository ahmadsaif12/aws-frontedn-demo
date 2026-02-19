import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This forces Vite to use the ESM version directly
      '@primer/react': path.resolve(__dirname, 'node_modules/@primer/react/lib-esm/index.js'),
    },
  },
  optimizeDeps: {
    include: ['@primer/react'],
  },
})