import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import svg from 'vite-plugin-svgstring'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl(), svg()],
});
