import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import injectSheet from 'react-jss';

import Nav from './Nav';

@injectSheet(theme => ({ }))
export default class Layout extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node,
        classes: PropTypes.object.isRequired,
    };

    componentDidMount = () => console.log('mounted', this.constructor.name);

    componentWillUnmount = () => console.log('unmounting home', this.constructor.name);

    render = () => {
        console.log('rendering', this.constructor.name);

        const { children, classes } = this.props;

        return (
            <React.Fragment>
                <Nav />
                <div className={classes.dynamic}>
                    {children}
                </div>
            </React.Fragment>
        );
    };
}