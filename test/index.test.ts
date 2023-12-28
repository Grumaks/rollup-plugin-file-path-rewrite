import rollup from "rollup";
import pathRewrite, { PathRewriteOptions } from "../src";

const generate = async (options: PathRewriteOptions) => {
    const bundle = await rollup.rollup({
        input: "test/fixtures/index.mjs",
        plugins: [pathRewrite(options)],
    });
    const { output } = await bundle.generate({
        format: "es",
        preserveModules: true,
    });

    return output;
};

const findByFileName = (value: string) => {
    return ({ fileName }: { fileName: string }) => {
        return fileName === value;
    };
};

describe("Testing", () => {
    it("Rewrite path using string replacement", async () => {
        const result = await generate({
            test: /^dirA/i,
            replaceTo: "dirC/moduleA.js",
        });

        expect(result.find(findByFileName("index.js"))).toBeDefined();
        expect(result.find(findByFileName("dirC/moduleA.js"))).toBeDefined();
        expect(result.find(findByFileName("dirB/moduleB.js"))).toBeDefined();
    });

    it("Rewrite path using function replacement", async () => {
        const result = await generate({
            test: /(module)([a-zA-Z]+)(.js)$/i,
            replaceTo: (fileName) => {
                return fileName.replace(
                    // make "moduleX" -> "module-X"
                    /(module)([a-zA-Z]+)(.js)$/i,
                    "$1-$2$3"
                );
            },
        });

        expect(result.find(findByFileName("index.js"))).toBeDefined();
        expect(result.find(findByFileName("dirA/module-A.js"))).toBeDefined();
        expect(result.find(findByFileName("dirB/module-B.js"))).toBeDefined();
    });
});
