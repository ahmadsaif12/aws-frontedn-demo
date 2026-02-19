import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // This forces Vite to handle Primer's internal module structure correctly
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // Ensure the base path is correct for Amplify
  base: '/', 
})