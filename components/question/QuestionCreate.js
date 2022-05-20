import { useState, useEffect } from 'react';
import classes from '../../styles/question/QuestionCreate.module.scss';
import Button from '../ui/Button';

const QuestionCreate = ({ onSubmit }) => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState({
        correct: '',
        alt1: '',
        alt2: '',
        alt3: '',
    });

    function handleChangeQuestion(e) {
        setQuestion(e.target.value);
    }

    function handleChangeAnswer(e) {
        const { name, value } = e.target;
        setAnswers(st => ({
            ...st,
            [name]: value,
        }));
    }

    function handleSubmitQuestion(e) {
        e.preventDefault();
        onSubmit({ question, answers });
    }

    return (
        <div className={classes.QuestionCreate} onSubmit={handleSubmitQuestion}>
            <div className={classes.Header}>Create a question</div>
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
                    <div className={classes.FormGroup}>
                        <label htmlFor='answer-correct'>Correct Answer</label>
                        <input
                            type='text'
                            name='correct'
                            value={answers.correct}
                            onChange={handleChangeAnswer}
                        />
                    </div>
                    <div className={classes.FormGroup}>
                        <label htmlFor='answer-alt-1'>Incorrect Answer</label>
                        <input
                            type='text'
                            name='alt1'
                            id='answer-alt-1'
                            value={answers.alt1}
                            onChange={handleChangeAnswer}
                        />
                    </div>
                    <div className={classes.FormGroup}>
                        <label htmlFor='answer-alt-2'>Incorrect Answer</label>
                        <input
                            type='text'
                            name='alt2'
                            id='answer-alt-2'
                            value={answers.alt2}
                            onChange={handleChangeAnswer}
                        />
                    </div>
                    <div className={classes.FormGroup}>
                        <label htmlFor='answer-alt-3'>Incorrect Answer</label>
                        <input
                            type='text'
                            name='alt3'
                            id='answer-alt-3'
                            value={answers.alt3}
                            onChange={handleChangeAnswer}
                        />
                    </div>
                </div>
                <div className={classes.Actions}>
                    <Button theme='danger'>Cancel</Button>
                    <Button type='submit'>Add Question</Button>
                </div>
            </form>
        </div>
    );
};

QuestionCreate.getInitialProps = ctx => {
    return {
        props: {
            data: 'hello world',
        },
    };
};

export default QuestionCreate;
