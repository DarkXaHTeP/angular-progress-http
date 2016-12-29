"use strict";

module.exports = {
    devtool: "sourcemap",
    context: __dirname + "/src",
    entry: {
        bundle: "./main.ts"
    },

    output: {
        path: __dirname + "/build",
        publicPath: "",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    resolve: {
        extensions: ["", ".js", ".ts"],
        modules: ["node_modules"],
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript"
            }
        ]
    }
}
