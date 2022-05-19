import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    answers: [
        {
            type: Number,
        },
    ],
    score: {
        type: Number,
    },
    passing: {
        type: Boolean,
    },
});

export default mongoose?.models?.Submission ||
    mongoose.model('Submission', submissionSchema);
