import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

@withStyles(theme => ({
    root: {
        textAlign: 'center',
    },
}))
@connect((state, props) => ({ }))
export default class List extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    componentWillMount = () => {
        console.log('mounting list');
    };

    componentWillUnmount = () => {
        console.log('unmounting list');
    };

    render = () => {
        const { classes } = this.props;

        console.log('rendering list');

        return (
            <div className={classes.root}>
                <Typography component={'h1'} gutterBottom={true}>List</Typography>
                <Button size={'small'} variant={'raised'} component={Link} to={'/'}>Move to home</Button>
            </div>
        );
    };
}