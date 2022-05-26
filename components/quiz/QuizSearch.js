import { useState } from 'react';
import Button from '../ui/Button';
import classes from '../../styles/quiz/QuizSearch.module.scss';
import subjects from '../../lib/subjects';
import difficulties from '../../lib/difficulty';
import Select from '../ui/Select';

function QuizSearch({ onSearch, onReset }) {
    const [category, setCategory] = useState(subjects[0].value);
    const [difficulty, setDifficulty] = useState('easy');

    function submitHandler(e) {
        e.preventDefault();

        onSearch(category, difficulty);
    }

    function handleChangeCategory(e) {
        if (e.target.value === 'all') {
            setDifficulty('-');
        }
        setCategory(e.target.value);
    }

    function handleChangeDifficulty(e) {
        setDifficulty(e.target.value);
    }

    return (
        <form className={classes.QuizSearch} onSubmit={submitHandler}>
            <div className={classes.Title}>
                Find A Quiz That's Right For You
            </div>
            <div className={classes.FormGroup}>
                <Select
                    label='Category'
                    name='category'
                    options={subjects}
                    onChange={handleChangeCategory}
                />
            </div>
            <div className={classes.FormGroup}>
                <Select
                    label='Difficulty'
                    name='difficulty'
                    options={difficulties}
                    onChange={handleChangeDifficulty}
                />
            </div>
            <div className={classes.Actions}>
                <Button type='submit'>Find Quiz</Button>
                <Button type='button' onClick={onReset}>
                    Reset
                </Button>
            </div>
        </form>
    );
}

export default QuizSearch;
