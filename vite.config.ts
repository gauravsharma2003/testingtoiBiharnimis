import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_LOCAL_PREVIEW === 'true' 
    ? '/' 
    : (process.env.NODE_ENV === 'production' 
        ? 'https://testingtoi-simulationroom.vercel.app/' 
        : '/'),
})
