const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');
const outDir = path.join(__dirname, 'public_html');

// Create mock rendering context
const mockData = {
    firmName: 'Chronicle & Partners',
    firmEmail: 'inquiries@chronicle.com',
    firmPhone: '+1 (800) 555-0199',
    user: { id: "user_mock", role: "client", email: "client@demo.com", name: "Robert Harrison" },
    currentYear: new Date().getFullYear()
};

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Copy static assets
fs.cpSync(publicDir, outDir, { recursive: true });

// Render function using renderFile
const renderView = async (ejsPathRel, outName, data = {}) => {
    try {
        const ejsFile = path.join(viewsDir, ejsPathRel);
        const html = await ejs.renderFile(ejsFile, { ...mockData, ...data }, { views: [viewsDir] });
        fs.writeFileSync(path.join(outDir, outName), html);
        console.log(`Successfully compiled: ${outName}`);
    } catch (err) {
        console.error(`Failed to compile ${outName}:`, err.message);
    }
};

(async function build() {
    // 1. Render Public Website
    await renderView('public/index.ejs', 'index.html', { title: 'Home' });
    await renderView('public/about.ejs', 'about.html', { title: 'Our Firm History' });
    await renderView('public/practice-areas.ejs', 'practice-areas.html', { title: 'Practice Domains' });
    await renderView('public/attorneys.ejs', 'attorneys.html', { title: 'Partners' });
    await renderView('public/results.ejs', 'results.html', { title: 'Case Results' });
    await renderView('public/insights.ejs', 'insights.html', { title: 'Insights' });
    await renderView('public/contact.ejs', 'contact.html', { title: 'Executive Contact' });
    await renderView('public/booking.ejs', 'booking.html', { title: 'Strategic Consultation Intake' });
    await renderView('public/login.ejs', 'login-client.html', { title: 'Client Portal Login', mode: 'client', error: null });
    await renderView('public/login.ejs', 'login-admin.html', { title: 'Admin Node Login', mode: 'admin', error: null });

    // 2. Render Portal (Client Mocks)
    const portalData = {
        cases: [
            { id: "C-9921", title: "Merger Acquisition Corp.", status: "Active", nextDate: "2026-03-15" }
        ],
        appointments: [
            { id: "apt-1", with: "Jonathan Weaver", type: "Zoom Video", date: "2026-03-10", time: "11:00 AM EST" }
        ],
        docs: [
            { type: "pdf", name: "NDA_Signed_Final.pdf", size: "2.4 MB", date: "2026-02-28" },
            { type: "pdf", name: "Retainer_Invoice.pdf", size: "400 KB", date: "2026-01-15", requiresSignature: true }
        ],
        activePage: 'dashboard'
    };
    await renderView('portal/dashboard.ejs', 'portal-dashboard.html', { title: 'Dashboard', ...portalData, activePage: 'dashboard' });
    await renderView('portal/documents.ejs', 'portal-documents.html', { title: 'Documents', ...portalData, activePage: 'documents' });

    // 3. Render Admin Node
    const adminData = {
        stats: {
            monthlyRevenue: 850000,
            openCases: 38,
            activeClients: 142,
            recentActivity: [
                { log: "Client Robert H. uploaded NDA_Signed_Final.pdf", time: "10 mins ago" }
            ]
        }
    };
    await renderView('admin/dashboard.ejs', 'admin-dashboard.html', { title: 'Admin Analytics Dashboard', ...adminData });

    console.log('Build complete. Serving from public_html/');
})();
