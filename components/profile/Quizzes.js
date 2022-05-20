import Button from '../ui/Button';

import classes from '../../styles/profile/Quizzes.module.scss';

const Quizzes = props => {
    const { data = [] } = props;

    const quizItems = data.map(({ _id, title, summary, questions }) => (
        <li key={_id} className={classes.QuizItem}>
            <div className={classes.QuizTitle}>{title}</div>
            <div className={classes.QuizSummary}>{summary}</div>
            <div className={classes.QuizLength}>
                # of questions: {questions.length}
            </div>
            <div className={classes.Actions}>
                <Button theme='invert'>edit questions</Button>
                <Button theme='danger'>Delete</Button>
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
