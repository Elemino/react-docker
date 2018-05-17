import { name } from '../../package';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

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
export default class Home extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    componentDidMount = () => {
        console.log('mounted home');
    };

    componentWillUnmount = () => {
        console.log('unmounting home');
    };

    render = () => {
        const { classes } = this.props;

        console.log('rendering home');

        return (
            <React.Fragment>
                <Helmet>
                    <title>Home | {name}</title>
                    <link rel={'canonical'} href={'http://mysite.com/example'} />
                    <meta name={'apple-mobile-web-app-title'} content={name} />
                    <meta name={'application-name'} content={name} />
                </Helmet>

                <div className={classes.root}>
                    <Typography component={'h1'} gutterBottom={true}>Home</Typography>
                    <Button size={'small'} variant={'raised'} component={Link} to={'/list'}>Move to list</Button>
                </div>
            </React.Fragment>
        );
    };
}
