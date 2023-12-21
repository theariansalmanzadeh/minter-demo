import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const env = loadEnv("all", process.cwd());

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 8080,
  },
  define: {
    VITE_WC_PORJECT_ID: JSON.stringify(env.VITE_WC_PORJECT_ID),

    VITE_PORJECT_ID: JSON.stringify(env.VITE_PORJECT_ID),

    VITE_CLIENT_KEY: JSON.stringify(env.VITE_CLIENT_KEY),
    VITE_APP_ID: JSON.stringify(env.VITE_APP_ID),
  },
});
