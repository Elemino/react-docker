import React from 'react';
import ReactDOM from 'react-dom';

import { jss, ThemeProvider } from 'react-jss';
import reset from 'jss-reset';

import Router from './Router';

jss.createStyleSheet(reset).attach();
jss.createStyleSheet({
    '@global html, body': {
        fontFamily: 'Verdana',
    },
}).attach();

const theme = {
    navEntryColor: '#a45',
};

const App = () => (
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Router />
        </ThemeProvider>
    </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('app'));