import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { imagetools } from "vite-imagetools";

const env = loadEnv("all", process.cwd());

export default defineConfig(({ command, mode }) => {
  console.log(command, mode);
  if (mode === "production") {
    return {
      plugins: [
        react(),

        imagetools(),
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

      // build: {
      //   rollupOptions: {
      //     output: {
      //       entryFileNames: `[name].js`,
      //       chunkFileNames: `[name].js`,
      //       assetFileNames: `[name].[ext]`,
      //     },
      //   },
      // },
      resolve: {
        alias: {
          stream: "stream-browserify",
          util: "util",
          "@": path.resolve(__dirname, "./src"),
          "@assets": path.resolve(__dirname, "./src/assets"),
          "@components": path.resolve(__dirname, "./src/components"),
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
    };
  } else if (mode === "development") {
    return {
      plugins: [
        react(),

        imagetools(),
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

      build: {
        rollupOptions: {
          output: {
            entryFileNames: `[name].js`,
            chunkFileNames: `[name].js`,
            assetFileNames: `[name].[ext]`,
          },
        },
      },
      resolve: {
        alias: {
          stream: "stream-browserify",
          util: "util",
          "@": path.resolve(__dirname, "./src"),
          "@assets": path.resolve(__dirname, "./src/assets"),
          "@components": path.resolve(__dirname, "./src/components"),
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
    };
  }
});
