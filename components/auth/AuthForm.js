import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';

import axios from '../../helpers/with-axios';
import Button from '../ui/Button';
import classes from '../../styles/auth/AuthForm.module.scss';

async function createUser(email, password) {
    return await axios.post('/auth/signup', {
        email,
        password,
    });
}

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    function switchAuthModeHandler() {
        setIsLogin(prevState => !prevState);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleChangePasswordConfirm(e) {
        setPasswordConfirm(e.target.value);
    }

    async function submitHandler(event) {
        event.preventDefault();

        if (!isLogin && password !== passwordConfirm) {
            return;
        }

        try {
            if (!isLogin) {
                await createUser(email, password);
            }

            await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className={classes.AuthForm}>
            <div className={classes.Header}>
                {isLogin ? 'Login' : 'Sign up'}
            </div>
            <form onSubmit={submitHandler}>
                <div className={classes.FormControl}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        required
                        onChange={handleChangeEmail}
                        value={email}
                    />
                </div>
                <div className={classes.FormControl}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        onChange={handleChangePassword}
                        value={password}
                    />
                </div>
                {!isLogin && (
                    <div className={classes.FormControl}>
                        <label htmlFor='passwordConfirm'>
                            Confirm Password
                        </label>
                        <input
                            type='password'
                            id='passwordConfirm'
                            required
                            onChange={handleChangePasswordConfirm}
                            value={passwordConfirm}
                        />
                    </div>
                )}
                <div className={classes.Actions}>
                    <Button type='submit'>
                        {isLogin ? 'Login' : 'Create Account'}
                    </Button>
                    <p
                        className={classes.Toggle}
                        onClick={switchAuthModeHandler}>
                        {isLogin
                            ? 'Create new account'
                            : 'Already signed up? Switch to login'}
                    </p>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;
