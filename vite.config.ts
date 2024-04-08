import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
   environment: "jsdom",
   globals: true,
   setupFiles: "./test_setup.ts",
   // you might want to disable it, if you don't have tests that rely on CSS
   // since parsing CSS is slow
   css: false,
  },
})
