const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

// Note: For template viability without db requirement, we simulate the database logic.
const MOCK_DB = {
    client: { id: "u1", email: "client@demo.com", password: "password123", role: "client", name: "Robert Harrison" },
    admin: { id: "a1", email: "admin@chronicle.com", password: "admin123", role: "admin", name: "Elaine Sterling" }
};

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// 1. Client Portal Login Page
router.get('/portal/login', (req, res) => {
    if (req.cookies.jwt_token) return res.redirect('/portal/dashboard');
    res.render('public/login', { title: "Client Portal Login", mode: "client", error: req.query.error });
});

// 2. Admin/Attorney Login Page
router.get('/auth/admin', (req, res) => {
    if (req.cookies.jwt_token) return res.redirect('/admin/dashboard');
    res.render('public/login', { title: "Enterprise Admin Node", mode: "admin", error: req.query.error });
});

// 3. Login POST Processor
router.post('/login', (req, res) => {
    const { email, password, mode } = req.body;

    // Pseudo-DB check
    let user = null;
    if (email === MOCK_DB.client.email && password === MOCK_DB.client.password) user = MOCK_DB.client;
    if (email === MOCK_DB.admin.email && password === MOCK_DB.admin.password) user = MOCK_DB.admin;

    if (!user) {
        const redirectPath = mode === 'admin' ? '/auth/admin' : '/portal/login';
        return res.redirect(`${redirectPath}?error=Invalid credentials`);
    }

    // Sign JWT
    const token = jwt.sign(
        { id: user.id, role: user.role, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: '8h' }
    );

    // Set secure HttpOnly cookie for Zero Trust pipeline
    res.cookie('jwt_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 8 * 60 * 60 * 1000
    });

    // Route based on role
    if (user.role === 'admin') {
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/portal/dashboard');
    }
});

// 4. Logout
router.get('/logout', (req, res) => {
    res.clearCookie('jwt_token');
    res.redirect('/');
});


module.exports = router;
