import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";
import vitePluginImp from "vite-plugin-imp";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

import path from "path";
import { dependencies } from "./package.json";

function renderChunks(deps: Record<string, unknown>) {
  const chunks = {};

  Object.keys(deps).forEach((key) => {
    if (
      [
        "react",
        "react-router-dom",
        "react-dom",
        "antd",
        "@ant-design/pro-layout",
        "@react-pdf/renderer",
      ].includes(key)
    )
      return;
    chunks[key] = [key];
  });

  return chunks;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const dirSrc = path.resolve(__dirname, "src").replace(/\\/g, "/");

  return {
    server: { hmr: true, port: 3000 },
    envPrefix: "APP_",
    define: {
      // Wont work because not all of the files with JSX are .tsx (i think)
      // APP_API_HOST_V2:
      //   mode === "development" ? "http://localhost:5050" : env.APP_API_HOST_V2,
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
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
    ],
    resolve: {},
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
    build: {
      outDir: "build",
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-router-dom", "react-dom"],
            ...renderChunks(dependencies),
          },
        },
      },
    },
    test: {
      globals: true,
      coverage: {
        reporter: ["text", "json", "html"],
      },
    },
  };
});
