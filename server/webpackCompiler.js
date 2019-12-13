import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import path from 'path';
import MemoryFs from 'memory-fs';
import fs from 'fs';
import Router from 'koa-router';
import staticCache from 'koa-static-cache';
import webpackClientConfig from '../webpack/client/webpackDevConfig';
import webpackServerConfig from '../webpack/server/webpackDevConfig';
import render from './render';
import getModuleFromString from './getModuleFromString';

export const clientCompiler = webpack(webpackClientConfig);
export const serverCompiler = webpack(webpackServerConfig);

const baseDir = process.cwd();
const mfs = new MemoryFs();

let bundle;
// const bundle = function () {};

let statsFile;
const router = new Router();

function clientCompile(app) {
    new webpack.ProgressPlugin().apply(clientCompiler);
    app.use(
        webpackDevMiddleware(clientCompiler, {
            lazy: false,
            quiet: false,
            noInfo: false,
            stats: { colors: true },
            serverSideRender: true,
            // writeToDisk: true,
            publicPath: webpackClientConfig.output.publicPath,
            historyApiFallback: true
        })
    );
    // clientWa.close((stat) => {
    //     console.log(stat, '---->dsad--->clientWa.close');
    // });
    // app.use(async (ctx, next) => {
    //     await next();
    // });
    app.use(webpackHotMiddleware(clientCompiler));
}

function serverCompile() {
    // serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch(
        {
            aggregateTimeout: 300, // 防止重复按键
            poll: 100, // 监测修改的时间(ms)
            ignored: /node_modules/
        },
        (err, stats) => {
            if (err) {
                return console.error(err);
            }
            if (stats.hasErrors()) {
                return console.error(err, 'serverCompile.watch stats.hasErrors()');
            }
            const serverStats = stats.toJson();

            // console.log(serverStats, 'serverStatsserverStatsserverStatsserverStats');
            // 编译到内存的路径
            const renderPath = path.join(
                serverStats.outputPath,
                serverStats.assetsByChunkName.index
            );
            console.log('commier');
            // 获取代码串 第一种方法
            // 读取内容并转成String类型
            // const content = mfs.readFileSync(renderPath, 'utf-8').toString();
            // 因为读取的是js文件，所以直接执行可以获取到输出的内容
            // new Function 找不到module 所以改用eval，由于在后端所以避免了风险
            // bundle = eval(content).default ? eval(content).default : eval(content);

            // 获取代码串 第二种方法
            // const content = mfs.readFileSync(renderPath, 'utf-8').toString();
            const content = fs.readFileSync(renderPath, 'utf-8').toString();

            // const content = fs.readFileSync(renderPath, 'utf-8');
            // const content = fs.readFileSync(renderPath, 'utf-8');
            // bundle = getModuleFromString(content, 'index.js');
            bundle = getModuleFromString(content, renderPath);
            // console.log('1111getModuleFromString');
            // bundle = JSON.parse(readFile(mfs, 'server-bundle.json'));
            // mfs.readFileSync(path.join(clientConfig.output.path, fileName), 'utf-8');
        }
    );
}

// function serverCompileTest(app) {
//     // serverCompiler.outputFileSystem = mfs;
//     app.use(
//         webpackDevMiddleware(serverCompiler, {
//             lazy: false,
//             quiet: false,
//             noInfo: false,
//             serverSideRender: true,
//             writeToDisk: true,
//             publicPath: webpackServerConfig.output.publicPath
//         })
//     );
//     app.use(async (ctx, next) => {
//         console.log(ctx, '---->sd--------------------<>');
//         await next();
//     });
// }
function setResourceConfiguration(app) {
    app.use(async (ctx, next) => {
    // const manifestPath = path.join(baseDir, 'server/views/manifest.json');
        const manifestPath = path.join(
            webpackClientConfig.output.path,
            'manifest.json'
        );
        ctx.__assets = JSON.parse(
            clientCompiler.outputFileSystem.readFileSync(manifestPath)
        );
        // ctx.__assets = JSON.parse(fs.readFileSync(manifestPath));

        ctx.__loadableWebStat = JSON.parse(
            // clientCompiler.outputFileSystem.readFileSync(
            //     path.resolve(webpackClientConfig.output.path, 'loadable-stats.json')
            // )
            fs.readFileSync(
                path.resolve(webpackClientConfig.output.path, 'loadable-stats.json')
            )
        );
        ctx.__loadableServerStat = JSON.parse(
            // serverCompiler.outputFileSystem.readFileSync(
            //     path.resolve(webpackServerConfig.output.path, 'loadable-stats.json')
            // )
            fs.readFileSync(
                path.resolve(webpackServerConfig.output.path, 'loadable-stats.json')
            )
        );

        await next();
    });
}
function getTransformModule(ctx) {
    return bundle({ ctx });
}
export default async (app) => {
    await clientCompile(app);
    // await serverCompileTest(app);
    await serverCompile(app);
    await setResourceConfiguration(app);
    router.get('/*', async (ctx, next) => {
        await next();
        ctx.body = await render(
            getTransformModule(ctx),
            ctx.__assets,
            ctx,
            path.join(webpackClientConfig.output.path, 'loadable-stats')
        );
    });
    app.use(router.routes());
};
