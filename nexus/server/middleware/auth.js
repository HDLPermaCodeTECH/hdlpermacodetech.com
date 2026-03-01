module.exports = function adminOnly(req, res, next) {
    // In a real app, req.user would be set by a JWT authentication middleware prior to this check

    // For this blueprint demo, we'll check a custom header `X-User-Role`
    const role = req.header('X-User-Role');

    if (role !== "admin") {
        return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }

    next();
};
