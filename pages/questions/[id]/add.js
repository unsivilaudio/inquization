import { useRouter } from 'next/router';

import axios from '../../../helpers/with-axios';
import QuestionForm from '../../../components/question/QuestionForm';
import classes from '../../../styles/pages/QuestionAdd.module.scss';

const QuestionAdd = ({ quizId }) => {
    const router = useRouter();

    function handleSubmitQuestion(questionData) {
        axios.post('/questions', { quizId, ...questionData }).then(() => {
            router.push(`/questions/${quizId}/list`);
        });
    }

    return (
        <div className={classes.QuestionAdd}>
            <QuestionForm quizId={quizId} onSubmit={handleSubmitQuestion} />
        </div>
    );
};

export function getServerSideProps(ctx) {
    return {
        props: {
            quizId: ctx.query.id,
        },
    };
}

export default QuestionAdd;
