"use strict";

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
                    configFileName: `${__dirname}/examples/tsconfig.json`
                }
            }
        ]
    }
}