import { useRouter } from 'next/router';

import { randomize } from '../../helpers/general-util';
import CircleCheck from '../../assets/svg/circle-check-solid.svg';
import classes from '../../styles/question/QuestionsOverview.module.scss';

const QuestionsOverview = ({ quiz }) => {
    const router = useRouter();

    function handleEditQuestion(id) {
        router.push(`/questions/${id}/edit`);
    }

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
                                    onClick={handleEditQuestion.bind(
                                        null,
                                        q._id
                                    )}>
                                    Edit
                                </div>
                                <div className={classes.Delete}>Delete</div>
                            </div>
                            <ol className={classes.Answers}>
                                {randomize(q.answers).map((answer, y) => (
                                    <li
                                        key={`${i}-${y}`}
                                        className={[
                                            classes.AnswerItem,
                                            q.answers[q.correctAnswer] ===
                                            answer
                                                ? classes.Correct
                                                : '',
                                        ].join(' ')}>
                                        {answer}
                                        <CircleCheck />
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
