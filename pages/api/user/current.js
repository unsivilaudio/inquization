import { useSession } from 'next-auth/react';
import User from '../../../models/User';

export default async function useHandler(req, res) {
    let user;
    const { data: session } = useSession();

    if (session.user?.id) {
        user = await User.findById(session.user.id);
    }

    if (!user) {
        return res.status(200).json(user);
    }

    return res.status(401).send({ message: 'Please log in again.' });
}
