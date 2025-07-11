import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: true,
  //   port: 5173,

  //   ✅ ADD THIS
  //   origin: "https://roses-dan-instructions-chance.trycloudflare.com",

  //   // ✅ ENSURE HMR doesn't break with Cloudflare Tunnel (optional)
  //   hmr: {
  //     protocol: "wss",
  //     host: "roses-dan-instructions-chance.trycloudflare.com",
  //     clientPort: 443,
  //   },
  // },
});
