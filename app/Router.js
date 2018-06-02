import React from 'react';
import PropTypes from 'prop-types';

import Layout from './components/Layout';
import Home from './components/Home';
import List from './components/List';

export default class Router extends React.PureComponent {
    componentDidMount = () => console.log('mounted', this.constructor.name);

    componentWillUnmount = () => console.log('unmounting home', this.constructor.name);

    render = () => {
        console.log('rendering', this.constructor.name);

        const pathname = window.location.pathname;

        const pathnameToComponent = {
            '/': Home,
            '/list': List,
        };

        const Component = pathnameToComponent[pathname];

        return (
            <Layout>
                <Component />
            </Layout>
        );
    }
}
