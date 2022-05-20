import { useState } from 'react';
import { getQuizById } from '../../../helpers/api-util';
import QuestionsOverview from '../../../components/question/QuestionsOverview';

import classes from '../../../styles/pages/QuestionEdit.module.scss';
import QuestionCreate from '../../../components/question/QuestionCreate';

const QuestionEdit = props => {
    const [showEdit, setShowEdit] = useState(false);
    const [questionData, setQuestionData] = useState({});

    function toggleShowEdit(data) {
        if (!data) {
            showEdit(false);
        }

        setQuestionData(data);
        setShowEdit(true);
    }

    return (
        <div className={classes.QuestionEdit}>
            <div className={classes.Header}>Add or Edit Questions</div>
            <QuestionCreate
                type={showEdit ? 'edit' : null}
                answers={questionData?.answers}
                question={questionData?.question}
                correctAnswer={questionData?.correctAnswer}
            />
            <QuestionsOverview toggleShowEdit={toggleShowEdit} />
        </div>
    );
};

export async function getServerSideProps(ctx) {
    if (!ctx.query.id) {
        return {
            redirect: '/',
        };
    }
    let quiz = await getQuizById(ctx.query.id);
    if (!quiz) {
        return {
            redirect: '/',
        };
    }
    quiz = JSON.parse(JSON.stringify(quiz));
    return {
        props: {
            quiz,
        },
    };
}

export default QuestionEdit;
