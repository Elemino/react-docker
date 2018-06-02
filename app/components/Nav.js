import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import injectSheet from 'react-jss';

@injectSheet(theme => ({
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
            color: theme.navEntryColor,
        },
    },
    li: {
        display: 'inline-block',
        padding: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
    },
}))
export default class Nav extends React.PureComponent {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    componentDidMount = () => console.log('mounted', this.constructor.name);

    componentWillUnmount = () => console.log('unmounting home', this.constructor.name);

    render = () => {
        console.log('rendering', this.constructor.name);

        const { classes } = this.props;

        return (
            <ul className={cx(classes.root)}>
                <a href={'/'} className={classes.link, cx({ [classes.selectedLink]: window.location.pathname === '/' })}>
                    <li className={cx(classes.li)}>Home</li>
                </a>
                <a href={'/list'} className={classes.link, cx({ [classes.selectedLink]: window.location.pathname === '/list' })}>
                    <li className={cx(classes.li)}>List</li>
                </a>
            </ul>
        );
    }
}