const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const { swaggerDocs } = require('./swagger');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

// Routes
const adminRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const musicRoutes = require('./routes/musicRoutes');
const featuredSectionRoutes = require('./routes/featured-sectionRoutes');
const settingRoutes = require('./routes/settingRoutes');
const moodRoutes = require('./routes/moodRoutes');

app.use('/api/user', adminRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/featured', featuredSectionRoutes);
app.use('/api/settings', settingRoutes);
app.use("/api", moodRoutes)

// Home / Login page
app.get('/', (req, res) => {
    res.render('login', { error: null, success: null }); // ✅ Fixed: Added success
});

// Admin Dashboard page
app.get('/admin/dashboard', (req, res) => {
    const user = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    if (!user) return res.redirect('/');
    res.render('dashboard', { user });
});

// Users Management Page
app.get('/admin/users', async (req, res) => {
    try {
        const currentUser = req.cookies.user ? JSON.parse(req.cookies.user) : null;
        if (!currentUser) return res.redirect('/');

        // Fetch all users from database
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.render('users', {
            user: currentUser,
            users: users
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.redirect('/admin/dashboard');
    }
});

// Music Management Page
app.get('/admin/music', async (req, res) => {
    try {
        const currentUser = req.cookies.user ? JSON.parse(req.cookies.user) : null;
        if (!currentUser) return res.redirect('/');

        // Fetch all users from database
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        res.render('music', {
            user: currentUser,
            users: users
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.redirect('/admin/dashboard');
    }
});



// App Featured Section  Page
app.get('/admin/featured-section', async (req, res) => {
    try {
        const currentUser = req.cookies.user ? JSON.parse(req.cookies.user) : null;
        if (!currentUser) return res.redirect('/');

        // Fetch all users from database
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        res.render('featured-section', {
            user: currentUser,
            users: users
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.redirect('/admin/dashboard');
    }
});

// Category Management Page
app.get('/admin/category', async (req, res) => {
    try {
        const currentUser = req.cookies.user ? JSON.parse(req.cookies.user) : null;
        if (!currentUser) return res.redirect('/');

        // Fetch all users from database
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        res.render('category', {
            user: currentUser,
            users: users
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.redirect('/admin/dashboard');
    }
});

// Analytics Management Page
app.get('/admin/analytics', async (req, res) => {
    try {
        const currentUser = req.cookies.user ? JSON.parse(req.cookies.user) : null;
        if (!currentUser) return res.redirect('/');

        // Fetch all users from database
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        res.render('analytics', {
            user: currentUser,
            users: users
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.redirect('/admin/dashboard');
    }
});

// Setting Management Page
app.get('/admin/setting', async (req, res) => {
    try {
        const currentUser = req.cookies.user ? JSON.parse(req.cookies.user) : null;
        if (!currentUser) return res.redirect('/');

        // Fetch all users from database
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        res.render('setting', {
            user: currentUser,
            users: users
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.redirect('/admin/dashboard');
    }
});

// Enquiries Management Page
app.get('/admin/enquiries', async (req, res) => {
    try {
        const currentUser = req.cookies.user ? JSON.parse(req.cookies.user) : null;
        if (!currentUser) return res.redirect('/');

        // Fetch all users from database
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        res.render('enquiries', {
            user: currentUser,
            users: users
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.redirect('/admin/dashboard');
    }
});


// Mood Management Page
app.get('/admin/mood', async (req, res) => {
    try {
        const currentUser = req.cookies.user ? JSON.parse(req.cookies.user) : null;
        if (!currentUser) return res.redirect('/');

        // Fetch all users from database
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        res.render('mood', {
            user: currentUser,
            users: users
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.redirect('/admin/dashboard');
    }
});


// Profile Management Page
app.get('/admin/profile', async (req, res) => {
    try {
        const currentUser = req.cookies.user ? JSON.parse(req.cookies.user) : null;
        if (!currentUser) return res.redirect('/');

        // Fetch all users from database
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        res.render('profile', {
            user: currentUser,
            users: users
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.redirect('/admin/dashboard');
    }
});

// Logout
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('user');
    res.redirect('/');
});




// Swagger
swaggerDocs(app);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.log('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));