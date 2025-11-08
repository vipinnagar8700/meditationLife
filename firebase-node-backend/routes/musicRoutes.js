const express = require('express');
const router = express.Router();
const Music = require('../models/Music');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Music
 *   description: Music management (free/premium)
 */

/**
 * @swagger
 * /music/upload:
 *   post:
 *     summary: Admin - Upload new music
 *     tags: [Music]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Morning Meditation
 *               url:
 *                 type: string
 *                 example: https://example.com/morning.mp3
 *               category:
 *                 type: string
 *                 example: 63f9ae1234abcd56789ef012
 *               isPremium:
 *                 type: boolean
 *                 example: false
 *               description:
 *                 type: string
 *                 example: Gentle meditation music for morning
 *     responses:
 *       200:
 *         description: Music uploaded successfully
 *       500:
 *         description: Server error
 */
router.post('/upload', verifyToken, isAdmin, async (req, res) => {
    try {
        const { title, url, category, isPremium, description } = req.body;
        const music = new Music({ title, url, category, isPremium, description });
        await music.save();
        res.json({ message: 'Music uploaded', music });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /music/all:
 *   get:
 *     summary: Get all music tracks
 *     tags: [Music]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter music by category ID
 *     responses:
 *       200:
 *         description: List of all music tracks
 *       500:
 *         description: Server error
 */
router.get('/all', async (req, res) => {
    try {
        const { categoryId } = req.query;
        let query = {};
        if (categoryId) query.category = categoryId;

        const musics = await Music.find(query).populate('category', 'name description');
        res.json(musics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /music/{id}:
 *   get:
 *     summary: Get single music track by ID
 *     tags: [Music]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Music ID
 *     responses:
 *       200:
 *         description: Music fetched successfully
 *       404:
 *         description: Music not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
    try {
        const music = await Music.findById(req.params.id).populate('category', 'name description');
        if (!music) return res.status(404).json({ message: 'Music not found' });
        res.json(music);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
