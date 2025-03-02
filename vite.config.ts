import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon192.png", "favicon512.png"],
      manifest: {
        name: "Michi Clima",
        short_name: "MichiClima",
        description: "Una aplicación del clima",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/favicon192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/favicon512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ]
});
