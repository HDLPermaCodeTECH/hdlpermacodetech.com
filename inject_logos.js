const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'index.html');
let content = fs.readFileSync(file, 'utf8');

const replacementBlock = `        <div class="partner-logos-container">
            <div class="partner-logos">
                <!-- Set 1 -->
                <div class="partner-logo">
                    <img src="images/Hostinger_Logo.png" alt="Hostinger" style="height: 30px; width: auto; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/wordpress-logo.png" alt="WordPress" style="height: 40px; width: auto; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/elementor-logo.png" alt="Elementor" style="height: 30px; width: auto; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/Integrations-WPBakery-1724x970-2.svg" alt="WPBakery" style="height: 30px; width: auto; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#00A4A6"><path d="M16.5 10c0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5c0 1.2.5 2.3 1.3 3.1-.3.1-.7.2-1.1.2C4.5 13.3 2 15.6 2 18.5V20h4v-1.5c0-1.2 1-2.2 2.2-2.2 1.4 0 2.5-1.1 2.5-2.5v-.5C9.4 12.8 9 11.4 9 10c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.4-.4 2.8-1.7 3.3v.5c0 1.4 1.1 2.5 2.5 2.5C17 16.3 18 17.3 18 18.5V20h4v-1.5c0-2.9-2.5-5.2-5.7-5.2-.4 0-.8-.1-1.1-.2.8-.8 1.3-1.9 1.3-3.1z" /></svg>
                    <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.3rem; color: var(--text-main); letter-spacing:-0.5px;">GoDaddy</span>
                </div>
                <div class="partner-logo">
                    <img src="images/google-gemini-logo-2025-1440x430.png" alt="Google Gemini" style="height: 30px; width: auto; object-fit: contain;">
                </div>
                
                <!-- Set 2 -->
                <div class="partner-logo">
                    <img src="images/Hostinger_Logo.png" alt="Hostinger" style="height: 30px; width: auto; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/wordpress-logo.png" alt="WordPress" style="height: 40px; width: auto; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/elementor-logo.png" alt="Elementor" style="height: 30px; width: auto; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/Integrations-WPBakery-1724x970-2.svg" alt="WPBakery" style="height: 30px; width: auto; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#00A4A6"><path d="M16.5 10c0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5c0 1.2.5 2.3 1.3 3.1-.3.1-.7.2-1.1.2C4.5 13.3 2 15.6 2 18.5V20h4v-1.5c0-1.2 1-2.2 2.2-2.2 1.4 0 2.5-1.1 2.5-2.5v-.5C9.4 12.8 9 11.4 9 10c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.4-.4 2.8-1.7 3.3v.5c0 1.4 1.1 2.5 2.5 2.5C17 16.3 18 17.3 18 18.5V20h4v-1.5c0-2.9-2.5-5.2-5.7-5.2-.4 0-.8-.1-1.1-.2.8-.8 1.3-1.9 1.3-3.1z" /></svg>
                    <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.3rem; color: var(--text-main); letter-spacing:-0.5px;">GoDaddy</span>
                </div>
                <div class="partner-logo">
                    <img src="images/google-gemini-logo-2025-1440x430.png" alt="Google Gemini" style="height: 30px; width: auto; object-fit: contain;">
                </div>

                <!-- Set 3 -->
                <div class="partner-logo">
                    <img src="images/Hostinger_Logo.png" alt="Hostinger" style="height: 30px; width: auto; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/wordpress-logo.png" alt="WordPress" style="height: 40px; width: auto; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/elementor-logo.png" alt="Elementor" style="height: 30px; width: auto; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/Integrations-WPBakery-1724x970-2.svg" alt="WPBakery" style="height: 30px; width: auto; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="#00A4A6"><path d="M16.5 10c0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5c0 1.2.5 2.3 1.3 3.1-.3.1-.7.2-1.1.2C4.5 13.3 2 15.6 2 18.5V20h4v-1.5c0-1.2 1-2.2 2.2-2.2 1.4 0 2.5-1.1 2.5-2.5v-.5C9.4 12.8 9 11.4 9 10c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.4-.4 2.8-1.7 3.3v.5c0 1.4 1.1 2.5 2.5 2.5C17 16.3 18 17.3 18 18.5V20h4v-1.5c0-2.9-2.5-5.2-5.7-5.2-.4 0-.8-.1-1.1-.2.8-.8 1.3-1.9 1.3-3.1z" /></svg>
                    <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.3rem; color: var(--text-main); letter-spacing:-0.5px;">GoDaddy</span>
                </div>
                <div class="partner-logo">
                    <img src="images/google-gemini-logo-2025-1440x430.png" alt="Google Gemini" style="height: 30px; width: auto; object-fit: contain;">
                </div>
            </div>
        </div>`;

const startIndex = content.indexOf('<div class="partner-logos"');
const endIndex = content.indexOf('</section>', startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + replacementBlock + '\n    ' + content.substring(endIndex);
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Successfully updated index.html with new uploaded logos.');
} else {
    console.log('Could not find injection point');
}
