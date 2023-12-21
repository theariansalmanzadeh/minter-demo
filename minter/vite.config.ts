import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const env = loadEnv("all", process.cwd());

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ["path", "stream", "util"],
      exclude: ["http"],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      overrides: {
        fs: "memfs",
      },
      protocolImports: true,
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      // plugins: [
      //   NodeGlobalsPolyfillPlugin({
      //     buffer: true,
      //   }),
      // ],
    },
  },
  resolve: {
    alias: {
      stream: "stream-browserify",
      util: "util",
    },
  },
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