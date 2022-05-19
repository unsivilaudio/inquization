import { getSession } from 'next-auth/react';
import { getFeaturedQuiz, getFilteredQuiz } from '../../../helpers/api-util';
import { connectToDatabase } from '../../../lib/db';
import Quiz from '../../../models/Quiz';
import User from '../../../models/User';

export default async function useHandler(req, res) {
    const {
        query: { category, difficulty },
        method,
    } = req;
    const session = await getSession({ req });
    await connectToDatabase();
    const user = await User.findById(session.user.id);

    if (!user) {
        return res.status(401).send('Please log in for access.');
    }

    let quizList = [];
    switch (method) {
        case 'GET':
            if (category || difficulty) {
                quizList = await getFilteredQuiz(category, difficulty);
                return res.status(200).send(quizList);
            }
            quizList = await getFeaturedQuiz();
            return res.status(200).send(quizList);
        case 'POST':
            if (user.type === 'student') {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Not Authorized',
                });
            }
            let quiz = await Quiz.create({ ...req.body, creator: user._id });
            return res.status(201).send(quiz);
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
