import { useState } from 'react';

import Button from '../ui/Button';
import classes from '../../styles/question/QuestionItem.module.scss';

const QuestionItem = props => {
    const [value, setValue] = useState(props.submittedValue);

    function handleChangeValue(val) {
        setValue(val);
    }

    const letters = ['a', 'b', 'c', 'd'];

    return (
        <div className={classes.QuestionItem}>
            <div className={classes.Question}>
                Q{props.num}: {props.content}
            </div>
            <ul className={classes.AnswerList}>
                {props.answers.map((answer, i) => {
                    return (
                        <li key={i} className={classes.Answer}>
                            <input
                                type='radio'
                                name={props.id}
                                checked={value?.toString() === i.toString()}
                                onChange={handleChangeValue.bind(this, i)}
                            />
                            <span>{letters[i]})</span>
                            <p>{answer}</p>
                        </li>
                    );
                })}
            </ul>
            <div className={classes.Actions}>
                <Button onClick={props.togglePrev.bind(null, props.id, value)}>
                    prev
                </Button>
                <Button onClick={props.toggleNext.bind(null, props.id, value)}>
                    {props.finalQuestion ? 'finish' : 'next'}
                </Button>
            </div>
        </div>
    );
};

export default QuestionItem;
