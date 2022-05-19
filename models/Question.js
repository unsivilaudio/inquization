import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    answers: [
        {
            type: String,
        },
    ],
    correctAnswer: {
        type: Number,
        required: true,
    },
});

export default mongoose?.models?.Question ||
    mongoose.model('Question', questionSchema);
