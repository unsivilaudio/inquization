import Quiz from '../models/Quiz';
import Question from '../models/Question';
import Submission from '../models/Submission';
import { connectToDatabase } from '../lib/db';
import { randomize } from './general-util';

export async function getQuizById(id) {
    await connectToDatabase();
    let data = await Quiz.findById(id);
    if (!data) {
        return null;
    }

    const questions = await Question.find({ quizId: id });
    questions.forEach(question => {
        const answers = randomize(question.answers);
        const correctAnswer = answers.findIndex(
            x => x === question.answers[question.correctAnswer]
        );

        question.answers = answers;
        question.correctAnswer = correctAnswer;
    });
    data.questions = questions;
    return data;
}

export async function getQuizByUser(id) {
    await connectToDatabase();
    let data = await Quiz.find({ creator: id });
    if (!data) {
        return [];
    }

    return data;
}

export async function getQuestionById(id) {
    await connectToDatabase();
    const data = await Question.findById(id);
    return data;
}
