/* eslint-disable sort-imports */
/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { loadableReady } from '@loadable/component';
import routeConfig from './router/routes';

import HomeStore from './stores/HomeStore';
import './pages/reset.css';

function clientRender() {
    const stores = {
        homeStore: HomeStore.generatorStore()
    };

    const Entry = () => (
        <Provider {...stores}>
            <BrowserRouter>{renderRoutes(routeConfig)}</BrowserRouter>
        </Provider>
    );
    const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
    // const renderMethod = ReactDOM.hydrate;
    const render = (App) => {
        renderMethod(<App />, document.getElementById('root'));
    };

    loadableReady(() => {
        render(Entry);
        if (__IS_DEV__ && module.hot) {
            module.hot.accept();
        }
    });
}

function serverRender(locals) {
    const { ctx } = locals;
    const stores = {
        homeStore: HomeStore.generatorStore(ctx)
    };
    return () => (
        <Provider {...stores}>
            <StaticRouter location={ctx.url} sel={{ a: 1, b: 2 }} context={{}}>
                {renderRoutes(routeConfig)}
            </StaticRouter>
        </Provider>
    );
}

export default __IS_NODE__ ? serverRender : clientRender();
