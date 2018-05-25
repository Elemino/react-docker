import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, App } from 'reax-helpers';
import createStore from 'reax-helpers/src/createStore';
import App from 'reax-helpers/src/App';

import { jss } from 'react-jss';
import reset from 'jss-reset';

import * as reducers from './reducers';
import Router, { history } from './router';

jss.createStyleSheet(reset).attach();
jss.createStyleSheet({
    '@global html, body': {
        fontFamily: 'Verdana',
    },
}).attach();

const store = createStore({ reducers, history, verbose: process.env.NODE_ENV == 'development', loggerCollapsed: true, loggerFilter: ['/persist'] });

const app = (
    <React.StrictMode>
        <App store={store}>
            <Router />
        </App>
    </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('app'));