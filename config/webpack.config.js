const pkg = require('../package');
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html5-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const NotifierPlugin = require('webpack-notifier');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = module.exports = {
    profile: true,
    entry: {
        index: path.resolve('./app/index.js'),
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath: '/dist',
    },
    module: {
        rules: [{
            test: /\.(js|jsx|mjs)$/i,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            }],
        },{
            test: /\.(woff|woff2|ttf|eot)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'dist/assets/fonts/[name].[ext]?hash=[hash]',
                },
            }],
        },{
            test: /\.(jpg|jpeg|png|gif|svg)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 8192,
                    name: 'dist/assets/images/[name].[ext]?hash=[hash]',
                },
            },{
                loader: 'img-loader',
                options: {
                    enabled: process.env.NODE_ENV !== 'development',
                    gifsicle: {
                        interlaced: false
                    },
                    mozjpeg: {
                        progressive: true,
                        arithmetic: false
                    },
                    optipng: false,
                    pngquant: {
                        quality: 80,
                    },
                    svgo: {
                        plugins: [
                            { removeTitle: true },
                            { convertPathData: false }
                        ],
                    },
                },
            }]
        }],
    },
    plugins: [
        new CaseSensitivePlugin(),
        new CleanPlugin(['./dist'], {
            root: path.resolve('./'),
            verbose: true
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new HtmlPlugin({
            title: pkg.name,
            input: path.resolve('./app/index.html'),
            output: path.resolve('./dist/index.html'),
            minify: process.env.NODE_ENV !== 'development',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: process.env.NODE_ENV === 'production',
            defaultSizes: 'gzip',
            reportFilename: path.resolve('./dist/stats.html'),
        }),
        new NotifierPlugin({
            title: pkg.name,
            alwaysNotify: true,
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080/',
        }),
    ],
};

if(process.env.NODE_ENV === 'development') {
    config.devtool = 'eval-sourcemap';
}
else {
    config.devtool = 'sourcemap';
    config.plugins = [
        ...config.plugins,
        new CompressionPlugin(),
    ];
}