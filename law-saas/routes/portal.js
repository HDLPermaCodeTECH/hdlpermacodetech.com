const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');

// Apply base authentication to ALL portal routes
router.use(requireAuth);
// Ensure only clients (or admins acting as clients) can access this specific nested portal
router.use(requireRole(['client', 'admin']));

// Mock Client Data
const clientData = {
    cases: [
        { id: "C-9921", title: "Merger Acquisition Corp.", status: "Active", nextDate: "2026-03-15" },
        { id: "C-8842", title: "IP Trademark Defense", status: "Pending Settlement", nextDate: "2026-04-02" }
    ],
    documents: [
        { type: "pdf", name: "NDA_Signed_Final.pdf", size: "2.4 MB", date: "2026-02-28" },
        { type: "doc", name: "Draft_Agreement_v3.docx", size: "1.1 MB", date: "2026-03-01" },
        { type: "pdf", name: "Retainer_Invoice.pdf", size: "400 KB", date: "2026-01-15", requiresSignature: true }
    ],
    appointments: [
        { id: "apt-1", with: "Jonathan Weaver", type: "Zoom Video", date: "2026-03-10", time: "11:00 AM EST" }
    ]
};


// 1. Dashboard Home
router.get('/dashboard', (req, res) => {
    res.render('portal/dashboard', {
        title: "Client Portal",
        user: req.user,
        activePage: 'dashboard',
        cases: clientData.cases,
        appointments: clientData.appointments
    });
});

// 2. Cases
router.get('/cases', (req, res) => {
    res.render('portal/cases', { title: "My Cases", user: req.user, activePage: 'cases', cases: clientData.cases });
});

// 3. Documents & Signatures
router.get('/documents', (req, res) => {
    res.render('portal/documents', { title: "Secure Documents", user: req.user, activePage: 'documents', docs: clientData.documents });
});

module.exports = router;
