class TestPlugin {
    // 在构造函数中获取用户给该插件传入的配置
    constructor({ success, failed }) {
        this.successCallback = success;
        this.failedCallback = failed;
        this.time = 0;
    }

    static getUsePlugins(compiler) {
    // 当前配置所有使用的插件列表
        const { plugins } = compiler.options;
        return plugins;
    }

    // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
    apply(compiler) {
        const getPlugins = TestPlugin.getUsePlugins(compiler);
        compiler.hooks.emit.tapAsync(
            'TestPlugin',
            async (compilation, callback) => {
                const userInfo = {
                    author: 'zengyang',
                    email: 'zengyang@zy.com',
                    homepage: 'test'
                };
                const { assets } = compilation;
                Object.keys(assets)
                    .filter(v => /(css|js)$/.test(v))
                    .forEach((e) => {
                        let source = assets[e].source();
                        const info = [];
                        info.push(`@Author: ${userInfo.author}`);
                        info.push(`@Email: ${userInfo.email}`);
                        info.push(`@Homepage: ${userInfo.homepage}`);
                        if (info.length) {
                            info.push(`@Date: ${new Date()}`);
                            source = `/*\n  ${info.join('\n\n  ')}\n*/\n${source}`;
                        }

                        compilation.assets[e].source = () => source;
                        compilation.assets[e].size = () => source.size;
                    });
                callback();
            }
        );

    // compiler.hooks.emit.tapPromise('TestPlugi23n1', (compilation) => {
    //     console.log('1111emitemitemit---->TestPlugi23n1');
    //     return new Promise((bbbbb) => {
    //         setTimeout(() => {
    //             console.log('1111emitemitemit---->TestPlugi23n1,11111');
    //             bbbbb('11111');
    //         }, 10000);
    //     });
    // });
    // compiler.hooks.emit.tapPromise('TestPlugi23n11111', (compilation) => {
    //     console.log('1111emitemitemit---TestPlugi23n11111');
    //     return new Promise((bbbbb) => {
    //         setTimeout(() => {
    //             console.log('1111emitemitemit---TestPlugi23n22222');
    //             bbbbb('22222');
    //         }, 13000);
    //     });
    // });
    }
}

export default TestPlugin;
