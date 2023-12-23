import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { version } from "./package.json";

import * as child from "child_process";

const commitHash = child.execSync("git rev-parse --short HEAD").toString();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
});
