import { useState, useEffect } from 'react';
import classes from '../../styles/question/QuestionCreate.module.scss';
import Button from '../ui/Button';

const QuestionForm = ({ type, quizId, questionData, onSubmit }) => {
    const [question, setQuestion] = useState('');
    const [answersLength, setAnswersLength] = useState(3);
    const [answers, setAnswers] = useState(['', '', '']);

    useEffect(() => {
        if (type === 'edit' && questionData) {
            setQuestion(questionData.content);
            setAnswersLength(questionData.answers.length);
            setAnswers(() => {
                const correct =
                    questionData.answers[questionData.correctAnswer];
                const answers = questionData.answers.filter(
                    (_, i) => i !== questionData.correctAnswer
                );
                return [correct, ...answers];
            });
        }
    }, [type, questionData]);

    function handleChangeQuestion(e) {
        setQuestion(e.target.value);
    }

    function handleChangeAnswer(e) {
        let currentAnswers = [...answers];
        currentAnswers[e.target.id] = e.target.value;
        setAnswers(currentAnswers);
    }

    function handleAddAnswer() {
        if (answersLength < 5) {
            setAnswers(st => st.push(''));
            setAnswersLength(st => st + 1);
        }
    }

    function handleRemoveAnswer(idx) {
        if (answersLength > 3) {
            setAnswers(st => st.filter((_, i) => i !== idx));
            setAnswersLength(st => st - 1);
        }
    }

    function handleSubmitQuestion(e) {
        e.preventDefault();
        onSubmit({ question, answers });
    }

    const answersInputs = Array.from({ length: answersLength }).map((_, i) => (
        <div key={`answer-${i}`} className={classes.FormGroup}>
            <label htmlFor={`answer-${i}`}>
                {i === 0 ? 'Correct Answer' : 'Incorrect Answer'}
            </label>
            <input
                type='text'
                name={`answer-${i}`}
                id={i}
                value={answers[i]}
                onChange={handleChangeAnswer}
            />
            {i > 2 && (
                <span
                    className={classes.Delete}
                    onClick={handleRemoveAnswer.bind(null, i)}>
                    delete
                </span>
            )}
        </div>
    ));

    return (
        <div className={classes.QuestionCreate} onSubmit={handleSubmitQuestion}>
            {type !== 'edit' && (
                <div className={classes.Header}>Create a question</div>
            )}
            <form className={classes.QuestionForm}>
                <div className={classes.FormQuestion}>
                    <label htmlFor='question'>Question</label>
                    <textarea
                        id='question'
                        value={question}
                        onChange={handleChangeQuestion}
                    />
                </div>
                <div className={classes.FormAnswers}>
                    {answersInputs}
                    {answersLength < 5 && (
                        <div
                            className={classes.AddAnswer}
                            onClick={handleAddAnswer}>
                            Add Addtional Answers
                        </div>
                    )}
                </div>
                <div className={classes.Actions}>
                    <Button theme='danger' link={`/questions/${quizId}/list`}>
                        Cancel
                    </Button>
                    <Button type='submit'>
                        {type !== 'edit' ? 'Add Question' : 'Update'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default QuestionForm;
