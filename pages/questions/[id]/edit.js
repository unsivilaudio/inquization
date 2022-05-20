import { useRouter } from 'next/router';
import axios from '../../../helpers/with-axios';
import QuestionForm from '../../../components/question/QuestionForm';
import { getQuestionById } from '../../../helpers/api-util';

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
                questionData={props.question}
                onSubmit={handleEditSubmit}
            />
        </div>
    );
};

export async function getServerSideProps(ctx) {
    if (!ctx.query.id) {
        return {
            redirect: '/',
        };
    }

    let question = await getQuestionById(ctx.query.id);
    if (!question) {
        return {
            redirect: '/',
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
