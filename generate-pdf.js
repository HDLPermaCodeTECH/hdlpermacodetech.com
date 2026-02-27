const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
    console.log('Starting PDF generation...');
    try {
        const browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-dev-shm-usage',
                '--disable-features=IsolateOrigins,site-per-process',
                '--disable-web-security',
                '--no-first-run',
                '--no-zygote',
                '--single-process'
            ]
        });
        const page = await browser.newPage();

        const htmlPath = path.resolve(__dirname, 'checklist-src.html');
        console.log(`Loading HTML from: file://${htmlPath}`);

        await page.goto(`file://${htmlPath}`, {
            waitUntil: 'networkidle0', // Wait for fonts and images to load
            timeout: 60000
        });

        // Add a small delay just to be completely sure remote fonts and images render
        await new Promise(r => setTimeout(r, 2000));

        const outputPath = path.resolve(__dirname, 'downloads', 'Website_Audit_Checklist.pdf');

        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
        });

        console.log(`PDF successfully generated at: ${outputPath}`);
        await browser.close();
    } catch (error) {
        console.error('Error generating PDF:', error);
        process.exit(1);
    }
}

generatePDF();
