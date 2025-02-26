import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://62.72.12.198/api/api", // Backend API URL
        changeOrigin: true,
        secure: false, // Disable SSL verification (if needed)
        rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite /api to match backend
      },
    },
  },
});
