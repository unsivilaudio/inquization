import { getQuizById } from '../../../helpers/api-util';

export default async function useHandler(req, res) {
    const { quizId } = req.query;
    const { method } = req;

    let quiz = {};
    switch (method) {
        case 'GET':
            if (!quizId) {
                return res
                    .status(400)
                    .send({ error: 'You must provide an id.' });
            }
            quiz = await getQuizById(quizId);
            return res.status(200).send(quiz);
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
