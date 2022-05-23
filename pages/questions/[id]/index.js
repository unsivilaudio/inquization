import QuestionList from '../../../components/question/QuestionList';
import { getQuizById } from '../../../helpers/api-util';
import classes from '../../../styles/pages/QuestionDetails.module.scss';

const QuestionDetails = props => {
    const { title, questions } = props.quiz;

    return (
        <div className={classes.QuestionDetails}>
            <div className={classes.Title}>Quiz: {title}</div>
            <QuestionList data={questions.length ? questions : []} />
        </div>
    );
};

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;

    let quiz = await getQuizById(id);
    quiz.questions.forEach(x => (x.correctAnswer = undefined));
    quiz = JSON.parse(JSON.stringify(quiz));

    return {
        props: {
            quiz,
        },
    };
}

export default QuestionDetails;
