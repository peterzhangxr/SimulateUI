/**
 * Created by peterzhang on 2018/3/22.
 */
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const _widget = path.resolve(__dirname, '../src/widget')

const plugins = (() => {
    let plugins = [];

    plugins.push(new CleanWebpackPlugin(['dist', 'docs'], {
        root: path.resolve(__dirname, '../')
    }));

    //处理模版文件
    plugins.push(new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../src/index.html')
    }));

    let widgetFiles = glob.sync(_widget + '/*.html')
    widgetFiles.forEach((filePath) => {
        let filename = filePath.replace(_widget + '/', '');
        plugins.push(new HtmlWebpackPlugin({
            filename: filename,
            template: filePath
        }))
    })

    return plugins;
})();

const config = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../docs'),
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
    plugins: plugins
}

module.exports = config;
