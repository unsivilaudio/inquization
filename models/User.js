import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['teacher', 'aide', 'student'],
        default: 'student',
    },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
