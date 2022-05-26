import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import axios from '../../helpers/with-axios';
import subjects from '../../lib/subjects';
import difficulties from '../../lib/difficulty';
import Select from '../../components/ui/Select';
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
                    <Select
                        label='Difficulty'
                        name='difficulty'
                        options={difficulties}
                        onChange={handleChangeDifficulty}
                    />
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
    if (session?.user?.role !== 'edit') {
        return {
            redirect: {
                destination: '/',
            },
            props: {},
        };
    }

    return {
        props: {
            currentUser: session?.user || null,
        },
    };
}

export default QuizCreate;
