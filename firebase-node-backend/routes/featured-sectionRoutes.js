const express = require('express');
const router = express.Router();
const FeaturedSection = require('../models/Featured-Section');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: FeaturedSection
 *   description: Featured Section management with full CRUD operations
 */

/**
 * @swagger
 * /featured/create:
 *   post:
 *     summary: Admin - Create a new featured section
 *     tags: [FeaturedSection]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - icon_Image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Relaxation
 *               icon_Image:
 *                 type: string
 *                 example: https://example.com/icons/relaxation.png
 *               description:
 *                 type: string
 *                 example: Section for relaxation and focus music
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       200:
 *         description: Featured section created successfully
 *       400:
 *         description: Section already exists
 *       500:
 *         description: Server error
 */

router.post('/create', verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, icon_Image, description, status } = req.body;

        if (!name || !icon_Image) {
            return res.status(400).json({ message: 'Name and icon_Image are required' });
        }

        const existing = await FeaturedSection.findOne({
            name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }
        });

        if (existing) {
            return res.status(400).json({ message: 'Featured section already exists' });
        }

        const section = new FeaturedSection({
            name: name.trim(),
            icon_Image: icon_Image.trim(),
            description: description?.trim() || '',
            status: status || 'active'
        });

        await section.save();

        res.json({
            message: 'Featured section created successfully',
            data: section
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /featured/all:
 *   get:
 *     summary: Get all featured sections with pagination, search, and filters
 *     tags: [FeaturedSection]
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
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, createdAt]
 *           default: createdAt
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: List of featured sections
 */
router.get('/all', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const status = req.query.status;
        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order === 'asc' ? 1 : -1;

        const query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        if (status) query.status = status;

        const total = await FeaturedSection.countDocuments(query);
        const totalPages = Math.ceil(total / limit);

        const sections = await FeaturedSection.find(query)
            .sort({ [sortBy]: order })
            .limit(limit)
            .skip((page - 1) * limit);

        res.json({
            success: true,
            data: sections,
            pagination: {
                page,
                limit,
                totalPages,
                totalItems: total,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /featured/{id}:
 *   get:
 *     summary: Get a single featured section by ID
 *     tags: [FeaturedSection]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Featured section details
 */
router.get('/:id', async (req, res) => {
    try {
        const section = await FeaturedSection.findById(req.params.id);
        if (!section) return res.status(404).json({ message: 'Featured section not found' });
        res.json({ success: true, data: section });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /featured/{id}:
 *   put:
 *     summary: Admin - Update a featured section
 *     tags: [FeaturedSection]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, icon_Image, description, status } = req.body;

        const section = await FeaturedSection.findById(req.params.id);
        if (!section) return res.status(404).json({ message: 'Featured section not found' });

        if (name) {
            const duplicate = await FeaturedSection.findOne({
                name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
                _id: { $ne: req.params.id }
            });
            if (duplicate) {
                return res.status(400).json({ message: 'Name already exists' });
            }
            section.name = name.trim();
        }

        if (icon_Image) section.icon_Image = icon_Image.trim();
        if (description) section.description = description.trim();
        if (status) section.status = status;

        await section.save();

        res.json({
            message: 'Featured section updated successfully',
            data: section
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /featured/{id}:
 *   delete:
 *     summary: Admin - Delete a featured section
 *     tags: [FeaturedSection]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const section = await FeaturedSection.findByIdAndDelete(req.params.id);
        if (!section) return res.status(404).json({ message: 'Featured section not found' });
        res.json({ message: 'Featured section deleted successfully', data: section });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /featured/bulk-delete:
 *   post:
 *     summary: Admin - Delete multiple featured sections
 *     tags: [FeaturedSection]
 *     security:
 *       - bearerAuth: []
 */
router.post('/bulk-delete', verifyToken, isAdmin, async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Please provide an array of IDs' });
        }
        const result = await FeaturedSection.deleteMany({ _id: { $in: ids } });
        res.json({ message: 'Featured sections deleted successfully', deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /featured/stats/overview:
 *   get:
 *     summary: Get featured section statistics
 *     tags: [FeaturedSection]
 */
router.get('/stats/overview', async (req, res) => {
    try {
        const total = await FeaturedSection.countDocuments();
        const active = await FeaturedSection.countDocuments({ status: 'active' });
        const inactive = await FeaturedSection.countDocuments({ status: 'inactive' });

        res.json({
            success: true,
            stats: {
                totalSections: total,
                activeSections: active,
                inactiveSections: inactive,
                lastUpdated: new Date()
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
