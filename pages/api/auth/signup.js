import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;

    const { email, password } = data;

    if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
    ) {
        res.status(422).json({
            message:
                'Invalid Input - passwords needs to be at least 7 characters long',
        });

        return;
    }

    const db = await connectToDatabase();
    const Users = db.collection('users');

    const existingUser = await Users.findOne({ email: email });

    if (existingUser) {
        res.status(422).json({ message: 'This email is already in use!' });
        db.close();

        return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await Users.insertOne({
        email: email,
        password: hashedPassword,
    });

    res.status(201).json({ message: 'Created User!' });
    db.close();
}

export default handler;
