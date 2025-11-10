const express = require('express');
const router = express.Router();
const Music = require('../models/Music');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

/**
 * Upload new music (Admin only)
 */
router.post('/upload', verifyToken, isAdmin, async (req, res) => {
    try {
        const { title, url, category, isPremium, description } = req.body;

        if (!title || !url || !category) {
            return res.status(400).json({
                success: false,
                message: 'Title, URL, and category are required'
            });
        }

        const music = new Music({
            title,
            url,
            category,
            isPremium: isPremium || false,
            description
        });

        await music.save();

        res.status(201).json({
            success: true,
            message: 'Music uploaded successfully',
            data: music
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to upload music',
            error: err.message
        });
    }
});

/**
 * Get all music with pagination and filters
 */
router.get('/all', verifyToken, async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            categoryId = '',
            isPremium = ''
        } = req.query;

        const query = {};

        // Search filter
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Category filter
        if (categoryId) {
            query.category = categoryId;
        }

        // Premium status filter
        if (isPremium !== '') {
            query.isPremium = isPremium === 'true';
        }

        const skip = (page - 1) * limit;
        const total = await Music.countDocuments(query);
        const musics = await Music.find(query)
            .populate('category', 'name description')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Calculate stats
        const freeCount = await Music.countDocuments({ isPremium: false });
        const premiumCount = await Music.countDocuments({ isPremium: true });

        res.json({
            success: true,
            data: musics,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalItems: total,
                totalPages: Math.ceil(total / limit),
                hasPrev: page > 1,
                hasNext: page < Math.ceil(total / limit)
            },
            stats: {
                total,
                free: freeCount,
                premium: premiumCount
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch music',
            error: err.message
        });
    }
});

/**
 * Get single music by ID
 */
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const music = await Music.findById(req.params.id)
            .populate('category', 'name description');

        if (!music) {
            return res.status(404).json({
                success: false,
                message: 'Music not found'
            });
        }

        res.json({
            success: true,
            data: music
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch music',
            error: err.message
        });
    }
});

/**
 * Update music (Admin only)
 */
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const { title, url, category, isPremium, description } = req.body;

        const music = await Music.findByIdAndUpdate(
            req.params.id,
            { title, url, category, isPremium, description },
            { new: true, runValidators: true }
        ).populate('category', 'name description');

        if (!music) {
            return res.status(404).json({
                success: false,
                message: 'Music not found'
            });
        }

        res.json({
            success: true,
            message: 'Music updated successfully',
            data: music
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update music',
            error: err.message
        });
    }
});

/**
 * Toggle Premium Status (Admin only)
 */
router.patch('/:id/toggle-status', verifyToken, isAdmin, async (req, res) => {
    try {
        const music = await Music.findById(req.params.id);

        if (!music) {
            return res.status(404).json({
                success: false,
                message: 'Music not found'
            });
        }

        music.isPremium = !music.isPremium;
        await music.save();

        res.json({
            success: true,
            message: `Music status changed to ${music.isPremium ? 'Premium' : 'Free'}`,
            data: music
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to toggle status',
            error: err.message
        });
    }
});

/**
 * Delete music (Admin only)
 */
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const music = await Music.findByIdAndDelete(req.params.id);

        if (!music) {
            return res.status(404).json({
                success: false,
                message: 'Music not found'
            });
        }

        res.json({
            success: true,
            message: 'Music deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete music',
            error: err.message
        });
    }
});

/**
 * Get music statistics (Admin only)
 */
router.get('/stats/overview', verifyToken, isAdmin, async (req, res) => {
    try {
        const total = await Music.countDocuments();
        const free = await Music.countDocuments({ isPremium: false });
        const premium = await Music.countDocuments({ isPremium: true });

        // Get recent music (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recent = await Music.countDocuments({
            createdAt: { $gte: thirtyDaysAgo }
        });

        res.json({
            success: true,
            stats: {
                total,
                free,
                premium,
                recent
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics',
            error: err.message
        });
    }
});

module.exports = router;