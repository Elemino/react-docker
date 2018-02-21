const pkg = require('../package');
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerSunburstPlugin = require('webpack-bundle-analyzer-sunburst').BundleAnalyzerPlugin;
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
        new HtmlPlugin({
            title: 'title',
            template: path.resolve('./app/index.html'),
            filename: path.resolve('./dist/index.html'),
            inject: true,
        }),
        new BundleAnalyzerSunburstPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,//process.env.NODE_ENV === 'production',
            generateStatsFile: true,//process.env.NODE_ENV === 'production',
            defaultSizes: 'gzip',
            reportType: 'treemap',
            reportFilename: path.resolve('./dist/stats.html'),
            statsFilename: path.resolve('./dist/stats.json'),
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
    // config.devtool = 'cheap-module-eval-sourcemap';
}
else {
    // config.devtool = 'cheap-module-sourcemap';
    config.plugins = [
        ...config.plugins,
        new CompressionPlugin(),
    ];
}