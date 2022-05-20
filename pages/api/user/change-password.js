import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../lib/db';
import { hashPassword, verifyPassword } from '../../../lib/auth';
import User from '../../../models/User';

async function handler(req, res) {
    if (req.method !== 'PATCH') {
        return;
    }

    const { password, nextPassword } = req.body;
    if (!password || !nextPassword) {
        return res.status(400).json({
            message:
                'Missing one or more fields for request: password nextPassword',
        });
    }

    const session = await getSession({ req });
    console.log(session);
    if (!session || !session.user) {
        return res.status(401).json({ message: 'Permission Denied!' });
    }

    const userEmail = session.user.email;
    await connectToDatabase();

    let user = await User.findOne({ email: userEmail });

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    const currentPassword = user.password;
    const passwordAreEqual = await verifyPassword(password, currentPassword);

    if (!passwordAreEqual) {
        return res.status(403).json({ message: 'Invalid Password.' });
    }

    const hashedPassword = await hashPassword(nextPassword);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Sucessfully updated password' });
}

export default handler;
