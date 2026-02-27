const fs = require('fs');
const PDFDocument = require('pdfkit');

function createPDF() {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: 'A4',
            margins: { top: 50, bottom: 0, left: 50, right: 50 },
            info: {
                Title: 'Free Website Audit Checklist',
                Author: 'HDL Perma Code TECH'
            }
        });

        const outputPath = './downloads/Website_Audit_Checklist.pdf';
        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        // Core Colors
        const bgDark = '#020617';
        const bgCard = '#0f172a';
        const textWhite = '#f8fafc';
        const textMuted = '#94a3b8';
        const accentCyan = '#38bdf8';
        const accentIndigo = '#818cf8';

        // --- Helper: Draw Background ---
        function drawBackground() {
            doc.rect(0, 0, doc.page.width, doc.page.height).fill(bgDark);
        }

        // --- Helper: Header ---
        function drawHeader(yPos = 50) {
            try {
                const centerX = doc.page.width / 2;
                // Draw Shield Image centered on top
                doc.image('./images/HDL_HexShield_Icon.png', centerX - 25, yPos - 25, { height: 50 });

                // Draw White glowing brand text below it
                doc.fillColor(textWhite)
                    .fontSize(16)
                    .font('Helvetica-Bold')
                    .text('HDL', centerX - 100, yPos + 35, { continued: true, lineBreak: false })
                    .fillColor(accentCyan)
                    .text('Perma', { continued: true, lineBreak: false })
                    .fillColor(textWhite)
                    .text('Code', { continued: true, lineBreak: false })
                    .fillColor(accentIndigo)
                    .text('TECH', { lineBreak: false });
            } catch (e) {
                // Fallback to text if missing
                doc.fillColor(textWhite)
                    .fontSize(16)
                    .font('Helvetica-Bold')
                    .text('HDL Perma Code TECH', 50, yPos, { align: 'center' });
            }

            // Subtle line under logo
            doc.moveTo(doc.page.width / 2 - 50, yPos + 25)
                .lineTo(doc.page.width / 2 + 50, yPos + 25)
                .lineWidth(2)
                .strokeColor(accentCyan)
                .stroke();
        }

        // --- Helper: Footer ---
        function drawFooter() {
            const footerY = doc.page.height - 40;
            doc.moveTo(50, footerY - 10)
                .lineTo(doc.page.width - 50, footerY - 10)
                .lineWidth(1)
                .strokeColor(bgCard)
                .stroke();

            doc.fillColor(textMuted)
                .fontSize(10)
                .font('Helvetica')
                .text('Free Website Audit Checklist', 50, footerY, { lineBreak: false });

            doc.fillColor(accentCyan)
                .text('hdlpermacodetech.com', 50, footerY, { align: 'right', lineBreak: false });
        }


        // ==========================================
        // PAGE 1: COVER
        // ==========================================
        drawBackground();
        drawHeader(150);

        doc.fillColor(accentCyan)
            .fontSize(12)
            .font('Helvetica-Bold')
            .text('FREE AUDIT RESOURCE', 0, 300, { align: 'center', characterSpacing: 2 });

        doc.fillColor(textWhite)
            .fontSize(42)
            .font('Helvetica-Bold')
            .text('Website Audit', 0, 330, { align: 'center' });

        doc.fillColor(accentIndigo)
            .text('Checklist', 0, 375, { align: 'center' });

        doc.fillColor('#cbd5e1')
            .fontSize(16)
            .font('Helvetica')
            .text('Discover the 10 Proven Steps to Instantly Improve Your', 50, 450, { align: 'center' })
            .text('Website’s Conversion Rate and SEO Performance.', 50, 475, { align: 'center' });

        doc.fillColor(textMuted)
            .fontSize(12)
            .font('Helvetica')
            .text('A PROFESSIONAL 10-STEP FRAMEWORK USED BY WEB EXPERTS', 0, 560, { align: 'center', characterSpacing: 1 });

        drawFooter();


        // ==========================================
        // PAGE 2: INTRODUCTION
        // ==========================================
        doc.addPage();
        drawBackground();
        drawHeader(50);

        doc.fillColor(textWhite)
            .fontSize(28)
            .font('Helvetica-Bold')
            .text('Why Website Auditing Matters', 50, 150);

        doc.moveTo(50, 190).lineTo(150, 190).lineWidth(3).strokeColor(accentCyan).stroke();

        doc.fillColor('#cbd5e1')
            .fontSize(14)
            .font('Helvetica')
            .text(`In today's fiercely competitive digital landscape, having a website that just "looks good" is no longer enough. Your website is the core engine of your business online, and its performance directly dictates your bottom line.`, 50, 230, { lineGap: 6 })
            .text(`A professional website audit is a systematic examination of your site's health, designed to uncover hidden bottlenecks that are quietly costing you leads, sales, and valuable search engine rankings.`, 50, 310, { lineGap: 6 });

        // Bullet container
        doc.rect(50, 400, doc.page.width - 100, 250)
            .fillAndStroke(bgCard, '#1e293b');

        doc.fillColor(textWhite)
            .fontSize(18)
            .font('Helvetica-Bold')
            .text('Key Pillars of a High-Performing Website:', 80, 430);

        const bullets = [
            'Speed & Performance: A 1-second delay reduces conversions by 7%.',
            'SEO Ranking: Unoptimized structures make you invisible to Google.',
            'Conversion Optimization: Friction in user flow abandons carts and forms.',
            'User Experience (UX): Broken layouts erode brand trust immediately.',
            'Military-Grade Security: Protecting client data is non-negotiable.'
        ];

        let bulletY = 480;
        doc.font('Helvetica').fontSize(12);
        for (const item of bullets) {
            doc.fillColor(accentCyan).text('►', 80, bulletY);
            doc.fillColor('#cbd5e1').text(item, 110, bulletY, { width: 380, lineGap: 4 });
            bulletY += 30;
        }

        drawFooter();


        // ==========================================
        // PAGE 3: CHECKLIST
        // ==========================================
        doc.addPage();
        drawBackground();
        drawHeader(50);

        doc.fillColor(textWhite)
            .fontSize(28)
            .font('Helvetica-Bold')
            .text('The 10-Step Audit Framework', 50, 130);
        doc.moveTo(50, 170).lineTo(150, 170).lineWidth(3).strokeColor(accentCyan).stroke();

        let currentY = 195;

        function drawSection(title, items) {
            doc.fillColor(accentCyan).fontSize(16).font('Helvetica-Bold').text(title, 50, currentY);
            currentY += 25;

            doc.font('Helvetica').fontSize(12);
            for (const item of items) {
                // Draw checkbox
                doc.roundedRect(50, currentY, 15, 15, 3)
                    .lineWidth(1)
                    .strokeColor(accentCyan)
                    .stroke();

                doc.fillColor(textWhite)
                    .text(item.bold, 80, currentY + 2, { continued: true })
                    .fillColor('#cbd5e1')
                    .text(` - ${item.text}`, { width: 400, lineGap: 4 });

                // calculate the height of the item text wrapper to prevent overlap
                const textHeight = doc.heightOfString(` - ${item.text}`, { width: 400 });
                currentY += Math.max(25, textHeight + 10);
            }
            currentY += 15;
        }

        drawSection('Performance Optimization', [
            { bold: 'Website loads under 3 seconds', text: 'Test via Google PageSpeed Insights.' },
            { bold: 'Images are optimized', text: 'Compress to WebP formats without quality loss.' },
            { bold: 'CSS & JavaScript are minified', text: 'Remove unnecessary code spacing to reduce file sizes.' }
        ]);

        drawSection('Mobile Responsiveness', [
            { bold: 'Fully responsive on all screen sizes', text: 'Layout adapts perfectly to phones, tablets, and distinct desktop resolutions.' },
            { bold: 'Mobile navigation is user-friendly', text: 'Ensure the hamburger menu is accessible and touch-friendly.' }
        ]);

        drawSection('Design & User Experience', [
            { bold: 'Clear call-to-action buttons', text: 'CTA buttons have high contrast and clear instructional text.' },
            { bold: 'Consistent branding and typography', text: 'Typography and color palettes strictly match brand guidelines.' }
        ]);

        drawSection('Security & SEO Optimization', [
            { bold: 'SSL certificate is active', text: 'Connection is secure to protect user data and boost SEO.' },
            { bold: 'Forms are protected', text: 'Forms are protected by invisible CAPTCHA to prevent targeted bot attacks.' },
            { bold: 'Optimized meta titles & descriptions', text: 'Every page has a unique title and compelling meta description.' }
        ]);

        drawFooter();

        // ==========================================
        // PAGE 4: CTA
        // ==========================================
        doc.addPage();
        drawBackground();
        drawHeader(50);

        doc.fillColor(textWhite)
            .fontSize(32)
            .font('Helvetica-Bold')
            .text('Need a Professional Audit?', 50, 200, { align: 'center' });

        doc.fillColor('#cbd5e1')
            .fontSize(16)
            .font('Helvetica')
            .text('Running an audit yourself can be time-consuming, and finding the technical bottlenecks hidden deeply within your website requires expert insight.', 100, 270, { align: 'center', lineGap: 8 })
            .text('Let me handle the heavy lifting. Request a comprehensive, tailored audit report of your website from a premium global developer.', 100, 340, { align: 'center', lineGap: 8 });

        // CTA Button Design
        const ctaBoxWidth = 350;
        const ctaBoxX = doc.page.width / 2 - (ctaBoxWidth / 2);

        doc.roundedRect(ctaBoxX, 430, ctaBoxWidth, 60, 8)
            .fill(bgCard);
        doc.roundedRect(ctaBoxX, 430, ctaBoxWidth, 60, 8)
            .lineWidth(2)
            .strokeColor(accentCyan)
            .stroke();

        doc.fillColor(accentCyan)
            .fontSize(16)
            .font('Helvetica-Bold')
            .text('REQUEST YOUR FREE WEBSITE AUDIT', ctaBoxX, 452, { width: ctaBoxWidth, align: 'center' });

        doc.fillColor(textMuted)
            .fontSize(12)
            .font('Helvetica')
            .text('Or email me directly at:', 0, 540, { align: 'center' });

        doc.fillColor(accentCyan)
            .text('developer@hdlpermacodetech.com', 0, 565, { align: 'center' });

        drawFooter();

        doc.end();

        stream.on('finish', () => resolve(outputPath));
        stream.on('error', reject);
    });
}

createPDF()
    .then(path => console.log(`PDF created successfully at ${path}`))
    .catch(err => console.error('Error creating PDF:', err));
