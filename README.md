[![Node.js CI](https://github.com/Grumaks/rollup-plugin-path-rewrite/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Grumaks/rollup-plugin-path-rewrite/actions/workflows/node.js.yml)
[![NPM version](https://img.shields.io/npm/v/rollup-plugin-path-rewrite.svg?style=flat)](https://npmjs.com/package/rollup-plugin-path-rewrite)

# rollup-plugin-path-rewrite

Rollup plugin for rewriting the output file path.
In some specific cases you may need to change/rewrite the path of a file or directory generated by Rollup. Usually you need it when using Rollup to build an ES modules library with:

```js
{
    format: "es",
    preserveModules: true
}
```

In such cases, the following plugin can be of assistance.

## Install

```console
npm install rollup-plugin-path-rewrite --save-dev
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import pathRewrite from "rollup-plugin-path-rewrite";

export default {
    input: "src/index.js",
    output: {
        dir: "dist",
        format: "es",
        preserveModules: true,
    },
    plugins: [
        // ...other plugins...
        pathRewrite({
            test: /.d.ts$/i,
            replaceTo: (path) => {
                return `types/${path}`;
            },
        }),
    ],
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

The configuration above will check all paths in the output result, and if a path corresponds to `options.test`, it will apply `options.replaceTo` to this path, thereby modifying the resulting output path.

It will produce smth like (according your file structure):

```
dist
├── types
│   ├── first.d.ts
│   ├── second
│   │   └── second.d.ts
├── ...other files/dirs
```

## Options

### `test`

Type: `RegExp`

A RegExp to match the target paths.

### `replaceTo`

Type: `RegExp`

Type: `string` | `(path: string) => string`

A string or a function that returns a new path to replace the matched (by `options.test`) paths.
