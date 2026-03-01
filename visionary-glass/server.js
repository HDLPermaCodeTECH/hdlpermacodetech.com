const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the /public directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for root if needed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`[Visionary Canvas - Glass Edition] Server running on http://localhost:${PORT}`);
});
