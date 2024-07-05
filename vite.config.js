import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import jsconfigPaths from "vite-jsconfig-paths";
import path from "path";
import ViteEslint from "@nabla/vite-plugin-eslint";
import { visualizer } from "rollup-plugin-visualizer";
import timeReporter from "vite-plugin-time-reporter";
import Inspect from "vite-plugin-inspect";
import { VitePWA } from "vite-plugin-pwa";

// ==============================||  CONFIGURATION SETTINGS ||============================== //
export default defineConfig(({ command }) => {
  const isServe = command === "serve";
  const isBuild = command === "build";

  //common configration for serve && build
  const config = {
    base: "/",
    clearScreen: true,
    plugins: [
      react(),
      jsconfigPaths(),
      ViteEslint(),
      timeReporter(),
      Inspect(),
      VitePWA({
        registerType: "prompt",
        manifest: {
          name: "Shift Pixel",
          short_name: "SHF",
          description: "Kathmandu Chandol Nepal",
          theme_color: "#ffffff",
          icons: [
            {
              src: "1.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "2.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "3.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "src"),
      },
    },
  };

  //development configration
  if (isServe) {
    Object.assign(config, {
      server: {
        open: true,
        port: 3000,
        strictPort: true,
        hmr: {
          clientPort: 3000, // Ensure the client connects to the correct port
          overlay: false, // Disable the server error overlay if desired
        },
      },
    });
  }

  //production configration
  if (isBuild) {
    Object.assign(config, {
      build: {
        target: "esnext",
        outDir: "dist",
        assetsDir: "static",
        sourcemap: false,
        manifest: false,
      },
      plugins: [
        ...config.plugins,
        visualizer({
          template: "network", //sunburst network
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: "./build/analyse.html",
        }),
      ],
    });
  }

  return config;
});
