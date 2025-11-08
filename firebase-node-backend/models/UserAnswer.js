const mongoose = require('mongoose');

const userAnswerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    enquiry: { type: mongoose.Schema.Types.ObjectId, ref: 'Enquiry' },
    selectedOption: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    answeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserAnswer', userAnswerSchema);
