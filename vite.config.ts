import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

function handleModuleDirectivesPlugin() {
  return {
    name: "handle-module-directives-plugin",
    transform(code: string, id: string | string[]) {
      if (id.includes("@vkontakte/icons")) {
        code = code.replace(/"use-client";?/g, "");
      }
      return { code };
    }
  };
}

export default defineConfig({
  base: "./",

  plugins: [
    react(),
    handleModuleDirectivesPlugin(),
    legacy({
      targets: ["defaults", "not IE 11"]
    })
  ],

  build: {
    outDir: "build"
  }
});
