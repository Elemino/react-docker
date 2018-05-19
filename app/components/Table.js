import { name } from '../../package';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import VirtualList from 'react-tiny-virtual-list';
import { range } from 'lodash-es';

import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const theadHeight = 50;
const tbodyHeight = 250;
const rowHeight = 50;

@withStyles(theme => ({
    root: {
        width: '100%',
        height: 300,
    },
    table: {
        display: 'grid',
        height: '100%',
        width: '100%',
    },
    thead: {
        height: theadHeight,
        fontWeight: 'bold',
    },
    tbody: {
        height: tbodyHeight,
        overflow: 'scroll',
    },
    row: {
        boxSizing: 'border-box',
        border: '1px solid black',
        display: 'grid',
        gridTemplateRows: 'repeat(auto-fill, 48px)',
        gridAutoColumns: 'min-content',
        gridTemplateColumns: 'repeat(auto-fit, minmax(1px, 1fr))',
        '& > div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid green',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
    },
}))
@connect((state, props) => ({ }))
export default class List extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    items = range(1, 100).map(value => Math.random());

    componentDidMount = () => {
        console.log('mounted list');
    };

    componentWillUnmount = () => {
        console.log('unmounting list');
    };

    render = () => {
        const { classes } = this.props;
        const { items } = this;

        return (
            <div className={classes.root}>
                <div className={classes.table}>
                    <div className={classes.thead}>
                        <div className={classes.row}>
                            <div>One</div>
                            <div>Two</div>
                            <div>Three</div>
                            <div>Four</div>
                            <div>Five</div>
                        </div>
                    </div>

                    <VirtualList
                        className={classes.tbody}
                        height={tbodyHeight}
                        itemSize={rowHeight}
                        itemCount={items.length}
                        renderItem={this.renderItem}
                    />
                </div>
            </div>
        );
    };

    renderItem = ({ index, style }) => {
        const { classes } = this.props;
        const { items } = this;

        return (
            <div key={index} className={classes.row}>
                <div>#{index}</div>
                <div>{items[index]}</div>
                <div>{items[index]}</div>
                <div>{items[index]}</div>
                <div>{items[index]}</div>
            </div>
        );
    };
}