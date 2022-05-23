import { getSession } from 'next-auth/react';

import PasswordChange from '../../components/profile/PasswordChange';
import Quizzes from '../../components/profile/Quizzes';
import { getQuizByUser } from '../../helpers/api-util';
import classes from '../../styles/pages/Profile.module.scss';

function ProfilePage(props) {
    return (
        <div className={classes.Profile}>
            <div className={classes.Header}>Your Profile</div>
            <PasswordChange />
            <Quizzes data={props.quizzes} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (!session?.user) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }

    let quizzes = await getQuizByUser(session.user.id);
    quizzes = JSON.parse(JSON.stringify(quizzes));

    return {
        props: { session, quizzes },
    };
}

export default ProfilePage;
