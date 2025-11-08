const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const { verifyToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Mood
 *   description: User mood tracking
 */

/**
 * @swagger
 * /mood/log:
 *   post:
 *     summary: Log daily mood
 *     tags: [Mood]
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
 *                 type: number
 *                 example: 7
 *               note:
 *                 type: string
 *                 example: Feeling calm and focused
 *     responses:
 *       200:
 *         description: Mood logged successfully
 *       500:
 *         description: Server error
 */
router.post('/log', verifyToken, async (req, res) => {
    try {
        const { moodLevel, note } = req.body;

        // Optional: Check if mood is already logged for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let mood = await Mood.findOne({
            user: req.user.id,
            date: { $gte: today },
        });

        if (mood) {
            // Update existing mood for today
            mood.moodLevel = moodLevel;
            mood.note = note || mood.note;
        } else {
            mood = new Mood({ user: req.user.id, moodLevel, note });
        }

        await mood.save();
        res.json({ message: 'Mood logged successfully', mood });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /mood/history:
 *   get:
 *     summary: Get user's mood history
 *     tags: [Mood]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of moods logged by the user
 *       500:
 *         description: Server error
 */
router.get('/history', verifyToken, async (req, res) => {
    try {
        const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 });
        res.json(moods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
