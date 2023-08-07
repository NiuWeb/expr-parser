import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import monacoEditorPlugin from "vite-plugin-monaco-editor"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/expr-parser/",
  plugins: [
    react(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    monacoEditorPlugin.default({}),
  ],
})
