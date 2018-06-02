import { name } from '../../package';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import cx from 'classnames';
import injectSheet from 'react-jss';

@injectSheet(theme => ({
    root: {
        textAlign: 'center',
    },
}))
export default class List extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    componentDidMount = () => console.log('mounted', this.constructor.name);

    componentWillUnmount = () => console.log('unmounting home', this.constructor.name);

    render = () => {
        console.log('rendering', this.constructor.name);

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Helmet>
                    <title>List | {name}</title>
                    <link rel={'canonical'} href={'http://mysite.com/example'} />
                    <meta name={'apple-mobile-web-app-title'} content={name} />
                    <meta name={'application-name'} content={name} />
                </Helmet>

                <div className={classes.root}>
                    <h1>List</h1>
                    <a href={'/'}>Move to home</a>
                </div>
            </React.Fragment>
        );
    };
}