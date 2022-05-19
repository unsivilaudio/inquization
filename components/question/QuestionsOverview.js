import classes from '../../styles/question/QuestionsOverview.module.scss';

const QuestionsOverview = props => {
    return (
        <div className={classes.QuestionsOverview}>
            <div className={classes.Header}>Quiz Questions Overview</div>
            <div className={classes.Overview}>
                <div className={classes.Title}>Quiz Title</div>
                <ul className={classes.QuestionList}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <li key={i} className={classes.QuestionItem}>
                            <div className={classes.Question}>
                                Q{i + 1}: Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Inventore perspiciatis,
                                officiis temporibus nostrum porro corporis ipsum
                                laborum vitae nesciunt, alias, exercitationem
                                facilis pariatur suscipit. Placeat veniam vel
                                sed harum esse?
                            </div>
                            <div className={classes.Actions}>
                                <div className={classes.Edit}>Edit</div>
                                <div className={classes.Delete}>Delete</div>
                            </div>
                            <ol className={classes.Answers}>
                                {Array.from({ length: 4 }).map((_, y) => (
                                    <li
                                        key={`${i}-${y}`}
                                        className={classes.AnswerItem}>
                                        This is answer {y + 1}
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

QuestionsOverview.getInitialProps = ctx => {
    return {
        props: {
            data: 'hello world',
        },
    };
};

export default QuestionsOverview;
