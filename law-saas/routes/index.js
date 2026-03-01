const express = require('express');
const router = express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================

// 1. Home
router.get('/', (req, res) => {
    res.render('public/index', { title: "Elite Legal Counsel" });
});

// 2. About Us
router.get('/about', (req, res) => {
    res.render('public/about', { title: "About Our Firm" });
});

// 3. Practice Areas
router.get('/practice-areas', (req, res) => {
    res.render('public/practice-areas', { title: "Practice Areas" });
});

// 4. Attorneys
router.get('/attorneys', (req, res) => {
    res.render('public/attorneys', { title: "Our Attorneys" });
});

// 5. Results (Case Studies)
router.get('/results', (req, res) => {
    res.render('public/results', { title: "Case Results" });
});

// 6. Insights (Blog)
router.get('/insights', (req, res) => {
    res.render('public/insights', { title: "Legal Insights" });
});

// 7. Contact
router.get('/contact', (req, res) => {
    res.render('public/contact', { title: "Contact Us" });
});

// 8. Book Consultation
router.get('/booking', (req, res) => {
    res.render('public/booking', { title: "Book Consultation" });
});

// 9. Legal policies
router.get('/privacy-policy', (req, res) => { res.send('<h2>Privacy Policy</h2>'); });
router.get('/terms', (req, res) => { res.send('<h2>Terms and Conditions</h2>'); });


module.exports = router;
