import React from 'react';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { ServerStyleSheet } from 'styled-components';

const sheet = new ServerStyleSheet();

const template = (html, css = '', js = '', link = '', inlineCss) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>react-ssr</title>
        <meta charset="UTF-8" />
        <meta http-equiv="pragma" content="no-cache" />
        <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate" />
        <meta http-equiv="Expires" content="0" />
        <link rel="shortcut icon" href="/favicon.ico">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        ${link}
        ${inlineCss}
        ${css}
    </head>
    <body>
        <div id="root">${html}</div>
    </body>
    ${js}
    </html>
    `;

const manifestJsLoader = manifest => Object.keys(manifest)
        .filter(item => item.endsWith('.js'))
        .map(item => `<script src="${manifest[item]}"></script>`)
        .join('\n');
const manifestCssLoader = manifest => Object.keys(manifest)
        .filter(item => item.endsWith('.css'))
        .map(item => `<link  rel="stylesheet" href="${manifest[item]}"/>`)
        .join('\n');

export default async function (TargetComponent, manifest, ctx, statFilePath) {
    // const js = manifestJsLoader(manifest);
    // const css = manifestCssLoader(manifest);
    //   const html = renderToString(<TargetComponent />);
    // const html = renderToString(sheet.collectStyles(<TargetComponent />));
    try {
    // if (ctx.__loadableWebStat) {
    //     nodeExtractor = new ChunkExtractor({
    //         stats: ctx.__loadableWebStat,
    //         entrypoints: ['index']
    //     });
    // }
    // console.log(statFilePath, 'statFilePath');
    // 使用代码分割需要将资源落地至磁盘
        const webExtractor = new ChunkExtractor({
            // statsFile: statFilePath,
            stats: ctx.__loadableWebStat,
            entrypoints: ['index']
        });

        // 开始
        const nodeExtractor = new ChunkExtractor({
            // statsFile: statFilePath,
            stats: ctx.__loadableServerStat,
            entrypoints: ['index']
        });
        const bundle = nodeExtractor.requireEntrypoint();
        const TestComponent = bundle({ ctx });
        const jsx1 = webExtractor.collectChunks(<TestComponent />);
        const aa1 = renderToString(sheet.collectStyles(jsx1));
        // 结束
        // const jsx = webExtractor.collectChunks(<TargetComponent />);
        // const aa = renderToString(sheet.collectStyles(jsx));
        // console.log(aa, '0>a');
        const scriptTags = webExtractor.getScriptTags(); // or extractor.getScriptElements();
        const styleTags = webExtractor.getStyleTags(); // or extractor.getLinkElements();
        const linkTags = webExtractor.getLinkTags();
        const inlineCss = sheet.getStyleTags();
        // return template(aa, styleTags, scriptTags, linkTags, inlineCss);
        return template(aa1, styleTags, scriptTags, linkTags, inlineCss);
    } catch (e) {
        console.log(e, '->ad');

        throw new Error(e);
    } finally {
    // sheet.seal();
    // return template(html, css, js, '', inlineCss);
    }
    //  finally {
    //     return template(html, css, js);
    // }
}
