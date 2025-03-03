require("esbuild")
  .build({
    entryPoints: ["src/index.mts"],
    bundle: true,
    outfile: "dist/bundle.js",
    platform: "node",
    format: "esm",
  })
  .catch(() => process.exit(1));
