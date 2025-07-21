import { peerDependencies, name } from "./package.json";

import { defineConfig } from "vite";

import svgr from "@svgr/rollup";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // SVGO is disabled because it messes up with some icons by removing intermediate tags.
    svgr({ icon: true, svgo: false }),
    tsConfigPaths(),
  ],

  build: {
    lib: {
      entry: {
        mui: "src/mui/index.tsx",
        "mui/components": "src/mui/components/index.ts",
        storybook: "src/storybook/index.ts",
        "tanstack/form": "src/tanstack/form/index.ts",
        "tanstack/start": "src/tanstack/start/index.ts",
        translations: "src/translations/index.ts",
      },
      name,
      formats: ["es"],
      fileName: (format, entryName) =>
        entryName === "index" ? `${entryName}.${format}.js` : `${entryName}/${entryName}.${format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      external: Object.keys(peerDependencies),
    },
  },
});
