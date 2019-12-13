import { action, observable } from 'mobx';
import { create, persist } from 'mobx-persist';

class HomeStore {
    constructor(ctx) {
    //   dosomething
    // console.log(ctx, '--------------->ctx');
    }

  @persist @observable aaa = undefined;

  @persist @observable loading = true;
}

let store;
export const generatorStore = (ctx) => {
    if (!store) {
        store = new HomeStore(ctx);
    }
    return store;
};

if (!__IS_NODE__) {
    const hydrate = create({
        jsonify: true // if you use AsyncStorage, here shoud be true
    });
    hydrate('_homeStore_', generatorStore()).then(() => {
        console.log('someStore has been hydrated');
        setTimeout(() => {
            generatorStore().loading = false;
        }, 100);
    });
}

export default {
    generatorStore
};
