class Observer {
    constructor(name) {
        this.name = name;
    }

    domething() {
        console.log(`我是 ${this.name} 我在监听 dosomething`);
    }
}

export class Subject {
    constructor() {
        this.observes = [];
    }

    listen(fn) {
        this.observes.push(fn);
    }

    remove(fn) {
        this.observes = this.observes.filter(v => v !== fn);
    }

    notify(arg) {
        this.observes.forEach((v) => {
            v.domething(arg);
        });
    }
}

export default Observer;
