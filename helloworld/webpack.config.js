const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.mts", // Din huvudfil
  target: "node", // Target för Node.js
  externals: [nodeExternals()], // Exkluderar node_modules
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".mts", ".ts", ".js"], // Stöd för TypeScript
  },
  module: {
    rules: [
      {
        test: /\.mts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  experiments: {
    outputModule: true, // Om du använder ES Modules (MTS-filer)
  },
};
