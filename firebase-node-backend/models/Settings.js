// models/Settings.js
const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    // Profile Settings
    profile: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        profilePicture: { type: String }
    },

    // FCM Settings
    fcm: {
        serverKey: { type: String },
        senderId: { type: String },
        enabled: { type: Boolean, default: false }
    },

    // Firebase Configuration
    firebase: {
        configJson: { type: String } // Store as JSON string
    },

    // SMTP Settings
    smtp: {
        host: { type: String },
        port: { type: Number },
        username: { type: String },
        password: { type: String },
        fromEmail: { type: String },
        fromName: { type: String },
        encryption: { type: String, enum: ['tls', 'ssl', 'none'], default: 'tls' },
        enabled: { type: Boolean, default: false }
    },

    // Payment Gateways
    payment: {
        stripe: {
            publishableKey: { type: String },
            secretKey: { type: String },
            webhookSecret: { type: String },
            enabled: { type: Boolean, default: false }
        },
        paypal: {
            clientId: { type: String },
            secret: { type: String },
            mode: { type: String, enum: ['sandbox', 'live'], default: 'sandbox' },
            enabled: { type: Boolean, default: false }
        },
        razorpay: {
            keyId: { type: String },
            secret: { type: String },
            webhookSecret: { type: String },
            enabled: { type: Boolean, default: false }
        }
    },

    // App Links
    appLinks: {
        android: {
            playStoreUrl: { type: String },
            apkUrl: { type: String },
            version: { type: String },
            packageName: { type: String }
        },
        ios: {
            appStoreUrl: { type: String },
            version: { type: String },
            bundleId: { type: String },
            teamId: { type: String }
        },
        maintenanceMode: { type: Boolean, default: false },
        forceUpdate: { type: Boolean, default: false }
    },

    // Web Settings
    web: {
        basic: {
            title: { type: String },
            url: { type: String },
            description: { type: String }
        },
        meta: {
            title: { type: String },
            description: { type: String },
            keywords: { type: String },
            author: { type: String }
        },
        openGraph: {
            title: { type: String },
            type: { type: String, default: 'website' },
            description: { type: String },
            image: { type: String }
        },
        twitter: {
            card: { type: String, default: 'summary' },
            site: { type: String },
            title: { type: String },
            description: { type: String },
            image: { type: String }
        },
        branding: {
            faviconUrl: { type: String },
            logoUrl: { type: String }
        },
        analytics: {
            googleAnalytics: { type: String },
            facebookPixel: { type: String },
            googleTagManager: { type: String },
            hotjarId: { type: String }
        },
        contact: {
            email: { type: String },
            phone: { type: String },
            address: { type: String }
        },
        social: {
            facebook: { type: String },
            twitter: { type: String },
            instagram: { type: String },
            linkedin: { type: String },
            youtube: { type: String },
            github: { type: String }
        }
    }
}, {
    timestamps: true
});

// Ensure only one settings document exists
settingsSchema.statics.getSingleton = async function () {
    let settings = await this.findOne();
    if (!settings) {
        settings = await this.create({});
    }
    return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);