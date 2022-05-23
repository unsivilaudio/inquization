import { getSession } from 'next-auth/react';
import QuestionsOverview from '../../../components/question/QuestionsOverview';
import Button from '../../../components/ui/Button';
import { getQuizById } from '../../../helpers/api-util';

import classes from '../../../styles/question/QuestionList.module.scss';

const QuestionList = props => {
    return (
        <div className={classes.QuestionList}>
            <QuestionsOverview quiz={props.quiz} />
            <div style={{ marginTop: '1.5rem' }}>
                <Button link={`/questions/${props.quiz._id}/add`}>
                    Add A New Question
                </Button>
            </div>
        </div>
    );
};

export async function getServerSideProps({ req, query }) {
    const session = await getSession({ req });
    if (!query.id || !session?.user) {
        return {
            redirect: {
                destination: '/',
            },
            props: {},
        };
    }

    let quiz = await getQuizById(query.id);
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

export default QuestionList;
