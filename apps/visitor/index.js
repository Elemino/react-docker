import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, EmitterProvider, App } from 'reax-helpers';

import * as reducers from './reducers';
import Router, { history } from './router';

const development = process.env.NODE_ENV == 'development';

const store = createStore({ reducers, history, verbose: development, loggerCollapsed: true, loggerFilter: ['/persist'] });

const app = (
    <EmitterProvider>
        <App store={store}>
            <Router />
        </App>
    </EmitterProvider>
);

ReactDOM.render(app, document.getElementById('app'));