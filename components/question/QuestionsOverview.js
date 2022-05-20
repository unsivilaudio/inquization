import classes from '../../styles/question/QuestionsOverview.module.scss';

const QuestionsOverview = ({ quiz }) => {
    return (
        <div className={classes.QuestionsOverview}>
            <div className={classes.Header}>{quiz.title}</div>
            <div className={classes.Overview}>
                <div className={classes.Title}>Quiz Questions Overview</div>
                <ul className={classes.QuestionList}>
                    {quiz.questions.map((q, i) => (
                        <li key={i} className={classes.QuestionItem}>
                            <div className={classes.Question}>
                                Q{i + 1}: {q.content}
                            </div>
                            <div className={classes.Actions}>
                                <div
                                    className={classes.Edit}
                                    onClick={() => toggleShowEdit(DUMMY_DATA)}>
                                    Edit
                                </div>
                                <div className={classes.Delete}>Delete</div>
                            </div>
                            <ol className={classes.Answers}>
                                {q.answers.map((answer, y) => (
                                    <li
                                        key={`${i}-${y}`}
                                        className={[
                                            classes.AnswerItem,
                                            q.correctAnswer === y
                                                ? classes.Correct
                                                : '',
                                        ].join(' ')}>
                                        {answer}
                                    </li>
                                ))}
                            </ol>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuestionsOverview;
