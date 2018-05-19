import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Nav from './Nav';

@withRouter
@withStyles(theme => ({}))
@connect((state, props) => ({}))
export default class Layout extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        classes: PropTypes.object.isRequired,
    };

    render = () => {
        const { children, classes } = this.props;

        return (
            <React.Fragment>
                <Nav />
                {children}
            </React.Fragment>
        );
    };
}