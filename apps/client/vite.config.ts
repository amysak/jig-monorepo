import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { imagetools } from "vite-imagetools";
import checker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

import path from "path";
import { dependencies } from "./package.json";

const reactDeps = Object.keys(dependencies).filter(
  (key) => key === "react" || key.startsWith("react-")
);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const dirSrc = path.resolve(__dirname, "src").replace(/\\/g, "/");

  return {
    server: { hmr: true, port: 3000 },
    preview: {
      port: +env.PORT || 4173,
    },
    envPrefix: "VITE_",
    define: {},
    // optimizeDeps: { include: ["@jigbid/ui"] },
    build: {
      // commonjsOptions: { include: ["@jigbid/ui", /node_modules/] },
      outDir: "build",
      sourcemap: false,
      // rollupOptions: {
      //   output: {
      //     manualChunks: {
      //       vendor: reactDeps,
      //       ...Object.keys(dependencies).reduce((chunks, name) => {
      //         if (!reactDeps.includes(name)) {
      //           chunks[name] = [name];
      //         }
      //         return chunks;
      //       }, {}),
      //     },
      //   },
      // },
    },
    resolve: {
      alias: {
        "type-defs": path.resolve(
          __dirname,
          "../../packages/type-defs/dist/es/index.js"
        ),
      },
    },
    plugins: [
      react({
        include: ["**/*.tsx", "**/*.ts"],
      }),
      tsconfigPaths(),
      imagetools({
        defaultDirectives: (_url) => {
          return new URLSearchParams({
            format: "webp",
          });
        },
      }),
      svgr({ exportAsDefault: true }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            ...env,
            MODE: mode,
          },
        },
      }),
      checker({ typescript: true }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '${dirSrc}/assets/styles/variables';
            @import '${dirSrc}/assets/styles/overrides';
          `,
          javascriptEnabled: true,
        },
      },
    },
  };
});
