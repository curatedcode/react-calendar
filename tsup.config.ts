import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  minify: process.env.NODE_ENV === "development",
  format: ["esm", "cjs"],
  outDir: "dist",
  target: "es2016",
  dts: true,
  clean: true,
  sourcemap: true,
});
