import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
        },
        category: {
            type: String,
            required: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        summary: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
            },
        ],
        version: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

quizSchema.pre('save', function (next) {
    if (this.createdAt === this.updatedAt) {
        return next();
    }

    this.version += 1;
    next();
});

export default mongoose?.models?.Quiz || mongoose.model('Quiz', quizSchema);
