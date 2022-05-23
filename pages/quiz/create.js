import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import axios from '../../helpers/with-axios';
import subjects from '../../lib/subjects';
import Button from '../../components/ui/Button';
import classes from '../../styles/pages/QuizCreate.module.scss';

function QuizCreate({ currentUser }) {
    const router = useRouter();
    const [category, setCategory] = useState(subjects[0].category);
    const [difficulty, setDifficulty] = useState('easy');
    const [summary, setSummary] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'edit') {
            router.push('/');
        }
    }, [currentUser, router]);

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeCategory(e) {
        setCategory(e.target.value);
    }

    function handleChangeDifficulty(e) {
        setDifficulty(e.target.value);
    }

    function handleChangeSummary(e) {
        setSummary(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();

        const quiz = {
            category,
            difficulty,
            summary,
            title,
        };

        axios.post('/quiz', quiz).then(() => {
            router.push('/profile#quizzes');
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

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    console.log(session?.user);

    return {
        props: {
            currentUser: session?.user || null,
        },
    };
}

export default QuizCreate;
