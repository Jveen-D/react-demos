import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  proxy: {
    "/ysy": {
      target: "https://open.ys7.com", // 真实地址
      changeOrigin: true,
      pathRewrite: {
        "/ysy": "",
      },
    },
  },
});
