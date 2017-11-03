const path = require('path');
let basepath = __dirname;
const webpack = require('webpack');



module.exports = env => {
    console.log("env:", env);
    let config = {
        entry: './src/view/index.js',
        output: {
            path: path.join(basepath, 'dest'),
            filename: 'index.bundle.js'
        },
        module: {
            loaders: [{
                test: /\.js$/,
                include: [/src/, /node_modules\/pick-random/],
                loader: 'babel-loader'
            }]
        }
    };

    if (env && env.prod) {
        config.plugins = [new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        })];
    } else {
        config.devtool = "source-map";
    }

    return config;
};