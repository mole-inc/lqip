import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
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
    plugins: [resolve(), commonjs(), typescript()]
  },
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    external: ["sharp"],
    plugins: [typescript()],
  }
];
