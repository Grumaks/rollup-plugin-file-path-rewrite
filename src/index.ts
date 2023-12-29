import type { Plugin, RollupError } from "rollup";

export interface PathRewriteOptions {
    /**
     * A RegExp to match the target file/directory name(s).
     */
    test: RegExp;
    /**
     * A string or a function that returns a new path to replace the matched paths.
     */
    replaceTo: string | ((fileName: string) => string);
}

const PLUGIN_NAME = "path-rewrite";

export default function pathRewrite({
    test,
    replaceTo,
}: PathRewriteOptions): Plugin {
    return {
        name: PLUGIN_NAME,
        generateBundle(_options, bundle) {
            try {
                const filteredKeys = Object.keys(bundle).filter((key) => {
                    return key.match(test);
                });

                for (const key of filteredKeys) {
                    const newPath =
                        typeof replaceTo === "string"
                            ? replaceTo
                            : replaceTo(bundle[key].fileName);
                    bundle[key].fileName = newPath;
                }
            } catch (error) {
                const rollupError: RollupError = {
                    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                    message: (error as any).toString(),
                    cause: error,
                    plugin: PLUGIN_NAME,
                };

                this.error(rollupError);
            }
        },
    };
}
