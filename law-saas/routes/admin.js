const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');

// Strict Admin-Only Firewall
router.use(requireAuth);
router.use(requireRole(['admin', 'attorney']));

// Mock CRM Data
const crmData = {
    activeClients: 142,
    openCases: 38,
    monthlyRevenue: 850000,
    recentActivity: [
        { log: "Client Robert Harrison uploaded Draft_Agreement_v3.docx", time: "10 mins ago" },
        { log: "Partner Jonathan Weaver concluded Zoom Consultation", time: "1 hr ago" },
        { log: "Invoice #INV-2993 paid via Stripe ($25,000)", time: "3 hrs ago" }
    ]
};

// 1. Admin Dashboard (CRM Overview)
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard', {
        title: "Enterprise CRM",
        user: req.user,
        stats: crmData
    });
});

module.exports = router;
