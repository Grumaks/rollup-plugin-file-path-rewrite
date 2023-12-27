import typescript from "@rollup/plugin-typescript";
import * as fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json"));

export default {
    input: "src/index.ts",
    output: [
        { file: pkg.main, format: "cjs", sourcemap: true },
        { file: pkg.module, format: "es", sourcemap: true },
    ],
    plugins: [typescript({ sourceMap: true })],
    external: Object.keys({
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    }),
};
