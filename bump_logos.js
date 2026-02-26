const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'index.html');
let content = fs.readFileSync(file, 'utf8');

const replacementBlock = `        <div class="partner-logos-container">
            <div class="partner-logos">
                <!-- Set 1 -->
                <div class="partner-logo">
                    <img src="images/Hostinger_Logo.png" alt="Hostinger" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/wordpress-logo.png" alt="WordPress" style="height: 100px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/elementor-logo.png" alt="Elementor" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/Integrations-WPBakery-1724x970-2.svg" alt="WPBakery" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/Godaddy-logo.png" alt="GoDaddy" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/google-gemini-logo-2025-1440x430.png" alt="Google Gemini" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                
                <!-- Set 2 -->
                <div class="partner-logo">
                    <img src="images/Hostinger_Logo.png" alt="Hostinger" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/wordpress-logo.png" alt="WordPress" style="height: 100px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/elementor-logo.png" alt="Elementor" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/Integrations-WPBakery-1724x970-2.svg" alt="WPBakery" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/Godaddy-logo.png" alt="GoDaddy" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/google-gemini-logo-2025-1440x430.png" alt="Google Gemini" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>

                <!-- Set 3 -->
                <div class="partner-logo">
                    <img src="images/Hostinger_Logo.png" alt="Hostinger" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/wordpress-logo.png" alt="WordPress" style="height: 100px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/elementor-logo.png" alt="Elementor" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/Integrations-WPBakery-1724x970-2.svg" alt="WPBakery" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/Godaddy-logo.png" alt="GoDaddy" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/google-gemini-logo-2025-1440x430.png" alt="Google Gemini" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>

                <!-- Set 4 (Adding a 4th set to guarantee absolute seamless no-glitch looping on ultra-widescreens) -->
                <div class="partner-logo">
                    <img src="images/Hostinger_Logo.png" alt="Hostinger" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/wordpress-logo.png" alt="WordPress" style="height: 100px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/elementor-logo.png" alt="Elementor" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/Integrations-WPBakery-1724x970-2.svg" alt="WPBakery" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/Godaddy-logo.png" alt="GoDaddy" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
                <div class="partner-logo">
                    <img src="images/google-gemini-logo-2025-1440x430.png" alt="Google Gemini" style="height: 80px; width: auto; max-width: 250px; object-fit: contain;">
                </div>
            </div>
        </div>`;

const startIndex = content.indexOf('<div class="partner-logos-container">');
const endIndex = content.indexOf('</section>', startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + replacementBlock + '\n    ' + content.substring(endIndex);
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Successfully updated index.html with bigger and un-glitching logos.');
} else {
    console.log('Could not find injection point');
}
