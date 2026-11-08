import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    // Tudo que começar com /api é repassado para o servidor Express (porta 3001)
    proxy: { '/api': 'http://localhost:3001' },
  },
})
