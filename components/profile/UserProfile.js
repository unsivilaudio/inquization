import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

import ProfileForm from './ProfileForm';
import classes from '../../styles/profile/UserProfile.module.scss';

function UserProfile() {
    const [isLoading, setIsloading] = useState();

    useEffect(() => {
        getSession().then(session => {
            if (!session) {
                window.location.href = '/auth';
            } else {
                setIsloading(false);
            }
        });
    }, []);

    if (isLoading) {
        return <p className={classes.profile}> Loading...</p>;
    }

    async function changePasswordHandler(passwordData) {
        const response = await fetch('/api/user/change-password', {
            method: 'PATCH',
            body: JSON.stringify(passwordData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(data);
    }

    return (
        <section className={classes.UserProfile}>
            <h1>Change Your Password</h1>
            <ProfileForm onChangePassword={changePasswordHandler} />
        </section>
    );
}

export default UserProfile;
