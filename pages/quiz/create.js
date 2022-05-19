import { useState } from 'react';
import { useRouter } from 'next/router';

import subjects from '../../lib/subjects';
import classes from '../../styles/pages/QuizCreate.module.scss';
import Button from '../../components/ui/Button';

function QuizCreate() {
    const router = useRouter();
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [summary, setSummary] = useState('');
    const [title, setTitle] = useState('');

    function handleChangeTitle(quiz) {
        setTitle(quiz.target.value);
    }

    function handleChangeCategory(quiz) {
        setCategory(quiz.target.value);
    }

    function handleChangeDifficulty(quiz) {
        setDifficulty(quiz.target.value);
    }

    function handleChangeSummary(quiz) {
        setSummary(quiz.target.value);
    }

    function submitHandler(event) {
        event.preventDefault();

        const quiz = {
            category,
            difficulty,
            summary,
            title,
        };

        fetch('/api/quiz', {
            method: 'POST',
            body: JSON.stringify(quiz),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(() => {
                router.push('/quiz');
            })
            .catch(err => {
                if (err.response?.data?.message) {
                    alert(err.response.data.message);
                }
            });
    }
    return (
        <form onSubmit={submitHandler} className={classes.QuizCreate}>
            <div className={classes.Title}>Create A New Quiz</div>
            <div className={classes.FormControl}>
                <div className={classes.FormGroup}>
                    <label htmlFor='title'>Quiz Title</label>
                    <input
                        type='text'
                        name='title'
                        required
                        onChange={handleChangeTitle}
                        value={title}
                    />
                </div>
                <div className={classes.FormGroup}>
                    <label htmlFor='catagory'>Quiz Subject</label>
                    <select
                        type='text'
                        name='catagory'
                        required
                        onChange={handleChangeCategory}
                        value={category}>
                        {subjects.map(cat => (
                            <option key={cat.category} value={cat.category}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={classes.FormGroup}>
                    <label htmlFor='difficulty'>Quiz Difficulty</label>
                    <select
                        type='text'
                        name='difficulty'
                        onChange={handleChangeDifficulty}
                        value={difficulty}>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                </div>
                <div className={classes.FormGroup}>
                    <label htmlFor='summary'>Quiz Summary</label>
                    <textarea
                        type='text'
                        name='summary'
                        cols={40}
                        rows={5}
                        required
                        onChange={handleChangeSummary}
                        value={summary}
                    />
                </div>
            </div>
            <div className={classes.Actions}>
                <Button type='submit'>Submit</Button>
            </div>
        </form>
    );
}
export default QuizCreate;
