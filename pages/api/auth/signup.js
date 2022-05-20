import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';
import User from '../../../models/User';

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

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(422).json({ message: 'This email is already in use!' });

        return;
    }

    const hashedPassword = await hashPassword(password);

    let user = await User.create({
        email: email,
        password: hashedPassword,
    });
    user.password = undefined;

    res.status(201).json({ message: 'Created User!', user });
}

export default handler;
