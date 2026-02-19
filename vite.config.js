import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // This is the "magic fix" for the SyntaxError and Box undefined errors
    exclude: ['@primer/react']
  }
})