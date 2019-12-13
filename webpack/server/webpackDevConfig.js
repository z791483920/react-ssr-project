import cloneDeep from 'lodash/cloneDeep';
import webpackMerge from 'webpack-merge';
import WriteFilePlugin from 'write-file-webpack-plugin';
import webpackBaseConfig from './webpackBaseConfig';

const baseConfig = cloneDeep(webpackBaseConfig);

export default webpackMerge.smart(baseConfig, {
    mode: 'development',
    plugins: [new WriteFilePlugin()]
});
