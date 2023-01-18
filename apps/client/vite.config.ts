import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const dirSrc = path.resolve(__dirname, "src").replace(/\\/g, "/");

  return {
    server: { hmr: true, port: 3000 },
    preview: {
      port: +env.PORT || 4173,
    },
    envPrefix: "APP_",
    define: {},
    build: {
      outDir: "build",
      sourcemap: false,
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
