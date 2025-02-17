import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()], // agar support pwa

  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      // menyimpan path alias yang digunakan untuk komponen shcdcn ui library
      '@/components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@config': path.resolve(__dirname, './src/config'),
      '@container': path.resolve(__dirname, './src/container'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@assets': path.resolve(__dirname, './src/assets'),
      // menyimpan path alias yang digunakan untuk utils shcdcn ui library
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hoc': path.resolve(__dirname, './src/hoc'),
      '@features': path.resolve(__dirname, './src/features'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@validations': path.resolve(__dirname, './src/validations'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks')
    }
  },
  test: {
    environment: 'happy-dom', // untuk testing react yang berkaitan dengan dom
    globals: true, // agar tidak perlu import dari vitest seperti (describe, test, expect, it), agar cara penggunaan seperti di jest
    setupFiles: './src/tests/setup.ts'
  }
})
