/**
 * Created by peterzhang on 2018/3/22.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../docs'),
        publicPath: './'
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../docs')
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: [
                'file-loader'
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['docs']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new HtmlWebpackPlugin({
            filename: 'button.html',
            template: path.resolve(__dirname, '../src/widget/button.html')
        })
    ]
}

module.exports = config;
