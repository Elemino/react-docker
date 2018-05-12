import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, EmitterProvider, App } from 'reax-helpers';

import * as reducers from './reducers';
import Router, { history } from './router';

const development = process.env.NODE_ENV == 'development';

const store = createStore({ reducers, history, verbose: development, loggerCollapsed: true, loggerFilter: ['/persist'] });

const app = (
    <React.StrictMode>
        <App store={store}>
            <Router />
        </App>
    </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('app'));