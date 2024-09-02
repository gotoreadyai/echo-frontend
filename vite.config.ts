import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@lingui/vite-plugin";
import { VitePWA } from "vite-plugin-pwa";
import monacoEditorPlugin, {
  type IMonacoEditorOpts,
} from "vite-plugin-monaco-editor";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const monacoEditorPluginDefault = (monacoEditorPlugin as any).default as (
  options: IMonacoEditorOpts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => any;

export default defineConfig({
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Smart Interactive EDU platform",
        short_name: "SmartInteractive",
        description:
          "Adaptatywna platforma edukacyjna wspierająca nauczanie hybrydowe.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        icons: [
          {
            src: "pwa/16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "pwa/32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "pwa/72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "pwa/96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "pwa/120x120.png",
            sizes: "120x120",
            type: "image/png",
          },
          {
            src: "pwa/128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "pwa/144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "pwa/152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "pwa/180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "pwa/192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa/384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "pwa/512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa/512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
    monacoEditorPluginDefault({
      languageWorkers: ["typescript", "editorWorkerService"],
      customWorkers: [
        {
          label: "tsworker",
          entry: "vite-plugin-monaco-editor/cdn/ts.worker.bundle.js",
        },
      ],
    }),
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    lingui(),
  ],
});
