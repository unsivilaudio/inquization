import classes from '../../styles/quiz/QuizItem.module.scss';
import Button from '../ui/Button';

function QuizItem(props) {
    const { title, summary, category, difficulty, image, id } = props;
    let diffColor = 'green';

    switch (difficulty) {
        case 'hard':
            diffColor = 'red';
            break;
        case 'medium':
            diffColor = 'orangered';
    }

    return (
        <li className={classes.QuizItem}>
            <div className={classes.Title}>{title}</div>
            <div className={classes.Content}>
                <div className={classes.Category}>{category}</div>
                <div
                    className={classes.Difficulty}
                    style={{ color: diffColor }}>
                    {difficulty}
                </div>
                <p className={classes.Summary}>{summary}</p>
            </div>
            <div className={classes.Actions}>
                <Button link={`/quiz/${id}`}>Details</Button>
            </div>
        </li>
    );
}

export default QuizItem;
