/* eslint-disable global-require */
import path from 'path';
import process from 'process';
import webpack from 'webpack';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import ManifestPlugin from 'webpack-manifest-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import nodeExternals from 'webpack-node-externals';
import LoadablePlugin from '@loadable/webpack-plugin';

const __IS_DEV__ = process.env.NODE_ENV === 'development';

const GLOBALS = {
    __IS_DEV__,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    __RELEASE__: JSON.stringify(process.env.RELEASE),
    __IS_NODE__: true
};

const SUPPORT_BROWSERS = [
    '>1%',
    'last 4 versions',
    'Firefox ESR',
    'Android 4.4',
    'ios 8',
    'not ie < 9' // React doesn't support IE8 anyway
];

const baseDir = process.cwd();

export default {
    target: 'node',
    context: baseDir,
    // entry: [path.resolve(baseDir, 'server/render.js')],
    entry: {
        index: [path.resolve(baseDir, 'client/index.js')]
    },
    externals: [nodeExternals()], // node环境下避免将npm依赖打包进bundle
    output: {
        path: path.join(baseDir, '.run/server'),
        publicPath: '/server/',
        filename: '[name].js',
        // module: 'esnext',
        chunkFilename: '[name]-server.js',
        libraryTarget: 'commonjs2' // 这里使用comminhs2 配合 getModuleFromString 获取模块导出
    },
    plugins: [new webpack.DefinePlugin(GLOBALS), new LoadablePlugin()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false,
                                corejs: '3',
                                useBuiltIns: 'usage',
                                targets: { browsers: SUPPORT_BROWSERS }
                            }
                        ],
                        '@babel/preset-react'
                    ],
                    env: {
                        debug: {
                            sourceMap: 'inline',
                            retainLines: true
                        }
                    },
                    plugins: [
                        ['import', { libraryName: 'antd', libraryDirectory: 'lib' }, 'ant'],
                        '@loadable/babel-plugin',
                        ['@babel/plugin-syntax-import-meta'],
                        ['@babel/plugin-syntax-dynamic-import'],
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        ['@babel/plugin-proposal-class-properties', { loose: true }],
                        ['@babel/plugin-proposal-object-rest-spread'],
                        ['@babel/plugin-transform-modules-commonjs'],
                        ['babel-plugin-styled-components'],
                        ['add-module-exports']
                    ]
                }
            },
            {
                test: /\.css?$/,
                use: [
                    {
                        loader: 'isomorphic-style-loader',
                        options: { sourceMap: !__IS_DEV__ }
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: !__IS_DEV__, modules: false }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: !__IS_DEV__,
                            plugins: () => [
                                postcssPresetEnv({ stage: 0 }),
                                require('postcss-flexbugs-fixes')
                            ],
                            flexbox: 'no-2009'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?(#\S*)?$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: { name: 'styles/fonts/[name].[ext]' }
            },
            {
                test: /\.(png|jp(e)?g|gif)$/,
                loader: 'file-loader',
                options: { name: 'images/[name].[ext]' }
            }
        ]
    },
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
    }
};
