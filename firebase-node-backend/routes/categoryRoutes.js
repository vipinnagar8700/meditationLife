const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Music category management with full CRUD operations
 */

/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Admin - Create a new category
 *     tags: [Category]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Meditation
 *               description:
 *                 type: string
 *                 example: Relaxing meditation music
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400:
 *         description: Category already exists
 *       500:
 *         description: Server error
 */

router.post('/create', verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validation
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Category name is required' });
        }

        // Check if category already exists (case-insensitive)
        const existing = await Category.findOne({
            name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }
        });

        if (existing) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = new Category({
            name: name.trim(),
            description: description?.trim() || ''
        });

        await category.save();
        res.json({
            message: 'Category created successfully',
            data: category
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /category/all:
 *   get:
 *     summary: Get all categories with pagination, search, and filters
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or description
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, createdAt]
 *           default: createdAt
 *         description: Sort field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of categories with pagination
 *       500:
 *         description: Server error
 */
router.get('/all', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order === 'asc' ? 1 : -1;

        // Build search query
        const query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Get total count
        const totalCategories = await Category.countDocuments(query);
        const totalPages = Math.ceil(totalCategories / limit);

        // Fetch categories with pagination
        const categories = await Category.find(query)
            .sort({ [sortBy]: order })
            .limit(limit)
            .skip((page - 1) * limit);

        res.json({
            success: true,
            data: categories,
            pagination: {
                page,
                limit,
                totalPages,
                totalItems: totalCategories,
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
 * /category/{id}:
 *   get:
 *     summary: Get a single category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({
            success: true,
            data: category
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Admin - Update a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid data or duplicate name
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validation
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Category name is required' });
        }

        // Check if category exists
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Check for duplicate name (excluding current category)
        const duplicate = await Category.findOne({
            name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
            _id: { $ne: req.params.id }
        });

        if (duplicate) {
            return res.status(400).json({ message: 'Category name already exists' });
        }

        // Update category
        category.name = name.trim();
        category.description = description?.trim() || '';

        await category.save();

        res.json({
            message: 'Category updated successfully',
            data: category
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Admin - Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({
            message: 'Category deleted successfully',
            data: category
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /category/bulk-delete:
 *   post:
 *     summary: Admin - Delete multiple categories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
 *     responses:
 *       200:
 *         description: Categories deleted successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.post('/bulk-delete', verifyToken, isAdmin, async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Please provide an array of category IDs' });
        }

        const result = await Category.deleteMany({ _id: { $in: ids } });

        res.json({
            message: 'Categories deleted successfully',
            deletedCount: result.deletedCount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /category/stats:
 *   get:
 *     summary: Get category statistics
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Category statistics
 *       500:
 *         description: Server error
 */
router.get('/stats/overview', async (req, res) => {
    try {
        const totalCategories = await Category.countDocuments();
        const recentCategories = await Category.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        });

        res.json({
            success: true,
            stats: {
                totalCategories,
                recentCategories,
                lastUpdated: new Date()
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;