"use strict";

const path = require("path");

module.exports = {
    resolve: {
        extensions: ['.ts', '.js', '']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript',
                query: {
                    configFileName: path.join(__dirname, "tsconfig.json")
                }
            }
        ]
    }
}