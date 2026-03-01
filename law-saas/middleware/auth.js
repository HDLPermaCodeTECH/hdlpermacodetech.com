const jwt = require('jsonwebtoken');

// Secret Key for testing (In production, load from `.env`)
const JWT_SECRET = process.env.JWT_SECRET || 'chronicle_super_secret_enterprise_key_2026';

/**
 * Authentication Middleware
 * Validates the JWT from cookies and injects the user context.
 */
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt_token;

    if (!token) {
        return res.redirect('/portal/login?error=Session expired or unauthorized.');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { id, role, email }
        next();
    } catch (err) {
        res.clearCookie('jwt_token');
        return res.redirect('/portal/login?error=Invalid token.');
    }
};

/**
 * Role-Based Access Control (RBAC) Middleware
 * Ensures the authenticated user has the necessary privileges.
 */
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            // Log security event concept here
            console.warn(`[Security Alert] Unauthorized access attempt by user ID: ${req.user ? req.user.id : 'Unknown'}`);
            return res.status(403).render('public/404', { title: "403 Forbidden - Zero Trust Enforced" });
        }
        next();
    };
};

module.exports = {
    requireAuth,
    requireRole,
    JWT_SECRET
};
