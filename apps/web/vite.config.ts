import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig(({ mode }) => ({
  plugins: [
    remixCloudflareDevProxy(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  // bugっぽい。`https://github.com/remix-run/remix/issues/9245`
  resolve: {
    alias: {
      ...(mode === "development" && { "postgres": path.resolve(__dirname, "../../node_modules/postgres/src/index.js") })
    }
  },
  server: {
    port: 3000,
  },
}));
