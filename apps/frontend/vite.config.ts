import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const fromConfig = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  root: fromConfig('.'),
  publicDir: fromConfig('../../public'),
  plugins: [react()],
  build: {
    outDir: fromConfig('../../dist'),
    emptyOutDir: true,
  },
})
