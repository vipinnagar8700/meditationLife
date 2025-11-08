const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text: String,
    isCorrect: { type: Boolean, default: false } // Optional (if quiz-like)
});

const enquirySchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [optionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
