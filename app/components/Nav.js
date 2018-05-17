import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { NavLink, withRouter } from 'react-router-dom'

import { withStyles } from 'material-ui/styles';
import cx from 'classnames';

@withRouter
@withStyles(theme => ({
    root: {
        textAlign: 'center',
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    selectedLink: {
        '& > *': {
            textDecoration: 'underline',
        },
    },
    li: {
        display: 'inline-block',
        padding: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
    },
}))
export default class Nav extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render = () => {
        const { classes } = this.props;

        return (
            <ul className={cx(classes.root)}>
                <NavLink to={'/'} className={classes.link} activeClassName={classes.selectedLink} exact={true} strict={true}>
                    <li className={cx(classes.li)}>Home</li>
                </NavLink>
                <NavLink to={'/list'} className={classes.link} activeClassName={classes.selectedLink} exact={true} strict={true}>
                    <li className={cx(classes.li)}>List</li>
                </NavLink>
            </ul>
        );
    }
}