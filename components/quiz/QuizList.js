import QuizItem from './QuizItem';
import classes from '../../styles/quiz/QuizList.module.scss';

function QuizList(props) {
    const { category, difficulty, items } = props;
    return (
        <ul className={classes.QuizList}>
            <div className={classes.Title}>
                {category} Quizzes{' '}
                {category !== 'Featured' ? `(${difficulty})` : ''}
            </div>
            {items.map(quiz => (
                <QuizItem
                    key={quiz._id}
                    id={quiz._id}
                    title={quiz.title}
                    category={quiz.category}
                    difficulty={quiz.difficulty}
                    summary={quiz.summary}
                    image={quiz.image}
                />
            ))}
        </ul>
    );
}
export default QuizList;
