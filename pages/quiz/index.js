import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import axios from '../../helpers/with-axios';
import QuizSearch from '../../components/quiz/QuizSearch';
import QuizList from '../../components/quiz/QuizList';
import Head from 'next/head';

function Quiz() {
    const router = useRouter();
    const [quizItems, setQuizItems] = useState([]);
    const [quizCategory, setQuizCategory] = useState('Featured');
    const [quizDifficulty, setQuizDifficulty] = useState('Easy');

    useEffect(() => {
        axios
            .get('/quiz')
            .then(res => {
                setQuizItems(res.data);
            })
            .catch(err => {
                console.log(err.message);
                router.push('/auth');
            });
    }, []);

    function handleGetSearch(category, difficulty) {
        category = category.toLowerCase();
        difficulty = difficulty.toLowerCase();
        axios
            .get(`/quiz?category=${category}&difficulty=${difficulty}`)
            .then(res => {
                setQuizItems(res.data);
                setQuizCategory(category);
                setQuizDifficulty(difficulty);
            });
    }

    function handleResetSearch() {
        axios.get('/api/quiz').then(res => {
            setQuizItems(res.data);
            setQuizCategory('Featured');
        });
    }

    return (
        <>
            <Head>
                <title>Schwizz</title>
                <meta
                    name='description'
                    content='Find a lot of great quiz...'
                />
            </Head>
            <QuizSearch
                onSearch={handleGetSearch}
                onReset={handleResetSearch}
            />
            <QuizList
                items={quizItems}
                category={quizCategory}
                difficulty={quizDifficulty}
            />
        </>
    );
}

export default Quiz;
