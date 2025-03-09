import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [ tailwindcss(),react()],
  server: {
    host: "0.0.0.0",
    port: 5173
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
