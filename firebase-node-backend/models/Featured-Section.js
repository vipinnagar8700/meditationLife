const mongoose = require('mongoose');

const featuredSectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        icon_Image: {
            type: String,
            required: true, // if you want to make it optional, remove this line
            trim: true,
        },
        description: {
            type: String,
            default: '',
            trim: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('FeaturedSection', featuredSectionSchema);
