import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../lib/db';
import { hashPassword, verifyPassword } from '../../../lib/auth';
import User from '../../../models/User';

async function handler(req, res) {
    const session = await getSession({ req });
    if (!session?.user) {
        return res.status(401).json({
            status: 'fail',
            message: 'Please log in for access.',
        });
    }

    const { password, nextPassword } = req.body;
    if (!password || !nextPassword) {
        return res.status(400).json({
            status: 'fail',
            message:
                'Missing one or more fields for request: password nextPassword',
        });
    }

    await connectToDatabase();
    const { email } = session.user;
    let user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found.',
        });
    }

    if (!user._id.equals(session.user.id)) {
        return res.status(403).json({
            status: 'fail',
            message: 'You are not allowed to do that.',
        });
    }

    switch (method) {
        case 'PATCH':
            const currentPassword = user.password;
            const passwordAreEqual = await verifyPassword(
                password,
                currentPassword
            );

            if (!passwordAreEqual) {
                return res.status(403).json({ message: 'Invalid Password.' });
            }

            const hashedPassword = await hashPassword(nextPassword);
            user.password = hashedPassword;
            await user.save();

            res.status(200).json({ message: 'Sucessfully updated password' });
        default:
            res.setHeader('Allow', ['PATCH']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export default handler;
