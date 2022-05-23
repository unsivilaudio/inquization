import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import axios from '../../../helpers/with-axios';
import { getQuestionById } from '../../../helpers/api-util';
import QuestionForm from '../../../components/question/QuestionForm';

import classes from '../../../styles/pages/QuestionEdit.module.scss';

const QuestionEdit = props => {
    const router = useRouter();

    function handleEditSubmit(questionData) {
        axios
            .patch(`/questions/${props.question._id}`, questionData)
            .then(() => {
                router.push(`/questions/${props.question.quizId}/list`);
            });
    }

    return (
        <div className={classes.QuestionEdit}>
            <div className={classes.Header}>Edit Your Question</div>
            <QuestionForm
                type='edit'
                quizId={props.question.quizId}
                questionData={props.question}
                onSubmit={handleEditSubmit}
            />
        </div>
    );
};

export async function getServerSideProps({ query, req }) {
    const session = await getSession({ req });
    if (!query.id || session?.user?.role !== 'edit') {
        return {
            redirect: {
                destination: '/',
            },
            props: {},
        };
    }

    let question = await getQuestionById(query.id);
    if (!question) {
        return {
            redirect: {
                destination: '/',
            },
            props: {},
        };
    }

    question = JSON.parse(JSON.stringify(question));
    return {
        props: {
            question,
        },
    };
}

export default QuestionEdit;
