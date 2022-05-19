import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import Button from '../ui/Button';
import classes from '../../styles/layout/MainHeader.module.scss';

function MainHeader() {
    const router = useRouter();
    const { data: session, status } = useSession();

    function logoutHandler() {
        signOut();
        router.push('/');
    }
    return (
        <header className={classes.MainHeader}>
            <Link href='/'>
                <div className={classes.Logo}>
                    <p>The great</p>
                    <p>
                        in<span>quiz</span>ation
                    </p>
                </div>
            </Link>
            <nav className={classes.Navigation}>
                <ul>
                    {!session && !status.loading && (
                        <li>
                            <Link href='/auth'>Login</Link>
                        </li>
                    )}
                    {session && (
                        <>
                            <li>
                                <Link href='/profile'>Profile</Link>
                            </li>
                            <li>
                                <Button theme='invert' onClick={logoutHandler}>
                                    Logout
                                </Button>
                            </li>
                            <li>
                                <Link href='/quiz/create'>Create</Link>
                            </li>
                            <li>
                                <Link href='/quiz'>Browse All Quiz</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default MainHeader;
