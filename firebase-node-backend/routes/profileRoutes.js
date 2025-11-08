const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management APIs
 */

/**
 * @swagger
 * /profile/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile fetched successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /profile/update:
 *   put:
 *     summary: Update profile information
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Vipin Nagar
 *               age:
 *                 type: number
 *                 example: 28
 *               gender:
 *                 type: string
 *                 example: Male
 *               bio:
 *                 type: string
 *                 example: Meditation enthusiast
 *               meditationGoals:
 *                 type: string
 *                 example: Reduce stress
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       500:
 *         description: Server error
 */
router.put('/update', verifyToken, async (req, res) => {
    try {
        const updates = (({ name, age, gender, bio, meditationGoals }) => ({ name, age, gender, bio, meditationGoals }))(req.body);
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
        res.json({ message: 'Profile updated successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /profile/profile-image:
 *   put:
 *     summary: Update profile image
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileImage:
 *                 type: string
 *                 example: https://example.com/image.png
 *     responses:
 *       200:
 *         description: Profile image updated successfully
 *       500:
 *         description: Server error
 */
router.put('/profile-image', verifyToken, async (req, res) => {
    try {
        const { profileImage } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { profileImage }, { new: true }).select('-password');
        res.json({ message: 'Profile image updated', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /profile/all:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get('/all', verifyToken, isAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
