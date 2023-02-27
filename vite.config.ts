import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // set the path aliases
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components'
    },
  },
})
