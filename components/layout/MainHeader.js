import Link from 'next/link';
import { signOut } from 'next-auth/react';

import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import classes from '../../styles/layout/MainHeader.module.scss';

export default function MainHeader({ currentUser }) {
    console.log(currentUser);

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
                    {!currentUser && (
                        <li>
                            <Link href='/auth'>Login</Link>
                        </li>
                    )}
                    {currentUser && (
                        <>
                            <li>
                                <Link href='/profile'>Profile</Link>
                            </li>
                            <li>
                                <Button theme='invert' onClick={logoutHandler}>
                                    Logout
                                </Button>
                            </li>
                            {currentUser.role === 'edit' && (
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
                {currentUser
                    ? `Signed in as: ${currentUser.email}`
                    : 'Not Signed In'}
            </div>
        </header>
    );
}
