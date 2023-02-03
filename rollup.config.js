let banner = `/*
* 
* logic-expression-exec v1.0.0
* 
* Copyright 2023, Caize.Chen.
* All rights reserved.
*       
*/`;

export default {
    input: "src/index.js",
    plugins: [],
    output: [
        {
            file: 'dist/logic-expression-exec.min.js',
            format: "umd",
            name: "logic-expression-exec",
            banner,
        },
        {
            file: 'lib/index.js',
            format: "cjs",
            banner,
        },
        {
            file: "es/index.js",
            format: "esm",
            banner,
        }
    ]
};