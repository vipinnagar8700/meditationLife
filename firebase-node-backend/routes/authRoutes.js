const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
// Middleware for token verification



/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User and Admin authentication APIs
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     description: Creates a new user account for the meditation app.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Vipin Nagar
 *               email:
 *                 type: string
 *                 example: vipin@example.com
 *               password:
 *                 type: string
 *                 example: Vipin@123
 *               age:
 *                 type: number
 *                 example: 28
 *               gender:
 *                 type: string
 *                 example: Male
 *               meditationGoals:
 *                 type: string
 *                 example: Stress relief and focus
 *     responses:
 *       200:
 *         description: Signup successful
 *       400:
 *         description: Email already exists
 */
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, age, gender, meditationGoals } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already exists' });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashed,
            age,
            gender,
            meditationGoals,
            role: 'user',
        });
        await user.save();

        res.json({ message: 'Signup successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user (email/password)
 *     tags: [Authentication]
 *     description: Logs in a normal user using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: vipin@example.com
 *               password:
 *                 type: string
 *                 example: Vipin@123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /user/admin/login:
 *   post:
 *     summary: Admin login only
 *     tags: [Authentication]
 *     description: Allows only users with the role 'admin' to log in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@meditationapp.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Admin login successful
 *       401:
 *         description: Invalid password
 *       403:
 *         description: Not an admin
 */
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin) return res.status(403).json({ message: 'Not an admin' });

        const valid = await bcrypt.compare(password, admin.password);
        if (!valid) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Admin login successful',
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * tags:
 *   name: User Management
 *   description: Admin APIs for managing users (CRUD operations)
 */

/**
 * @swagger
 * /user/admin/users:
 *   get:
 *     summary: Get all users with filters and pagination
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *         description: Filter by role
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [male, female, other]
 *         description: Filter by gender
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
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
router.get('/admin/users', verifyToken, isAdmin, async (req, res) => {
    try {
        const {
            search = '',
            gender = '',
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        const filter = { role: 'user' }; // 👈 Only show normal users

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (gender) filter.gender = gender;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const sortOrder = order === 'asc' ? 1 : -1;

        const users = await User.find(filter)
            .select('-password')
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(filter);

        res.json({
            success: true,
            data: users,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


/**
 * @swagger
 * /user/admin/users/{id}:
 *   get:
 *     summary: Get single user by ID
 *     tags: [User Management]
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
 *         description: User fetched successfully
 */
router.get('/admin/users/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * @swagger
 * /user/admin/users:
 *   post:
 *     summary: Create new user (Admin)
 *     tags: [User Management]
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
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/admin/users', verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, email, password, role, age, gender, meditationGoals } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
            age,
            gender,
            meditationGoals
        });

        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userResponse
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * @swagger
 * /user/admin/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put('/admin/users/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, email, role, age, gender, meditationGoals, password } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ success: false, message: 'Email already taken' });
            }
        }

        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (role) updates.role = role;
        if (age) updates.age = age;
        if (gender) updates.gender = gender;
        if (meditationGoals) updates.meditationGoals = meditationGoals;

        if (password) {
            updates.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * @swagger
 * /user/admin/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User Management]
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
 *         description: User deleted successfully
 */
router.delete('/admin/users/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        if (req.params.id === req.user.id) {
            return res.status(400).json({
                success: false,
                message: 'You cannot delete your own account'
            });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * @swagger
 * /user/admin/users/stats/summary:
 *   get:
 *     summary: Get user statistics
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics fetched successfully
 */
router.get('/admin/users/stats/summary', verifyToken, isAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const adminUsers = await User.countDocuments({ role: 'admin' });
        const regularUsers = await User.countDocuments({ role: 'user' });
        const maleUsers = await User.countDocuments({ gender: 'male' });
        const femaleUsers = await User.countDocuments({ gender: 'female' });

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentUsers = await User.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        res.json({
            success: true,
            data: {
                total: totalUsers,
                admins: adminUsers,
                regularUsers: regularUsers,
                maleUsers: maleUsers,
                femaleUsers: femaleUsers,
                recentUsers: recentUsers
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


// Add these routes to your existing userRoutes.js file

/**
 * @swagger
 * tags:
 *   name: Admin Profile
 *   description: Admin profile management APIs
 */

/**
 * @swagger
 * /user/admin/profile:
 *   get:
 *     summary: Get admin profile
 *     tags: [Admin Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin profile fetched successfully
 *       404:
 *         description: Admin not found
 */
router.get('/admin/profile', verifyToken, isAdmin, async (req, res) => {
    try {
        const admin = await User.findById(req.user.id).select('-password');

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        res.json({
            success: true,
            data: admin
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * @swagger
 * /user/admin/profile:
 *   put:
 *     summary: Update admin profile
 *     tags: [Admin Profile]
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
 *                 example: Admin Name
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               age:
 *                 type: number
 *                 example: 30
 *               gender:
 *                 type: string
 *                 example: male
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Email already taken
 *       404:
 *         description: Admin not found
 */
router.put('/admin/profile', verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, email, age, gender } = req.body;

        const admin = await User.findById(req.user.id);
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        // Check if email is being changed and if it already exists
        if (email && email !== admin.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already taken'
                });
            }
        }

        // Update only provided fields
        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (age) updates.age = age;
        if (gender) updates.gender = gender;

        const updatedAdmin = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedAdmin
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * @swagger
 * /user/admin/profile/change-password:
 *   put:
 *     summary: Change admin password
 *     tags: [Admin Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: OldPass@123
 *               newPassword:
 *                 type: string
 *                 example: NewPass@123
 *               confirmPassword:
 *                 type: string
 *                 example: NewPass@123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid current password or passwords don't match
 *       404:
 *         description: Admin not found
 */
router.put('/admin/profile/change-password', verifyToken, isAdmin, async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // Validation
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password and new password are required'
            });
        }

        if (confirmPassword && newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'New passwords do not match'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters long'
            });
        }

        // Find admin with password field
        const admin = await User.findById(req.user.id);
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, admin.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Check if new password is same as current
        const isSamePassword = await bcrypt.compare(newPassword, admin.password);
        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: 'New password must be different from current password'
            });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await admin.save();

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});


module.exports = router;