const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        moodLevel: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        note: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Mood', moodSchema);
