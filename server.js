const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    origin: '*', // Allow all origins for the form submission
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Serve static HTML/CSS files from the current directory
app.use(express.static(__dirname));

// --- NODEMAILER CONFIGURATION ---
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.hostinger.com",
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for 587 (uses STARTTLS)
    auth: {
        user: process.env.EMAIL_USER || "developer@hdlpermacodetech.com",
        pass: process.env.EMAIL_PASS || "Nitro19960422."
    },
    tls: {
        rejectUnauthorized: false
    },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000
});

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log("SMTP Connection Error:", error);
    } else {
        console.log("SMTP Server is ready to take our messages");
    }
});

const sendEmail = async (to, subject, htmlContent, replyTo) => {
    const fromEmail = process.env.EMAIL_USER || "developer@hdlpermacodetech.com";
    const mailOptions = {
        from: `"HDL Perma Code TECH" <${fromEmail}>`,
        to: to,
        subject: subject,
        html: htmlContent,
    };

    if (replyTo) mailOptions.replyTo = replyTo;

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error("Nodemailer Error:", error);
        throw error;
    }
};

app.post('/send-project-brief', async (req, res) => {
    try {
        const { name, email, inquiryType, budget, message } = req.body;
        console.log("Received Project Brief:", req.body);

        if (!name || !email) {
            return res.status(400).json({ success: false, message: 'Name and email are required.' });
        }

        const inquiryMap = {
            'starter_pkg': 'Starter Package ($549)',
            'business_pkg': 'Business Package ($999)',
            'professional_pkg': 'Professional Package ($1,799)',
            'ecommerce_pkg': 'E-Commerce Package ($1,499)',
            'custom_dev': 'Custom Website Development',
            'templates': 'Premium Website Templates',
            'other': 'Other'
        };

        const budgetMap = {
            'under_1k': 'Under $1,000',
            '1k_to_5k': '$1,000 - $5,000',
            'over_5k': '$5,000+'
        };

        const readableInquiry = inquiryMap[inquiryType] || inquiryType;
        const readableBudget = budgetMap[budget] || budget;

        // 1. Developer Notification Email
        const developerHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='utf-8'>
                <style>
                    body { margin: 0; padding: 0; background-color: #020617; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f8fafc; }
                    .email-container { max-width: 600px; margin: 0 auto; background-color: #0f172a; padding: 40px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
                    .header { text-align: center; margin-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; }
                    .logo { font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: -1px; }
                    .logo span.perma { font-weight: 300; color: #cbd5e1; }
                    .logo span.code { font-weight: 700; color: #38bdf8; }
                    .logo span.tech { font-weight: 900; color: #818cf8; }
                    .content { line-height: 1.6; color: #cbd5e1; }
                    h2 { color: #f8fafc; margin-top: 0; color: #38bdf8; }
                    .summary-box { background-color: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #818cf8; }
                    .summary-box p { margin: 8px 0; color: #f8fafc; }
                    .summary-box strong { color: #818cf8; display: inline-block; width: 110px; }
                    .message-box { background-color: #020617; padding: 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); color: #cbd5e1; white-space: pre-wrap; margin-top: 15px; font-style: italic; }
                    .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; }
                </style>
            </head>
            <body>
                <div style='background-color: #020617; padding: 40px 20px; width: 100%; box-sizing: border-box;'>
                    <div class='email-container'>
                        <div class='header'>
                            <div class='logo'>
                                <svg viewBox="0 0 950 140" style="height: 60px; max-width: 100%;" xmlns="http://www.w3.org/2000/svg">
                                    <g transform="translate(10, 10)">
                                        <path d="M45 5 L85 28 L85 72 L45 95 L5 72 L5 28 Z" fill="none" stroke="url(#nav_hex_grad)"
                                            stroke-width="8" stroke-linejoin="round" />
                                        <path d="M25 35 L25 65" stroke="#ffffff" stroke-width="7" stroke-linecap="round" />
                                        <path d="M65 35 L65 65" stroke="#ffffff" stroke-width="7" stroke-linecap="round" />
                                        <path d="M25 50 H65" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity="0.3" />
                                        <path d="M52 28 L38 72" stroke="#38bdf8" stroke-width="7" stroke-linecap="round" />
                                        <circle cx="52" cy="28" r="3" fill="#38bdf8" />
                                        <circle cx="38" cy="72" r="3" fill="#38bdf8" />
                                        <defs>
                                            <linearGradient id="nav_hex_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style="stop-color:#38bdf8;stop-opacity:1" />
                                                <stop offset="100%" style="stop-color:#818cf8;stop-opacity:1" />
                                            </linearGradient>
                                        </defs>
                                    </g>
                                    <text x="120" y="78" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-weight="900" font-size="64" fill="#ffffff">
                                        HDL<tspan dx="-5" font-weight="300" fill="#cbd5e1">Perma</tspan><tspan dx="-5" font-weight="700" fill="#38bdf8">Code</tspan><tspan dx="-5" font-weight="900" fill="#818cf8">TECH</tspan>
                                    </text>
                                    <rect x="120" y="95" width="650" height="5" fill="url(#nav_line_grad)" rx="2.5" />
                                    <defs>
                                        <linearGradient id="nav_line_grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" style="stop-color:#38bdf8;stop-opacity:1" />
                                            <stop offset="60%" style="stop-color:#818cf8;stop-opacity:1" />
                                            <stop offset="100%" style="stop-color:#38bdf8;stop-opacity:0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div class='content'>
                            <h2>New Project Brief Received!</h2>
                            <p>Great news! A new prospective client has just submitted a project brief through the website frontend.</p>
                            
                            <div class='summary-box'>
                                <p><strong>Name:</strong> ${name}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Inquiry Type:</strong> ${readableInquiry}</p>
                                <p><strong>Budget:</strong> ${readableBudget}</p>
                            </div>
                            
                            <h3 style='color: #f8fafc; margin-bottom: 5px; margin-top: 25px;'>Project Details/Message:</h3>
                            <div class='message-box'>${message}</div>
                        </div>
                        <div class='footer'>
                            You can reply directly to this email to contact ${name}.<br>
                            &copy; ${new Date().getFullYear()} HDL Perma Code TECH System.
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        const myEmail = process.env.EMAIL_USER || "developer@hdlpermacodetech.com";
        await sendEmail(myEmail, "New Project Brief - HDL Perma Code TECH", developerHtml, email);

        // 2. Client Auto-Reply Email
        const clientSubject = "We received your project brief! - HDL Perma Code TECH";
        const clientHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='utf-8'>
                <style>
                    body { margin: 0; padding: 0; background-color: #020617; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f8fafc; }
                    .email-container { max-width: 600px; margin: 0 auto; background-color: #0f172a; padding: 40px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
                    .header { text-align: center; margin-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; }
                    .logo { font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: -1px; }
                    .logo span.perma { font-weight: 300; color: #cbd5e1; }
                    .logo span.code { font-weight: 700; color: #38bdf8; }
                    .logo span.tech { font-weight: 900; color: #818cf8; }
                    .content { line-height: 1.6; color: #cbd5e1; }
                    h2 { color: #f8fafc; margin-top: 0; }
                    .summary-box { background-color: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38bdf8; }
                    .summary-box p { margin: 5px 0; color: #f8fafc; }
                    .summary-box strong { color: #38bdf8; }
                    .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; }
                </style>
            </head>
            <body>
                <div style='background-color: #020617; padding: 40px 20px; width: 100%; box-sizing: border-box;'>
                    <div class='email-container'>
                        <div class='header'>
                            <div class='logo'>
                                <svg viewBox="0 0 950 140" style="height: 60px; max-width: 100%;" xmlns="http://www.w3.org/2000/svg">
                                    <g transform="translate(10, 10)">
                                        <path d="M45 5 L85 28 L85 72 L45 95 L5 72 L5 28 Z" fill="none" stroke="url(#nav_hex_grad)"
                                            stroke-width="8" stroke-linejoin="round" />
                                        <path d="M25 35 L25 65" stroke="#ffffff" stroke-width="7" stroke-linecap="round" />
                                        <path d="M65 35 L65 65" stroke="#ffffff" stroke-width="7" stroke-linecap="round" />
                                        <path d="M25 50 H65" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity="0.3" />
                                        <path d="M52 28 L38 72" stroke="#38bdf8" stroke-width="7" stroke-linecap="round" />
                                        <circle cx="52" cy="28" r="3" fill="#38bdf8" />
                                        <circle cx="38" cy="72" r="3" fill="#38bdf8" />
                                        <defs>
                                            <linearGradient id="nav_hex_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style="stop-color:#38bdf8;stop-opacity:1" />
                                                <stop offset="100%" style="stop-color:#818cf8;stop-opacity:1" />
                                            </linearGradient>
                                        </defs>
                                    </g>
                                    <text x="120" y="78" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-weight="900" font-size="64" fill="#ffffff">
                                        HDL<tspan dx="-5" font-weight="300" fill="#cbd5e1">Perma</tspan><tspan dx="-5" font-weight="700" fill="#38bdf8">Code</tspan><tspan dx="-5" font-weight="900" fill="#818cf8">TECH</tspan>
                                    </text>
                                    <rect x="120" y="95" width="650" height="5" fill="url(#nav_line_grad)" rx="2.5" />
                                    <defs>
                                        <linearGradient id="nav_line_grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" style="stop-color:#38bdf8;stop-opacity:1" />
                                            <stop offset="60%" style="stop-color:#818cf8;stop-opacity:1" />
                                            <stop offset="100%" style="stop-color:#38bdf8;stop-opacity:0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div class='content'>
                            <h2>Hi ${name},</h2>
                            <p>Thank you for reaching out and submitting your project brief. We have successfully received your inquiry and our team is already reviewing the details.</p>
                            <p>At HDL Perma Code TECH, we take pride in engineering high-performance, conversion-optimized digital experiences. We're excited about the possibility of building your next big project.</p>
                            
                            <div class='summary-box'>
                                <strong>Your Submission Summary:</strong>
                                <p><strong>Inquiry Type:</strong> ${readableInquiry}</p>
                                <p><strong>Estimated Budget:</strong> ${readableBudget}</p>
                            </div>
                            
                            <p>One of our lead developers will review your requirements and follow up with you within 24-48 hours to discuss the next steps.</p>
                            <p>Best regards,<br>
                            <strong>The HDL Perma Code TECH Team</strong></p>
                        </div>
                        <div class='footer'>
                            Questions? Reply directly to this email or contact us at ${myEmail}<br>
                            &copy; ${new Date().getFullYear()} HDL Perma Code TECH. All rights reserved.
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        await sendEmail(email, clientSubject, clientHtml, myEmail);

        res.status(200).json({ success: true, message: 'Brief sent successfully via Node.js SMTP!' });

    } catch (error) {
        console.error("Error processing project brief:", error);
        res.status(500).json({ success: false, message: 'Mailer Error: ' + error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
