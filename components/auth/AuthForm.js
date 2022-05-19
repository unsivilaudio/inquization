import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import classes from '../../styles/auth/AuthForm.module.scss';
import Button from '../ui/Button';

async function createUser(email, password) {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'something went wrong!');
    }

    return data;
}

function AuthForm() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    function switchAuthModeHandler() {
        setIsLogin(prevState => !prevState);
    }

    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (isLogin) {
            const result = await signIn('credentials', {
                redirect: false,
                email: enteredEmail,
                password: enteredPassword,
            });
            if (!result.error) {
                router.replace('/profile');
            }
        } else {
            try {
                const result = await createUser(enteredEmail, enteredPassword);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
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
                        ref={emailInputRef}
                    />
                </div>
                <div className={classes.FormControl}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.Actions}>
                    <Button type='submit'>
                        {isLogin ? 'Login' : 'Create Account'}
                    </Button>
                    <p
                        className={classes.Toggle}
                        onClick={switchAuthModeHandler}>
                        {isLogin
                            ? 'Create new account'
                            : 'Login with existing account'}
                    </p>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;
