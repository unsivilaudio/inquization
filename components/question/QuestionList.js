import React, { useEffect, useState } from 'react';
import QuestionItem from './QuestionItem';
import classes from '../../styles/question/QuestionList.module.scss';

const QuestionList = props => {
    const [submitted, setSubmitted] = useState({});
    const [questionItems, setQuestionItems] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        // FETCH THE QUIZ DETAILS IN HERE??
        const questions = props.data.map((q, i, arr) => (
            <QuestionItem
                key={q._id}
                id={q._id}
                content={q.content}
                answers={q.answers}
                toggleNext={toggleNext}
                togglePrev={togglePrev}
                submittedValue={submitted[q._id]}
                finalQuestion={arr.length - 1 === i}
            />
        ));
        setQuestionItems(questions);
    }, [submitted]);

    function submitAnswer(id, value) {
        if (id && value?.toString()) {
            setSubmitted(st => ({
                ...st,
                [id]: Number(value),
            }));
        }
    }

    function handleChangeQuestion(dir = 'next') {
        switch (dir) {
            case 'next':
                if (currentQuestion === questionItems.length - 1) {
                    console.log('DO SUBMIT OR SUMMARY');
                    return;
                }

                setCurrentQuestion(st => {
                    return st + 1;
                });
                break;
            case 'prev':
                setCurrentQuestion(st => {
                    if (st - 1 < 0) return st;
                    return st - 1;
                });
                break;
        }
    }

    function toggleNext(id, value) {
        submitAnswer(id, value);
        handleChangeQuestion('next');
    }

    function togglePrev(id, value) {
        submitAnswer(id, value);
        handleChangeQuestion('prev');
    }

    return (
        <div className={classes.QuestionList}>
            <div className={classes.Header}>
                Progress {`(${currentQuestion + 1}/${questionItems.length})`}
            </div>
            <ul className={classes.List}>
                {questionItems.length && questionItems[currentQuestion]}
            </ul>
        </div>
    );
};

export default QuestionList;
