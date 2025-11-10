const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Tracking
 *   description: Mood and Sleep tracking management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MoodTrack:
 *       type: object
 *       required:
 *         - trackType
 *         - moodLevel
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         trackType:
 *           type: string
 *           enum: [mood_track]
 *           default: mood_track
 *         moodLevel:
 *           type: string
 *           enum: [happy, calm, natural, anxiety, angry, sad]
 *         moodNote:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         trackType: mood_track
 *         moodLevel: happy
 *         moodNote: Had a great day at work
 *     
 *     SleepTrack:
 *       type: object
 *       required:
 *         - trackType
 *         - sleepIntensity
 *         - sleepDescription
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         trackType:
 *           type: string
 *           enum: [sleep_track]
 *         sleepIntensity:
 *           type: number
 *           minimum: 1
 *           maximum: 12
 *         sleepDescription:
 *           type: string
 *           enum: [excellent, good, fair, poor, terrible]
 *         sleepNote:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         trackType: sleep_track
 *         sleepIntensity: 8
 *         sleepDescription: good
 *         sleepNote: Slept well after exercise
 */

// ==================== MOOD TRACKING ROUTES ====================

/**
 * @swagger
 * /mood/log:
 *   post:
 *     summary: Log daily mood
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moodLevel
 *             properties:
 *               moodLevel:
 *                 type: string
 *                 enum: [happy, calm, natural, anxiety, angry, sad]
 *                 example: happy
 *               moodNote:
 *                 type: string
 *                 example: Feeling great today
 *     responses:
 *       200:
 *         description: Mood logged successfully
 *       400:
 *         description: Invalid mood level
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/mood/log', verifyToken, async (req, res) => {
    try {
        const { moodLevel, moodNote } = req.body;

        const validMoods = ['happy', 'calm', 'natural', 'anxiety', 'angry', 'sad'];
        if (!moodLevel || !validMoods.includes(moodLevel)) {
            return res.status(400).json({
                success: false,
                message: 'Mood level must be one of: happy, calm, natural, anxiety, angry, sad'
            });
        }

        // Check if mood is already logged for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        let mood = await Mood.findOne({
            user: req.user.id,
            trackType: 'mood_track',
            date: { $gte: today, $lt: tomorrow }
        });

        if (mood) {
            // Update existing mood for today
            mood.moodLevel = moodLevel;
            mood.moodNote = moodNote || mood.moodNote;
        } else {
            mood = new Mood({
                user: req.user.id,
                trackType: 'mood_track',
                moodLevel,
                moodNote: moodNote || ''
            });
        }

        await mood.save();

        res.json({
            success: true,
            message: mood.isNew ? 'Mood logged successfully' : 'Mood updated successfully',
            data: mood
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to log mood',
            error: err.message
        });
    }
});

/**
 * @swagger
 * /mood/history:
 *   get:
 *     summary: Get user's mood history
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 30
 *       - in: query
 *         name: moodLevel
 *         schema:
 *           type: string
 *           enum: [happy, calm, natural, anxiety, angry, sad]
 *     responses:
 *       200:
 *         description: Mood history retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/mood/history', verifyToken, async (req, res) => {
    try {
        const { page = 1, limit = 30, moodLevel } = req.query;

        const query = {
            user: req.user.id,
            trackType: 'mood_track'
        };

        if (moodLevel) {
            query.moodLevel = moodLevel;
        }

        const skip = (page - 1) * limit;
        const total = await Mood.countDocuments(query);

        const moods = await Mood.find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            success: true,
            data: moods,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalItems: total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch mood history',
            error: err.message
        });
    }
});

/**
 * @swagger
 * /mood/stats:
 *   get:
 *     summary: Get mood statistics
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           default: 30
 *         description: Number of days to analyze
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/mood/stats', verifyToken, async (req, res) => {
    try {
        const { days = 30 } = req.query;
        const userId = req.user.id;

        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - parseInt(days));

        // Total mood entries
        const total = await Mood.countDocuments({
            user: userId,
            trackType: 'mood_track'
        });

        // Recent entries
        const recentEntries = await Mood.countDocuments({
            user: userId,
            trackType: 'mood_track',
            date: { $gte: daysAgo }
        });

        // Mood distribution
        const distribution = await Mood.aggregate([
            {
                $match: {
                    user: userId,
                    trackType: 'mood_track',
                    date: { $gte: daysAgo }
                }
            },
            {
                $group: {
                    _id: '$moodLevel',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // Most common mood
        const mostCommon = distribution[0] || null;

        res.json({
            success: true,
            stats: {
                total,
                recentEntries,
                mostCommonMood: mostCommon ? {
                    mood: mostCommon._id,
                    count: mostCommon.count
                } : null,
                distribution,
                period: `Last ${days} days`
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch mood statistics',
            error: err.message
        });
    }
});

// ==================== SLEEP TRACKING ROUTES ====================

/**
 * @swagger
 * /track/sleep/log:
 *   post:
 *     summary: Log sleep data
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sleepIntensity
 *               - sleepDescription
 *             properties:
 *               sleepIntensity:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 12
 *                 example: 8
 *               sleepDescription:
 *                 type: string
 *                 enum: [excellent, good, fair, poor, terrible]
 *                 example: good
 *               sleepNote:
 *                 type: string
 *                 example: Slept well after exercise
 *     responses:
 *       200:
 *         description: Sleep logged successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/sleep/log', verifyToken, async (req, res) => {
    try {
        const { sleepIntensity, sleepDescription, sleepNote } = req.body;

        const validDescriptions = ['excellent', 'good', 'fair', 'poor', 'terrible'];

        if (!sleepIntensity || sleepIntensity < 1 || sleepIntensity > 12) {
            return res.status(400).json({
                success: false,
                message: 'Sleep intensity must be between 1 and 12 hours'
            });
        }

        if (!sleepDescription || !validDescriptions.includes(sleepDescription)) {
            return res.status(400).json({
                success: false,
                message: 'Sleep description must be one of: excellent, good, fair, poor, terrible'
            });
        }

        // Check if sleep is already logged for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        let sleep = await Mood.findOne({
            user: req.user.id,
            trackType: 'sleep_track',
            date: { $gte: today, $lt: tomorrow }
        });

        if (sleep) {
            // Update existing sleep record for today
            sleep.sleepIntensity = sleepIntensity;
            sleep.sleepDescription = sleepDescription;
            sleep.sleepNote = sleepNote || sleep.sleepNote;
        } else {
            sleep = new Mood({
                user: req.user.id,
                trackType: 'sleep_track',
                sleepIntensity,
                sleepDescription,
                sleepNote: sleepNote || ''
            });
        }

        await sleep.save();

        res.json({
            success: true,
            message: sleep.isNew ? 'Sleep logged successfully' : 'Sleep updated successfully',
            data: sleep
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to log sleep',
            error: err.message
        });
    }
});

/**
 * @swagger
 * /track/sleep/history:
 *   get:
 *     summary: Get user's sleep history
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 30
 *       - in: query
 *         name: sleepDescription
 *         schema:
 *           type: string
 *           enum: [excellent, good, fair, poor, terrible]
 *     responses:
 *       200:
 *         description: Sleep history retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/sleep/history', verifyToken, async (req, res) => {
    try {
        const { page = 1, limit = 30, sleepDescription } = req.query;

        const query = {
            user: req.user.id,
            trackType: 'sleep_track'
        };

        if (sleepDescription) {
            query.sleepDescription = sleepDescription;
        }

        const skip = (page - 1) * limit;
        const total = await Mood.countDocuments(query);

        const sleepRecords = await Mood.find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            success: true,
            data: sleepRecords,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalItems: total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch sleep history',
            error: err.message
        });
    }
});

/**
 * @swagger
 * /track/sleep/stats:
 *   get:
 *     summary: Get sleep statistics
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           default: 30
 *         description: Number of days to analyze
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/sleep/stats', verifyToken, async (req, res) => {
    try {
        const { days = 30 } = req.query;
        const userId = req.user.id;

        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - parseInt(days));

        // Total sleep entries
        const total = await Mood.countDocuments({
            user: userId,
            trackType: 'sleep_track'
        });

        // Recent entries
        const recentEntries = await Mood.countDocuments({
            user: userId,
            trackType: 'sleep_track',
            date: { $gte: daysAgo }
        });

        // Average sleep hours
        const avgSleep = await Mood.aggregate([
            {
                $match: {
                    user: userId,
                    trackType: 'sleep_track',
                    date: { $gte: daysAgo }
                }
            },
            {
                $group: {
                    _id: null,
                    avgHours: { $avg: '$sleepIntensity' },
                    maxHours: { $max: '$sleepIntensity' },
                    minHours: { $min: '$sleepIntensity' }
                }
            }
        ]);

        // Sleep quality distribution
        const qualityDistribution = await Mood.aggregate([
            {
                $match: {
                    user: userId,
                    trackType: 'sleep_track',
                    date: { $gte: daysAgo }
                }
            },
            {
                $group: {
                    _id: '$sleepDescription',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.json({
            success: true,
            stats: {
                total,
                recentEntries,
                averageSleepHours: avgSleep[0]?.avgHours?.toFixed(1) || 0,
                maxSleepHours: avgSleep[0]?.maxHours || 0,
                minSleepHours: avgSleep[0]?.minHours || 0,
                qualityDistribution,
                period: `Last ${days} days`
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch sleep statistics',
            error: err.message
        });
    }
});

// ==================== COMBINED/COMMON ROUTES ====================

/**
 * @swagger
 * /track/all:
 *   get:
 *     summary: Get all tracking data (mood + sleep)
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 30
 *       - in: query
 *         name: trackType
 *         schema:
 *           type: string
 *           enum: [mood_track, sleep_track]
 *     responses:
 *       200:
 *         description: All tracking data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/all', verifyToken, async (req, res) => {
    try {
        const { page = 1, limit = 30, trackType } = req.query;

        const query = { user: req.user.id };
        if (trackType) {
            query.trackType = trackType;
        }

        const skip = (page - 1) * limit;
        const total = await Mood.countDocuments(query);

        const records = await Mood.find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            success: true,
            data: records,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalItems: total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tracking data',
            error: err.message
        });
    }
});

/**
 * @swagger
 * /track/{id}:
 *   get:
 *     summary: Get single tracking entry by ID
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entry retrieved successfully
 *       404:
 *         description: Entry not found
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 */
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const entry = await Mood.findById(req.params.id).populate('user', 'name email');

        if (!entry) {
            return res.status(404).json({
                success: false,
                message: 'Entry not found'
            });
        }

        // Check if user owns this entry or is admin
        if (entry.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        res.json({
            success: true,
            data: entry
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch entry',
            error: err.message
        });
    }
});

/**
 * @swagger
 * /track/{id}:
 *   put:
 *     summary: Update tracking entry
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moodLevel:
 *                 type: string
 *                 enum: [happy, calm, natural, anxiety, angry, sad]
 *               moodNote:
 *                 type: string
 *               sleepIntensity:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 12
 *               sleepDescription:
 *                 type: string
 *                 enum: [excellent, good, fair, poor, terrible]
 *               sleepNote:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entry updated successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Access denied
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Server error
 */
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const entry = await Mood.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({
                success: false,
                message: 'Entry not found'
            });
        }

        // Check if user owns this entry
        if (entry.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        if (entry.trackType === 'mood_track') {
            const { moodLevel, moodNote } = req.body;

            if (moodLevel) {
                const validMoods = ['happy', 'calm', 'natural', 'anxiety', 'angry', 'sad'];
                if (!validMoods.includes(moodLevel)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid mood level'
                    });
                }
                entry.moodLevel = moodLevel;
            }

            if (moodNote !== undefined) {
                entry.moodNote = moodNote;
            }
        } else if (entry.trackType === 'sleep_track') {
            const { sleepIntensity, sleepDescription, sleepNote } = req.body;

            if (sleepIntensity) {
                if (sleepIntensity < 1 || sleepIntensity > 12) {
                    return res.status(400).json({
                        success: false,
                        message: 'Sleep intensity must be between 1 and 12'
                    });
                }
                entry.sleepIntensity = sleepIntensity;
            }

            if (sleepDescription) {
                const validDescriptions = ['excellent', 'good', 'fair', 'poor', 'terrible'];
                if (!validDescriptions.includes(sleepDescription)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid sleep description'
                    });
                }
                entry.sleepDescription = sleepDescription;
            }

            if (sleepNote !== undefined) {
                entry.sleepNote = sleepNote;
            }
        }

        await entry.save();

        res.json({
            success: true,
            message: 'Entry updated successfully',
            data: entry
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update entry',
            error: err.message
        });
    }
});

/**
 * @swagger
 * /track/{id}:
 *   delete:
 *     summary: Delete tracking entry
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entry deleted successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const entry = await Mood.findById(req.params.id);

        if (!entry) {
            return res.status(404).json({
                success: false,
                message: 'Entry not found'
            });
        }

        // Check if user owns this entry or is admin
        if (entry.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await Mood.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Entry deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete entry',
            error: err.message
        });
    }
});

// ==================== ADMIN ROUTES ====================

/**
 * @swagger
 * /track/admin/all:
 *   get:
 *     summary: Get all tracking data for all users (Admin only)
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: trackType
 *         schema:
 *           type: string
 *           enum: [mood_track, sleep_track]
 *     responses:
 *       200:
 *         description: All tracking data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Server error
 */
router.get('/admin/all', verifyToken, isAdmin, async (req, res) => {
    try {
        const { page = 1, limit = 20, trackType } = req.query;

        const query = {};
        if (trackType) {
            query.trackType = trackType;
        }

        const skip = (page - 1) * limit;
        const total = await Mood.countDocuments(query);

        const records = await Mood.find(query)
            .populate('user', 'name email')
            .sort({ date: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            success: true,
            data: records,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalItems: total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch tracking data',
            error: err.message
        });
    }
});

/**
 * @swagger
 * /track/admin/stats:
 *   get:
 *     summary: Get overall tracking statistics (Admin only)
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Server error
 */
router.get('/admin/stats', verifyToken, isAdmin, async (req, res) => {
    try {
        // Total counts
        const totalMoodEntries = await Mood.countDocuments({ trackType: 'mood_track' });
        const totalSleepEntries = await Mood.countDocuments({ trackType: 'sleep_track' });

        // Recent activity (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentMoods = await Mood.countDocuments({
            trackType: 'mood_track',
            date: { $gte: thirtyDaysAgo }
        });

        const recentSleep = await Mood.countDocuments({
            trackType: 'sleep_track',
            date: { $gte: thirtyDaysAgo }
        });

        // Mood distribution
        const moodDistribution = await Mood.aggregate([
            { $match: { trackType: 'mood_track' } },
            {
                $group: {
                    _id: '$moodLevel',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // Sleep quality distribution
        const sleepQualityDistribution = await Mood.aggregate([
            { $match: { trackType: 'sleep_track' } },
            {
                $group: {
                    _id: '$sleepDescription',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // Average sleep hours
        const avgSleep = await Mood.aggregate([
            { $match: { trackType: 'sleep_track' } },
            {
                $group: {
                    _id: null,
                    avgHours: { $avg: '$sleepIntensity' }
                }
            }
        ]);

        // Active users count (users who tracked in last 30 days)
        const activeUsers = await Mood.distinct('user', {
            date: { $gte: thirtyDaysAgo }
        });

        res.json({
            success: true,
            stats: {
                totals: {
                    moodEntries: totalMoodEntries,
                    sleepEntries: totalSleepEntries,
                    combined: totalMoodEntries + totalSleepEntries
                },
                recent: {
                    moodEntries: recentMoods,
                    sleepEntries: recentSleep,
                    activeUsers: activeUsers.length
                },
                moodDistribution,
                sleepQualityDistribution,
                averageSleepHours: avgSleep[0]?.avgHours?.toFixed(1) || 0
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch admin statistics',
            error: err.message
        });
    }
});

/**
 * @swagger
 * /track/dashboard:
 *   get:
 *     summary: Get combined dashboard data (mood + sleep for today)
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Today's mood
        const todayMood = await Mood.findOne({
            user: userId,
            trackType: 'mood_track',
            date: { $gte: today, $lt: tomorrow }
        });

        // Today's sleep
        const todaySleep = await Mood.findOne({
            user: userId,
            trackType: 'sleep_track',
            date: { $gte: today, $lt: tomorrow }
        });

        // Last 7 days mood trend
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const moodTrend = await Mood.find({
            user: userId,
            trackType: 'mood_track',
            date: { $gte: sevenDaysAgo }
        }).sort({ date: 1 }).select('moodLevel date');

        // Last 7 days sleep trend
        const sleepTrend = await Mood.find({
            user: userId,
            trackType: 'sleep_track',
            date: { $gte: sevenDaysAgo }
        }).sort({ date: 1 }).select('sleepIntensity sleepDescription date');

        // Quick stats
        const moodCount = await Mood.countDocuments({
            user: userId,
            trackType: 'mood_track'
        });

        const sleepCount = await Mood.countDocuments({
            user: userId,
            trackType: 'sleep_track'
        });

        res.json({
            success: true,
            data: {
                today: {
                    mood: todayMood,
                    sleep: todaySleep,
                    moodLogged: !!todayMood,
                    sleepLogged: !!todaySleep
                },
                trends: {
                    mood: moodTrend,
                    sleep: sleepTrend
                },
                totals: {
                    moodEntries: moodCount,
                    sleepEntries: sleepCount
                }
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard data',
            error: err.message
        });
    }
});

module.exports = router;