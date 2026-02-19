import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Remove the drafts line from optimizeDeps if it was there
  optimizeDeps: {
    include: ['@primer/react'],
  },
})