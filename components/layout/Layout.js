import { Fragment } from 'react';
import MainHeader from './MainHeader';

import { useSession } from 'next-auth/react';
import classes from '../../styles/layout/Layout.module.scss';

function Layout(props) {
    const { data: session, status } = useSession();

    return (
        <Fragment>
            <MainHeader session={session} status={status} />
            <main className={classes.Layout}>{props.children}</main>
        </Fragment>
    );
}

export default Layout;
