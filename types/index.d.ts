import type { Plugin } from "rollup";
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
export default function pathRewrite({
    test,
    replaceTo,
}: PathRewriteOptions): Plugin;
