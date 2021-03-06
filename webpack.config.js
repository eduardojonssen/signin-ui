var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    //devtool: 'source-map',
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
            {
                test: /\.css$/,
                include: [/node_modules/, SRC_DIR],
                use: ExtractTextPlugin.extract({
                     fallback: 'style-loader', use: 'css-loader'
                })
            },
            {
                test: /\.(woff|woff2)$/,
                use: "url-loader"
            },
            {
                test: /\.(ttf|eot|svg)$/,
                use: "file-loader"
            },
            {
                test: /bootstrap\/dist\/js\//,
                use: "imports-loader?jQuery=jquery"
            }
        ]
    },
    plugins: [
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compressor: {
        //         warnings: false
        //     }
        // }),
        new ExtractTextPlugin('style.css'),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
    ]
};

module.exports = config;