import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Base is "/" so it works on a custom domain (GitHub Pages custom domain serves from root).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 3000,
    // Accept the v0/preview proxy host header.
    allowedHosts: true,
  },
})
