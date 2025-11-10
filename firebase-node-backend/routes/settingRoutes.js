// ==================== ROUTES ====================

// routes/settingsRoutes.js
const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const User = require('../models/User');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Application settings management
 */

/**
 * @swagger
 * /settings/all:
 *   get:
 *     summary: Get all settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
router.get('/all', verifyToken, isAdmin, async (req, res) => {
    try {
        const settings = await Settings.getSingleton();

        // Don't send sensitive data to frontend
        const sanitizedSettings = {
            ...settings.toObject(),
            smtp: {
                ...settings.smtp,
                password: settings.smtp.password ? '********' : ''
            },
            payment: {
                stripe: {
                    ...settings.payment.stripe,
                    secretKey: settings.payment.stripe.secretKey ? '********' : '',
                    webhookSecret: settings.payment.stripe.webhookSecret ? '********' : ''
                },
                paypal: {
                    ...settings.payment.paypal,
                    secret: settings.payment.paypal.secret ? '********' : ''
                },
                razorpay: {
                    ...settings.payment.razorpay,
                    secret: settings.payment.razorpay.secret ? '********' : '',
                    webhookSecret: settings.payment.razorpay.webhookSecret ? '********' : ''
                }
            }
        };

        res.json({
            success: true,
            data: sanitizedSettings
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /settings/profile:
 *   put:
 *     summary: Update profile settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
router.put('/profile', verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, email, phone, profilePicture } = req.body;

        const settings = await Settings.getSingleton();

        if (name) settings.profile.name = name;
        if (email) settings.profile.email = email;
        if (phone) settings.profile.phone = phone;
        if (profilePicture) settings.profile.profilePicture = profilePicture;

        await settings.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: settings.profile
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /settings/change-password:
 *   put:
 *     summary: Change admin password
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
router.put('/change-password', verifyToken, isAdmin, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current and new passwords are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters' });
        }

        // Get current user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /settings/fcm:
 *   put:
 *     summary: Update FCM settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
router.put('/fcm', verifyToken, isAdmin, async (req, res) => {
    try {
        const { serverKey, senderId, enabled } = req.body;

        const settings = await Settings.getSingleton();

        if (serverKey !== undefined) settings.fcm.serverKey = serverKey;
        if (senderId !== undefined) settings.fcm.senderId = senderId;
        if (enabled !== undefined) settings.fcm.enabled = enabled;

        await settings.save();

        res.json({
            success: true,
            message: 'FCM settings updated successfully',
            data: settings.fcm
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /settings/firebase:
 *   put:
 *     summary: Update Firebase configuration
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
router.put('/firebase', verifyToken, isAdmin, async (req, res) => {
    try {
        const { firebaseConfig } = req.body;

        if (!firebaseConfig) {
            return res.status(400).json({ message: 'Firebase config is required' });
        }

        // Validate JSON
        try {
            JSON.parse(firebaseConfig);
        } catch (e) {
            return res.status(400).json({ message: 'Invalid JSON format' });
        }

        const settings = await Settings.getSingleton();
        settings.firebase.configJson = firebaseConfig;
        await settings.save();

        res.json({
            success: true,
            message: 'Firebase configuration updated successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /settings/smtp:
 *   put:
 *     summary: Update SMTP settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
router.put('/smtp', verifyToken, isAdmin, async (req, res) => {
    try {
        const { host, port, username, password, fromEmail, fromName, encryption, enabled } = req.body;

        const settings = await Settings.getSingleton();

        if (host !== undefined) settings.smtp.host = host;
        if (port !== undefined) settings.smtp.port = port;
        if (username !== undefined) settings.smtp.username = username;
        if (password !== undefined) settings.smtp.password = password;
        if (fromEmail !== undefined) settings.smtp.fromEmail = fromEmail;
        if (fromName !== undefined) settings.smtp.fromName = fromName;
        if (encryption !== undefined) settings.smtp.encryption = encryption;
        if (enabled !== undefined) settings.smtp.enabled = enabled;

        await settings.save();

        res.json({
            success: true,
            message: 'SMTP settings updated successfully',
            data: {
                ...settings.smtp.toObject(),
                password: '********' // Don't send password back
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /settings/smtp/test:
 *   post:
 *     summary: Test SMTP connection
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
router.post('/smtp/test', verifyToken, isAdmin, async (req, res) => {
    try {
        const settings = await Settings.getSingleton();

        if (!settings.smtp.host || !settings.smtp.port) {
            return res.status(400).json({ message: 'SMTP settings not configured' });
        }

        const transporter = nodemailer.createTransport({
            host: settings.smtp.host,
            port: settings.smtp.port,
            secure: settings.smtp.encryption === 'ssl',
            auth: {
                user: settings.smtp.username,
                pass: settings.smtp.password
            }
        });

        await transporter.verify();

        res.json({
            success: true,
            message: 'SMTP connection successful'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'SMTP connection failed',
            error: err.message
        });
    }
});

/**
 * @swagger
 * /settings/payment/stripe:
 *   put:
 *     summary: Update Stripe settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
router.put('/payment/stripe', verifyToken, isAdmin, async (req, res) => {
    try {
        const { publishableKey, secretKey, webhookSecret, enabled } = req.body;

        const settings = await Settings.getSingleton();

        if (publishableKey !== undefined) settings.payment.stripe.publishableKey = publishableKey;
        if (secretKey !== undefined) settings.payment.stripe.secretKey = secretKey;
        if (webhookSecret !== undefined) settings.payment.stripe.webhookSecret = webhookSecret;
        if (enabled !== undefined) settings.payment.stripe.enabled = enabled;

        await settings.save();

        res.json({
            success: true,
            message: 'Stripe settings updated successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /settings/payment/paypal:
 *   put:
 *     summary: Update PayPal settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
router.put('/payment/paypal', verifyToken, isAdmin, async (req, res) => {
    try {
        const { clientId, secret, mode, enabled } = req.body;

        const settings = await Settings.getSingleton();

        if (clientId !== undefined) settings.payment.paypal.clientId = clientId;
        if (secret !== undefined) settings.payment.paypal.secret = secret;
        if (mode !== undefined) settings.payment.paypal.mode = mode;
        if (enabled !== undefined) settings.payment.paypal.enabled = enabled;

        await settings.save();

        res.json({
            success: true,
            message: 'PayPal settings updated successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /settings/payment/razorpay:
 *   put:
 *     summary: Update Razorpay settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
router.put('/payment/razorpay', verifyToken, isAdmin, async (req, res) => {
    try {
        const { keyId, secret, webhookSecret, enabled } = req.body;

        const settings = await Settings.getSingleton();

        if (keyId !== undefined) settings.payment.razorpay.keyId = keyId;
        if (secret !== undefined) settings.payment.razorpay.secret = secret;
        if (webhookSecret !== undefined) settings.payment.razorpay.webhookSecret = webhookSecret;
        if (enabled !== undefined) settings.payment.razorpay.enabled = enabled;

        await settings.save();

        res.json({
            success: true,
            message: 'Razorpay settings updated successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /settings/app-links:
 *   put:
 *     summary: Update app links
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
router.put('/app-links', verifyToken, isAdmin, async (req, res) => {
    try {
        const { android, ios, maintenanceMode, forceUpdate } = req.body;

        const settings = await Settings.getSingleton();

        if (android) {
            if (android.playStoreUrl !== undefined) settings.appLinks.android.playStoreUrl = android.playStoreUrl;
            if (android.apkUrl !== undefined) settings.appLinks.android.apkUrl = android.apkUrl;
            if (android.version !== undefined) settings.appLinks.android.version = android.version;
            if (android.packageName !== undefined) settings.appLinks.android.packageName = android.packageName;
        }

        if (ios) {
            if (ios.appStoreUrl !== undefined) settings.appLinks.ios.appStoreUrl = ios.appStoreUrl;
            if (ios.version !== undefined) settings.appLinks.ios.version = ios.version;
            if (ios.bundleId !== undefined) settings.appLinks.ios.bundleId = ios.bundleId;
            if (ios.teamId !== undefined) settings.appLinks.ios.teamId = ios.teamId;
        }

        if (maintenanceMode !== undefined) settings.appLinks.maintenanceMode = maintenanceMode;
        if (forceUpdate !== undefined) settings.appLinks.forceUpdate = forceUpdate;

        await settings.save();

        res.json({
            success: true,
            message: 'App links updated successfully',
            data: settings.appLinks
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /settings/web:
 *   put:
 *     summary: Update web settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 */
router.put('/web', verifyToken, isAdmin, async (req, res) => {
    try {
        const { basic, meta, openGraph, twitter, branding, analytics, contact, social } = req.body;

        const settings = await Settings.getSingleton();

        // Update each section
        if (basic) {
            Object.keys(basic).forEach(key => {
                if (basic[key] !== undefined) {
                    settings.web.basic[key] = basic[key];
                }
            });
        }

        if (meta) {
            Object.keys(meta).forEach(key => {
                if (meta[key] !== undefined) {
                    settings.web.meta[key] = meta[key];
                }
            });
        }

        if (openGraph) {
            Object.keys(openGraph).forEach(key => {
                if (openGraph[key] !== undefined) {
                    settings.web.openGraph[key] = openGraph[key];
                }
            });
        }

        if (twitter) {
            Object.keys(twitter).forEach(key => {
                if (twitter[key] !== undefined) {
                    settings.web.twitter[key] = twitter[key];
                }
            });
        }

        if (branding) {
            Object.keys(branding).forEach(key => {
                if (branding[key] !== undefined) {
                    settings.web.branding[key] = branding[key];
                }
            });
        }

        if (analytics) {
            Object.keys(analytics).forEach(key => {
                if (analytics[key] !== undefined) {
                    settings.web.analytics[key] = analytics[key];
                }
            });
        }

        if (contact) {
            Object.keys(contact).forEach(key => {
                if (contact[key] !== undefined) {
                    settings.web.contact[key] = contact[key];
                }
            });
        }

        if (social) {
            Object.keys(social).forEach(key => {
                if (social[key] !== undefined) {
                    settings.web.social[key] = social[key];
                }
            });
        }

        await settings.save();

        res.json({
            success: true,
            message: 'Web settings updated successfully',
            data: settings.web
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /settings/public/web:
 *   get:
 *     summary: Get public web settings (no auth required)
 *     tags: [Settings]
 */
router.get('/public/web', async (req, res) => {
    try {
        const settings = await Settings.getSingleton();

        res.json({
            success: true,
            data: settings.web
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /settings/public/app-links:
 *   get:
 *     summary: Get public app links (no auth required)
 *     tags: [Settings]
 */
router.get('/public/app-links', async (req, res) => {
    try {
        const settings = await Settings.getSingleton();

        res.json({
            success: true,
            data: settings.appLinks
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
