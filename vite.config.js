import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This is often the missing piece for Primer + Vite production builds
  ssr: {
    noExternal: ['@primer/react', 'styled-components']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    }
  }
})