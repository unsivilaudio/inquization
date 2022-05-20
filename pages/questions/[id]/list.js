import QuestionsOverview from '../../../components/question/QuestionsOverview';
import Button from '../../../components/ui/Button';
import { getQuizById } from '../../../helpers/api-util';

const QuestionList = props => {
    return (
        <div className='QuestionList'>
            <QuestionsOverview quiz={props.quiz} />
            <div>
                <Button link={`/questions/${props.quiz._id}/add`}>
                    Add a new question
                </Button>
            </div>
        </div>
    );
};

export async function getServerSideProps(ctx) {
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

export default QuestionList;
