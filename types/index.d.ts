import type { Plugin } from "rollup";
export interface PathRewriteOptions {
    /**
     * A RegExp to match the target file/directory name(s).
     */
    test: RegExp;
    /**
     * A string or a function that returns a string to replace the matched file/directory name(s).
     */
    replaceTo: string | ((fileName: string) => string);
}
export default function pathRewrite({ test, replaceTo, }: PathRewriteOptions): Plugin;
