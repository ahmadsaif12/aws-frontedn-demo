import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      // This forces Vite to handle mixed module types (CommonJS/ESM)
      // which is a common cause of "undefined" components in Primer/React 19
      transformMixedEsModules: true, 
    },
    // Optional: Helps debug by not completely mangling names
    minify: 'terser', 
    terserOptions: {
      compress: {
        keep_fnames: true,
      },
      mangle: {
        keep_fnames: true,
      },
    },
  },
})