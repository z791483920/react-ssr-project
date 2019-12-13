import path from 'path';
import webpackMerge from 'webpack-merge';
import cloneDeep from 'lodash/cloneDeep';
import commandLineArgs from 'command-line-args';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import StatsPlugin from 'stats-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import _ from 'lodash';

import webpackBaseConfig from './webpackBaseConfig';

const baseDir = process.cwd();

const HASH_LENGTH = 8;

const optionDefinitions = [
    { name: 'analyze', type: Boolean, defaultValue: false },
    { name: 'stats', type: Boolean, defaultValue: false }
];
const options = commandLineArgs(optionDefinitions);
const baseConfig = cloneDeep(webpackBaseConfig);
const plugins = [
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.join(baseDir, 'build/server')]
    })
];

if (options.analyze) {
    plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: '8888',
            openAnalyzer: false
        })
    );
}

if (options.stats) {
    plugins.push(new StatsPlugin('stats.json', { chunkModules: true }));
}

let finalConfig = baseConfig; // eslint-disable-line import/no-mutable-exports

// Merge common configuration
finalConfig = webpackMerge(finalConfig, {
    parallelism: 1,
    profile: options.stats
});

// Merge plugins
finalConfig = webpackMerge({
    customizeArray(a, b, key) {
        if (key === 'plugins') {
            return _.uniqBy(
                [...b, ...a],
                plugin => plugin.constructor || plugin.constructor.name
            );
        }

        return undefined;
    }
})(finalConfig, { plugins });

// Merge loaders
finalConfig = webpackMerge.smart(finalConfig, {
    output: {
        path: path.join(baseDir, 'build/server')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?(#\S*)?$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: `styles/fonts/[name].[hash:${HASH_LENGTH}].[ext]`,
                    emitFile: false
                }
            },
            {
                test: /\.(png|jp(e)?g|gif)$/,
                exclude: /node_modules\/(?!(pdfjs-dist)\/).*/,
                loader: 'file-loader',
                options: {
                    name: `images/[name].[hash:${HASH_LENGTH}].[ext]`,
                    emitFile: false
                }
            }
        ]
    }
});

export default finalConfig;
