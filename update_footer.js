const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const regex = /(<div class="footer-col footer-brand">\s*)<a href="index\.html"[^>]*>\s*<svg viewBox="0 0 950 140" class="nav-logo-svg"[\s\S]*?<\/svg>\s*<\/a>/g;

const replacement = `$1<a href="index.html" class="footer-logo-container">
                    <img src="images/HDL_HexShield_Icon.png" alt="Shield Icon" class="footer-shield-icon">
                    <img src="images/HDLPermaCodeTECH_Logo.png" alt="HDL Perma Code TECH" class="footer-text-logo">
                </a>`;

for (const file of files) {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    if (regex.test(content)) {
        content = content.replace(regex, replacement);
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${file}`);
    }
}
