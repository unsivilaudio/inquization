import classes from '../../styles/quiz/QuizSummary.module.scss';

const QuizSummary = ({ summary }) => {
    return (
        <div className={classes.QuizSummary}>
            <div className={classes.Title}>Quiz Summary</div>
            <p className={classes.Summary}>
                {summary} Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Ea explicabo possimus nulla velit molestiae voluptatem
                maxime porro tenetur quam odit. Tempore corporis quaerat
                repudiandae excepturi asperiores voluptates modi sunt amet?
            </p>
        </div>
    );
};

export default QuizSummary;
