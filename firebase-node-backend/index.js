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
app.use('/api/user', adminRoutes);
app.use('/api/category', categoryRoutes);

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

// Logout
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('user');
    res.redirect('/');
});

// Admin Login POST
app.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render('login', {
                error: 'Email and password are required',
                success: null
            });
        }

        const admin = await User.findOne({ email, role: 'admin' });

        if (!admin) {
            return res.render('login', {
                error: 'Not an admin or invalid email',
                success: null
            });
        }

        const valid = await bcrypt.compare(password, admin.password);

        if (!valid) {
            return res.render('login', {
                error: 'Invalid password',
                success: null
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Set cookies
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production' // ✅ Added security
        });

        res.cookie('user', JSON.stringify({
            id: admin._id,
            name: admin.name,
            email: admin.email
        }), {
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Redirect to dashboard
        res.redirect('/admin/dashboard');

    } catch (err) {
        console.error('Login error:', err);
        res.render('login', {
            error: 'Server error occurred',
            success: null
        });
    }
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