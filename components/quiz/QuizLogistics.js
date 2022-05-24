import classes from '../../styles/quiz/QuizLogistics.module.scss';

function QuizLogistics(props) {
    const { category, difficulty, image, length, imageAlt } = props;

    return (
        <section className={classes.QuizLogistics}>
            <div className={classes.Image}>
                <img src={`/${image}`} alt={imageAlt} />
            </div>
            <ul className={classes.List}>
                <li className={classes.ListItem}>
                    <div className={classes.Label}>subject:</div>
                    <div className={classes.Value}>{category}</div>
                </li>
                <li className={classes.ListItem}>
                    <div className={classes.Label}>difficulty:</div>
                    <div className={classes.Value}>{difficulty}</div>
                </li>
                <li className={classes.ListItem}>
                    <div className={classes.Label}>length:</div>
                    <div className={classes.Value}>{length}</div>
                </li>
            </ul>
        </section>
    );
}

export default QuizLogistics;
