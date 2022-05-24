import { getSession } from 'next-auth/react';
import QuestionList from '../../../components/question/QuestionList';
import { getQuizById } from '../../../helpers/api-util';
import classes from '../../../styles/pages/QuestionDetails.module.scss';

const QuestionDetails = props => {
    const { title, questions } = props.quiz;

    return (
        <div className={classes.QuestionDetails}>
            <div className={classes.Title}>Quiz: {title}</div>
            <QuestionList
                data={questions.length ? questions : []}
                currentUser={props.currentUser}
            />
        </div>
    );
};

export async function getServerSideProps({ query, req }) {
    const session = await getSession({ req });
    let quiz = await getQuizById(query.id);
    console.log(session?.user);
    if (session?.user?.role !== 'edit') {
        quiz.questions.forEach(x => (x.correctAnswer = undefined));
    }
    quiz = JSON.parse(JSON.stringify(quiz));

    return {
        props: {
            quiz,
            currentUser: session?.user || null,
        },
    };
}

export default QuestionDetails;
