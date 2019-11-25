const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
    mode: 'prodaction',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true,
                },
                sourceMap: false,
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new CleanWebpackPlugin(),
        new CompressionPlugin(),
    ],
    devtool: 'inline-source-map',
})
