import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
    {
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
        quizVersion: {
            type: String,
            required: true,
        },
        answers: [
            {
                questionId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Question',
                },
                answer: {
                    type: Number,
                },
            },
        ],
        score: {
            type: Number,
        },
        passing: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

export default mongoose?.models?.Submission ||
    mongoose.model('Submission', submissionSchema);
