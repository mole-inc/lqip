import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
const pkg = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: {
      name: "index",
      file: pkg.browser,
      format: "umd"
    },
    external: ["sharp"],
    plugins: [resolve(), json(), commonjs(), typescript()]
  },
  {
    input: "src/index.ts",
    plugins: [commonjs(), typescript()],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ]
  }
];
