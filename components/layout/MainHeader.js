import Link from 'next/link';
import { signOut } from 'next-auth/react';

import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import classes from '../../styles/layout/MainHeader.module.scss';

export default function MainHeader({ session }) {
    function logoutHandler() {
        signOut({ callbackUrl: '/' });
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
                    <li>
                        <ThemeToggle />
                    </li>
                    {!session?.user && (
                        <li>
                            <Link href='/auth'>Login</Link>
                        </li>
                    )}
                    {session?.user && (
                        <>
                            <li>
                                <Link href='/profile'>Profile</Link>
                            </li>
                            <li>
                                <Button theme='invert' onClick={logoutHandler}>
                                    Logout
                                </Button>
                            </li>
                            {session.user.role === 'edit' && (
                                <li>
                                    <Link href='/quiz/create'>Create</Link>
                                </li>
                            )}
                            <li>
                                <Link href='/quiz'>Browse All Quiz</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <div className={classes.UserInfo}>
                {session?.user
                    ? `Signed in as: ${session.user.email}`
                    : 'Not Signed In'}
            </div>
        </header>
    );
}
