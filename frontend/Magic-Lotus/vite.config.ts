/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // root: "/src",
  server: {
    port: 3000,
    https: {
      key: readFileSync("./.cert/key.pem"),
      cert: readFileSync("./.cert/cert.pem"),
    }, // USE HTTPS PROTOCOL (YOU NEED TO PROVIDE YOUR OWN CERTIFICATE)
    //cors: true, // USE CORS (default: true)
    // open: true, // OPEN NEW TAB WHEN SERVER STARTS
    // headers: {
    //   "content-type": "application/json",
    // },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests.setup.ts",
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
  },
});
