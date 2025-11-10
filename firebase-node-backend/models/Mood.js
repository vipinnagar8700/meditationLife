const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        trackType: {
            type: String,
            enum: ['mood_track', 'sleep_track'],
            required: true,
            default: 'mood_track'
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },

        // Mood Track Fields
        moodLevel: {
            type: String,
            enum: ['happy', 'calm', 'natural', 'anxiety', 'angry', 'sad'],
            required: function () {
                return this.trackType === 'mood_track';
            }
        },
        moodNote: {
            type: String,
            default: '',
        },

        // Sleep Track Fields
        sleepIntensity: {
            type: Number,
            min: 1,
            max: 12,
            required: function () {
                return this.trackType === 'sleep_track';
            }
        },
        sleepDescription: {
            type: String,
            enum: ['excellent', 'good', 'fair', 'poor', 'terrible'],
            required: function () {
                return this.trackType === 'sleep_track';
            }
        },
        sleepNote: {
            type: String,
            default: '',
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Index for faster queries
moodSchema.index({ user: 1, date: -1 });
moodSchema.index({ user: 1, trackType: 1, date: -1 });

// Virtual for formatted date
moodSchema.virtual('formattedDate').get(function () {
    return this.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
});

module.exports = mongoose.model('Mood', moodSchema);