  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import { lingui } from "@lingui/vite-plugin";
  import { VitePWA } from "vite-plugin-pwa";
  import viteCompression from 'vite-plugin-compression';
  import monacoEditorPlugin, {
    type IMonacoEditorOpts,
  } from "vite-plugin-monaco-editor";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const monacoEditorPluginDefault = (monacoEditorPlugin as any).default as (
    options: IMonacoEditorOpts
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => any;

  export default defineConfig({
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Skrócona lista rozszerzeń
    },
    build: {
      target: 'esnext',
      minify: "terser",
      sourcemap: false,
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      rollupOptions: {
        output: {
          // Redukcja wielkości plików i wydajności za pomocą chunków
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'; // Wyodrębnienie paczek z node_modules
            }
          },
        },
      },
      // rollupOptions: {
      //   output: {
      //     manualChunks: (id) => {
      //       if (id.includes("node_modules")) {
      //         return id
      //           .toString()
      //           .split("node_modules/")[1]
      //           .split("/")[0]
      //           .toString();
      //       }
      //     },
      //   },
      // },
    },
    // esbuild: {
    //   jsxInject: `import React from 'react'`, // Automatyczne wstrzykiwanie Reacta (jeśli jest potrzebne)
    // },
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.origin === self.location.origin,
              handler: "CacheFirst",
              options: {
                cacheName: "pages",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
                },
              },
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
      viteCompression({
        // Konfiguracja dla gzip
        algorithm: 'gzip', 
        ext: '.gz', // Rozszerzenie dla skompresowanych plików
      }),
      // viteCompression({
      //   // Konfiguracja dla Brotli
      //   algorithm: 'brotliCompress',
      //   ext: '.br', // Rozszerzenie dla plików Brotli
      // }),
      lingui(),
    ],
    // server: {
    //   port: 3000,
    //   host: true,
    //   watch: {
    //      usePolling: true,
    //   },}
  });
