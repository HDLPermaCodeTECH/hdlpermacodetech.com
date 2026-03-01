const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../client')));

// Mock Database (Simulating MongoDB/SQL)
const db = {
    templates: [
        {
            id: "nt_001",
            name: "Aura Luxury Retail",
            description: "High-end e-commerce blueprint with cinematic product galleries.",
            price: 79.00,
            category: "E-Commerce",
            preview_image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
            created_at: "2023-11-01"
        },
        {
            id: "nt_002",
            name: "FinFlow Capital",
            description: "Modern fintech dashboard and landing page for SaaS setups.",
            price: 59.00,
            category: "SaaS",
            preview_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            created_at: "2023-10-15"
        },
        {
            id: "nt_003",
            name: "Horizon Clinical",
            description: "Healthcare and telemedicine scheduling portal.",
            price: 65.00,
            category: "Healthcare",
            preview_image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
            created_at: "2023-09-22"
        },
        {
            id: "nt_004",
            name: "Enterprise Nexus",
            description: "End-to-end SaaS Marketplace with API and node.js backend.",
            price: 149.00,
            category: "Platform",
            preview_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
            created_at: "2023-12-05"
        }
    ],
    users: [],
    licenses: [],
    purchases: []
};

// --- API ROUTES ---

// 1. Templates API (api/templates.js logic merged here for simplicity in this demo)
app.get('/api/templates', (req, res) => {
    // Optional filtering query params
    let results = db.templates;
    if (req.query.category) {
        results = results.filter(t => t.category.toLowerCase() === req.query.category.toLowerCase());
    }
    if (req.query.search) {
        results = results.filter(t => t.name.toLowerCase().includes(req.query.search.toLowerCase()));
    }
    res.json(results);
});

app.get('/api/templates/:id', (req, res) => {
    const template = db.templates.find(t => t.id === req.params.id);
    if (!template) return res.status(404).json({ error: "Template not found" });
    res.json(template);
});


// 2. Payments API mock
app.post('/api/create-checkout', (req, res) => {
    const { templateId } = req.body;
    const template = db.templates.find(t => t.id === templateId);

    if (!template) return res.status(404).json({ error: "Template not found" });

    // Simulate Stripe Checkout session response
    const mockSessionUrl = `/client/checkout-success.html?tid=${templateId}`;
    res.json({ session_url: mockSessionUrl });
});

// 3. License Generation & Verification API
app.post('/api/license/generate', (req, res) => {
    const { templateId, userId } = req.body;
    const licenseKey = `NEXUS-${Math.random().toString(36).substr(2, 9).toUpperCase()}-${Date.now()}`;

    const newLicense = {
        id: `lic_${Date.now()}`,
        user_id: userId || 'demo_user',
        template_id: templateId,
        license_key: licenseKey,
        status: 'active',
        created_at: new Date().toISOString()
    };

    db.licenses.push(newLicense);
    res.json(newLicense);
});

app.post('/api/license/verify', (req, res) => {
    const { license_key } = req.body;
    const license = db.licenses.find(l => l.license_key === license_key);

    if (!license || license.status !== 'active') {
        return res.status(403).json({ valid: false, error: "Invalid or inactive license" });
    }

    res.json({ valid: true, template_id: license.template_id });
});

// 4. Admin API Mocks
app.get('/api/admin/stats', (req, res) => {
    // Calculate dummy stats
    const totalSales = db.licenses.length;
    let revenue = 0;
    db.licenses.forEach(l => {
        const t = db.templates.find(tx => tx.id === l.template_id);
        if (t) revenue += t.price;
    });

    res.json({
        total_users: 154,
        total_sales: totalSales + 42,
        revenue: revenue + 8500,
        active_licenses: db.licenses.length + 42
    });
});

// Catch-all route to serve the SPA index if strictly using React/Vue, but here we serve static HTML
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`[Enterprise Nexus] Server running on http://localhost:${PORT}`);
});
