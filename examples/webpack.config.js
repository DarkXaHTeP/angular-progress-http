"use strict";

const path = require("path");

module.exports = {
    devtool: "sourcemap",
    context: path.join(__dirname, "src"),
    entry: {
        bundle: "./main.ts"
    },

    output: {
        path: path.join(__dirname, "build"),
        publicPath: "",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    resolve: {
        extensions: ["", ".js", ".ts"]
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript",
                query: {
                    configFileName: path.join(__dirname, "tsconfig.json")
                }
            }
        ]
    }
}
