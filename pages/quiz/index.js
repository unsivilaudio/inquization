import { useState, useEffect } from 'react';
import QuizSearch from '../../components/quiz/QuizSearch';
import QuizList from '../../components/quiz/QuizList';
import Head from 'next/head';

function Quiz() {
    const [quizItems, setQuizItems] = useState([]);
    const [quizCategory, setQuizCategory] = useState('Featured');
    const [quizDifficulty, setQuizDifficulty] = useState('Easy');

    useEffect(() => {
        fetch('/api/quiz', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                setQuizItems(data);
            });
    }, []);

    function handleGetSearch(category, difficulty) {
        category = category.toLowerCase();
        difficulty = difficulty.toLowerCase();
        fetch(`/api/quiz?category=${category}&difficulty=${difficulty}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                setQuizItems(data);
                setQuizCategory(category);
                setQuizDifficulty(difficulty);
            });
    }

    function handleResetSearch() {
        fetch('/api/quiz', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                setQuizItems(data);
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
