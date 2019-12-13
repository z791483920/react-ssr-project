class PubSub {
    constructor() {
        this.queue = {};
    }

    // 添加监听
    on(type, fn) {
        if (Reflect.has(this.queue, type)) {
            this.queue[type].push(fn);
        } else {
            this.queue[type] = [];
            this.queue[type].push(fn);
        }
    }

    // 发出
    async emit(type, arg) {
        if (Reflect.has(this.queue, type)) {
            // this.queue[type].forEach(async (v) => {
            //     await v({ a: 1, b: '3' });
            // });
            for await (const item of this.queue[type]) {
                await item(arg);
            }
        } else {
            throw new Error(`type ${type} is not exist`);
        }
    }

    // 移除
    remove(type, fn) {
        if (Reflect.has(this.queue, type)) {
            this.queue[type] = this.queue[type].filter(v => v !== fn);
        } else {
            throw new Error(`${type} is not exist`);
        }
    }
}

export default PubSub;
