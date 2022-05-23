import { getSession } from 'next-auth/react';
import { getQuizById } from '../../../helpers/api-util';
import QuestionsOverview from '../../../components/question/QuestionsOverview';

import classes from '../../../styles/pages/QuestionEdit.module.scss';

const QuizEdit = props => {
    return (
        <div className={classes.QuestionEdit}>
            <div className={classes.Header}>Add or Edit Questions</div>
            <QuestionsOverview quiz={props.quiz} />
        </div>
    );
};

export async function getServerSideProps({ req, query }) {
    const session = await getSession({ req });
    if (!query.quizId || session?.user?.role !== 'edit') {
        return {
            redirect: {
                destination: '/',
            },
            props: {},
        };
    }
    let quiz = await getQuizById(query.quizId);
    if (!quiz) {
        return {
            redirect: {
                destination: '/',
            },
            props: {},
        };
    }
    quiz = JSON.parse(JSON.stringify(quiz));
    return {
        props: {
            quiz,
        },
    };
}

export default QuizEdit;
