import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.mts",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".mts", ".js", ".mjs", ".ts"],
    plugins: [
      {
        apply(resolver) {
          resolver.hooks.resolve.tapAsync(
            "CustomMjsResolver",
            (request, resolveContext, callback) => {
              if (request.request.endsWith(".mjs")) {
                const mtsPath = request.request.replace(/\.mjs$/, ".mts");
                const mtsFullPath = path.resolve(request.path, mtsPath);
                if (fs.existsSync(mtsFullPath)) {
                  request.request = mtsPath;
                }
              }
              callback();
            },
          );
        },
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.mts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.mjs$/,
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  target: "node",
  mode: "development",
};
