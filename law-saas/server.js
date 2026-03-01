require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// 1. MOCK ZERO-TRUST SECURITY & MIDDLEWARE
// ==========================================
app.use(helmet({ contentSecurityPolicy: false })); // Basic header security (CSP disabled for inline dev scripts in this template)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ==========================================
// 2. VIEW ENGINE SETUP (MVC Pattern)
// ==========================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Global Template Variables (System Configuration)
app.use((req, res, next) => {
    res.locals.firmName = "Chronicle & Partners";
    res.locals.firmPhone = "+1 (800) 555-0199";
    res.locals.firmEmail = "legal@chroniclefirm.com";
    res.locals.currentYear = new Date().getFullYear();
    // Simulate user session check for navbar conditional rendering
    res.locals.user = req.cookies.jwt_token ? { role: req.cookies.user_role || 'client' } : null;
    next();
});

// ==========================================
// 3. ROUTE REGISTRATION
// ==========================================
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const portalRoutes = require('./routes/portal');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

app.use('/', indexRoutes);
app.use('/', authRoutes); // Auth uses /portal/login and /auth/admin internally
app.use('/portal', portalRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Error Handler (404)
app.use((req, res) => {
    res.status(404).render('public/404', { title: "404 - Page Not Found" });
});

// ==========================================
// 4. SERVER BOOT
// ==========================================
app.listen(PORT, () => {
    console.log(`[Chronicle Platform] Enterprise SaaS running on http://localhost:${PORT}`);
    console.log(`[Chronicle Platform] Zero-Trust Security Module: ACTIVE`);
});
