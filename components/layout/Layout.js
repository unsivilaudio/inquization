import { Fragment } from 'react';
import MainHeader from './MainHeader';

import classes from '../../styles/layout/Layout.module.scss';

function Layout(props) {
    return (
        <Fragment>
            <MainHeader />
            <main className={classes.Layout}>{props.children}</main>
        </Fragment>
    );
}

export default Layout;
