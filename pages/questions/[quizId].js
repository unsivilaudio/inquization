import QuestionList from '../../components/question/QuestionList';
import { getQuizById } from '../../helpers/api-util';
import classes from '../../styles/pages/QuestionDetails.module.scss';

const DUMMY_DATA = [
    {
        _id: '1',
        content: 'What is the answer to this question',
        answers: [
            'First Answer',
            'Second Answer',
            'Third Answer',
            'Fourth Answer',
        ],
    },
    {
        _id: '2',
        content: 'What is the answer to this question',
        answers: [
            'First Answer',
            'Second Answer',
            'Third Answer',
            'Fourth Answer',
        ],
    },
    {
        _id: '3',
        content: 'What is the answer to this question',
        answers: [
            'First Answer',
            'Second Answer',
            'Third Answer',
            'Fourth Answer',
        ],
    },
    {
        _id: '4',
        content: 'What is the answer to this question',
        answers: [
            'First Answer',
            'Second Answer',
            'Third Answer',
            'Fourth Answer',
        ],
    },
    {
        _id: '5',
        content: 'What is the answer to this question',
        answers: [
            'First Answer',
            'Second Answer',
            'Third Answer',
            'Fourth Answer',
        ],
    },
    {
        _id: '6',
        content: 'What is the answer to this question',
        answers: [
            'First Answer',
            'Second Answer',
            'Third Answer',
            'Fourth Answer',
        ],
    },
];

const QuestionDetails = props => {
    const { title } = props.quiz;

    return (
        <div className={classes.QuestionDetails}>
            <div className={classes.Title}>Quiz: {title}</div>
            <QuestionList data={DUMMY_DATA} />
        </div>
    );
};

export async function getServerSideProps(ctx) {
    const { quizId } = ctx.query;

    let quiz = await getQuizById(quizId);
    quiz = JSON.parse(JSON.stringify(quiz));

    return {
        props: {
            quiz,
        },
    };
}

export default QuestionDetails;
