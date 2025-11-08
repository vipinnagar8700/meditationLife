const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    age: Number,
    gender: String,
    profileImage: { type: String, default: '' },
    meditationGoals: [String],
    meditationDuration: { type: Number, default: 0 }, // total minutes meditated
    bio: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
