import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

let banner = `/*
* 
* logic-expression-exec v1.0.0
* 
* Copyright 2023, Caize.Chen.
* All rights reserved.
*       
*/`;


let input = "src/index.js";

export default [
    {
        input,
        plugins: [
            resolve(),
            babel({
                exclude: "node_modules/**"
            }),
            terser(),
        ],
        output: {
            file: 'dist/logic-expression-exec.min.js',
            format: "umd",
            name: "logic-expression-exec",
            banner,
        }
    },
    {
        input,
        plugins: [
            resolve(),
            babel({
                exclude: "node_modules/**"
            }),
        ],
        output: {
            file: 'lib/index.js',
            format: "cjs",
            banner,
        }
    },
    {
        input,
        plugins: [
            resolve(),
            babel({
                exclude: "node_modules/**"
            }),
        ],
        output: {
            file: "es/index.js",
            format: "esm",
            banner,
        }
    },
]