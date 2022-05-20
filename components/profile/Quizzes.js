import axios from '../../helpers/with-axios';
import Button from '../ui/Button';
import classes from '../../styles/profile/Quizzes.module.scss';

const Quizzes = props => {
    const { data = [] } = props;

    function handleDeleteQuiz(id) {
        axios.delete(`/quiz/${id}`).then(() => {
            const quizItem = document.getElementById(id);
            if (quizItem) {
                quizItem.remove();
            }
        });
    }

    const quizItems = data.map(({ _id, title, summary, questions }) => (
        <li key={_id} id={_id} className={classes.QuizItem}>
            <div className={classes.QuizTitle}>{title}</div>
            <div className={classes.QuizSummary}>{summary}</div>
            <div className={classes.QuizLength}>
                # of questions: {questions.length}
            </div>
            <div className={classes.Actions}>
                <Button theme='invert' link={`/questions/${_id}/add`}>
                    add or edit questions
                </Button>
                <Button
                    theme='danger'
                    onClick={handleDeleteQuiz.bind(null, _id)}>
                    Delete
                </Button>
            </div>
        </li>
    ));

    return (
        <div className={classes.Quizzes} id='#quizzes'>
            <div className={classes.Header}>My Quizzes</div>
            <ul className={classes.QuizList}>{quizItems}</ul>
        </div>
    );
};

export default Quizzes;
