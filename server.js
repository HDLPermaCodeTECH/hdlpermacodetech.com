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
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <style>
                    .logo-text { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 75px; letter-spacing: -7.5px; }
                    .logo-text tspan { letter-spacing: -1px; }
                    .fw-900 { font-weight: 900; }
                    .fw-700 { font-weight: 700; }
                    .fw-100 { font-weight: 300; }
                    .fill-white { fill: #ffffff; }
                    .fill-slate { fill: #cbd5e1; }
                    .fill-cyan { fill: #38bdf8; }
                    .fill-indigo { fill: #818cf8; }
                </style>
            </head>
            <body style="margin: 0; padding: 0; background-color: #020617; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f8fafc; -webkit-font-smoothing: antialiased;">
                <div style='background-color: #020617; padding: 40px 20px; width: 100%; box-sizing: border-box;'>
                    <div style='max-width: 600px; margin: 0 auto; background-color: #0f172a; padding: 0; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);'>
                        
                        <!-- Header Section -->
                        <div style='text-align: center; padding: 40px 20px 30px; background: linear-gradient(180deg, rgba(15,23,42,1) 0%, rgba(2,6,23,1) 100%); border-bottom: 1px solid rgba(255,255,255,0.05);'>
                            <img src="https://hdlpermacodetech.com/images/HDL_HexShield_Icon.png" alt="Shield Icon" style="height: 55px; width: auto; border: 0; outline: none; text-decoration: none; display: block; margin: 0 auto 15px;">
                            <img src="https://hdlpermacodetech.com/images/HDLPermaCodeTECH_Logo.png" alt="HDL Perma Code TECH" style="height: 35px; width: auto; max-width: 100%; border: 0; outline: none; text-decoration: none; display: inline-block; margin-left: 17px;">
                        </div>

                        <!-- Body Section -->
                        <div style='padding: 40px; line-height: 1.6; color: #cbd5e1;'>
                            <h2 style='color: #f8fafc; margin-top: 0; font-size: 22px; font-weight: 600; letter-spacing: -0.5px;'>New Project Brief Received <span style='color: #38bdf8;'>🚀</span></h2>
                            <p style='color: #94a3b8; font-size: 15px;'>A new prospective client has just submitted a project brief through the website frontend. Details are below.</p>
                            
                            <div style='background-color: #1e293b; padding: 25px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #818cf8; box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);'>
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0; padding: 0;">
                                    <tr>
                                        <td style='padding: 8px 0; width: 120px;'><strong style='color: #818cf8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;'>Name:</strong></td>
                                        <td style='padding: 8px 0; color: #f8fafc; font-size: 15px; font-weight: 500;'>${name}</td>
                                    </tr>
                                    <tr>
                                        <td style='padding: 8px 0;'><strong style='color: #818cf8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;'>Email:</strong></td>
                                        <td style='padding: 8px 0; color: #f8fafc; font-size: 15px; font-weight: 500;'><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
                                    </tr>
                                    <tr>
                                        <td style='padding: 8px 0;'><strong style='color: #818cf8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;'>Inquiry Type:</strong></td>
                                        <td style='padding: 8px 0; color: #f8fafc; font-size: 15px; font-weight: 500;'>${readableInquiry}</td>
                                    </tr>
                                    <tr>
                                        <td style='padding: 8px 0;'><strong style='color: #818cf8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;'>Budget:</strong></td>
                                        <td style='padding: 8px 0; color: #f8fafc; font-size: 15px; font-weight: 500;'>${readableBudget}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <h3 style='color: #f8fafc; margin-bottom: 15px; margin-top: 35px; font-size: 16px; font-weight: 600;'>Project Details / Message:</h3>
                            <div style='background-color: #020617; padding: 25px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); color: #cbd5e1; white-space: pre-wrap; font-style: italic; font-size: 15px; line-height: 1.8;'>"${message}"</div>
                        </div>

                        <!-- Footer Section -->
                        <div style='background: linear-gradient(180deg, rgba(15,23,42,1) 0%, rgba(2,6,23,1) 100%); padding: 40px 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);'>
                            <img src="https://hdlpermacodetech.com/images/HDL_HexShield_Icon.png" alt="Shield Icon" style="height: 35px; width: auto; border: 0; outline: none; text-decoration: none; display: inline-block; margin-bottom: 20px; opacity: 0.8;">
                            
                            <p style='margin: 0 0 25px; color: #38bdf8; font-size: 14px; font-weight: 500; letter-spacing: 0.5px;'>Building Secure. Scalable. Professional Web Solutions.</p>
                            
                            <div style='margin-bottom: 25px;'>
                                <a href="https://hdlpermacodetech.com/privacy-policy" style='color: #64748b; text-decoration: none; font-size: 12px; margin: 0 10px; transition: color 0.2s;'>Privacy Policy</a>
                                <span style='color: #334155;'>|</span>
                                <a href="https://hdlpermacodetech.com/safety-and-security" style='color: #64748b; text-decoration: none; font-size: 12px; margin: 0 10px; transition: color 0.2s;'>Safety & Security</a>
                                <span style='color: #334155;'>|</span>
                                <a href="https://hdlpermacodetech.com/terms-of-service" style='color: #64748b; text-decoration: none; font-size: 12px; margin: 0 10px; transition: color 0.2s;'>Terms & Conditions</a>
                            </div>
                            
                            <p style='margin: 0; font-size: 12px; color: #475569;'>&copy; ${new Date().getFullYear()} HDL Perma Code TECH. All rights reserved.</p>
                        </div>
                    </div>
                </div>
                <!-- Anti-Gmail Trim HACK: Forces unique string to stop message threading -->
                <span style="opacity: 0; color: transparent; display: none; font-size: 0px; line-height: 0px; max-height: 0px; max-width: 0px; overflow: hidden; height: 0px; width: 0px;">Reference ID: ${Date.now()}_${Math.random().toString(36).substring(2, 9)}</span>
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
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <style>
                    .logo-text { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 75px; letter-spacing: -7.5px; }
                    .logo-text tspan { letter-spacing: -1px; }
                    .fw-900 { font-weight: 900; }
                    .fw-700 { font-weight: 700; }
                    .fw-100 { font-weight: 300; }
                    .fill-white { fill: #ffffff; }
                    .fill-slate { fill: #cbd5e1; }
                    .fill-cyan { fill: #38bdf8; }
                    .fill-indigo { fill: #818cf8; }
                </style>
            </head>
            <body style="margin: 0; padding: 0; background-color: #020617; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f8fafc; -webkit-font-smoothing: antialiased;">
                <div style='background-color: #020617; padding: 40px 20px; width: 100%; box-sizing: border-box;'>
                    <div style='max-width: 600px; margin: 0 auto; background-color: #0f172a; padding: 0; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);'>
                        
                        <!-- Header Section -->
                        <div style='text-align: center; padding: 40px 20px 30px; background: linear-gradient(180deg, rgba(15,23,42,1) 0%, rgba(2,6,23,1) 100%); border-bottom: 1px solid rgba(255,255,255,0.05);'>
                            <img src="https://hdlpermacodetech.com/images/HDL_HexShield_Icon.png" alt="Shield Icon" style="height: 55px; width: auto; border: 0; outline: none; text-decoration: none; display: block; margin: 0 auto 15px;">
                            <img src="https://hdlpermacodetech.com/images/HDLPermaCodeTECH_Logo.png" alt="HDL Perma Code TECH" style="height: 35px; width: auto; max-width: 100%; border: 0; outline: none; text-decoration: none; display: inline-block; margin-left: 17px;">
                        </div>

                        <!-- Body Section -->
                        <div style='padding: 40px; line-height: 1.6; color: #cbd5e1;'>
                            <h2 style='color: #f8fafc; margin-top: 0; font-size: 22px; font-weight: 600; letter-spacing: -0.5px;'>Hi ${name},</h2>
                            <p style='color: #94a3b8; font-size: 15px; margin-bottom: 20px;'>Thank you for reaching out and submitting your project brief. We have successfully received your inquiry, and our team is already reviewing the details.</p>
                            <p style='color: #94a3b8; font-size: 15px;'>At HDL Perma Code TECH, we take pride in engineering high-performance, conversion-optimized digital experiences. We're excited about the possibility of building your next big project.</p>
                            
                            <div style='background-color: #1e293b; padding: 25px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #38bdf8; box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);'>
                                <strong style='color: #38bdf8; display: block; margin-bottom: 15px; font-size: 16px; letter-spacing: 0.5px;'>Your Submission Summary</strong>
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0; padding: 0;">
                                    <tr>
                                        <td style='padding: 6px 0; width: 140px;'><span style='color: #94a3b8; font-size: 14px;'>Inquiry Type:</span></td>
                                        <td style='padding: 6px 0; color: #f8fafc; font-size: 15px; font-weight: 500;'>${readableInquiry}</td>
                                    </tr>
                                    <tr>
                                        <td style='padding: 6px 0;'><span style='color: #94a3b8; font-size: 14px;'>Estimated Budget:</span></td>
                                        <td style='padding: 6px 0; color: #f8fafc; font-size: 15px; font-weight: 500;'>${readableBudget}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <p style='color: #94a3b8; font-size: 15px; margin-bottom: 25px;'>One of our lead developers will review your requirements and follow up with you within 24-48 hours to discuss the next steps.</p>
                            
                            <p style='margin: 0; color: #cbd5e1; font-size: 15px;'>Best regards,<br>
                            <strong style='color: #f8fafc; display: block; margin-top: 5px;'>The HDL Perma Code TECH Team</strong></p>
                        </div>

                        <!-- Footer Section -->
                        <div style='background: linear-gradient(180deg, rgba(15,23,42,1) 0%, rgba(2,6,23,1) 100%); padding: 40px 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);'>
                            <img src="https://hdlpermacodetech.com/images/HDL_HexShield_Icon.png" alt="Shield Icon" style="height: 35px; width: auto; border: 0; outline: none; text-decoration: none; display: inline-block; margin-bottom: 20px; opacity: 0.8;">
                            
                            <p style='margin: 0 0 25px; color: #38bdf8; font-size: 14px; font-weight: 500; letter-spacing: 0.5px;'>Building Secure. Scalable. Professional Web Solutions.</p>
                            
                            <div style='margin-bottom: 25px;'>
                                <a href="https://hdlpermacodetech.com/privacy-policy" style='color: #64748b; text-decoration: none; font-size: 12px; margin: 0 10px; transition: color 0.2s;'>Privacy Policy</a>
                                <span style='color: #334155;'>|</span>
                                <a href="https://hdlpermacodetech.com/safety-and-security" style='color: #64748b; text-decoration: none; font-size: 12px; margin: 0 10px; transition: color 0.2s;'>Safety & Security</a>
                                <span style='color: #334155;'>|</span>
                                <a href="https://hdlpermacodetech.com/terms-of-service" style='color: #64748b; text-decoration: none; font-size: 12px; margin: 0 10px; transition: color 0.2s;'>Terms & Conditions</a>
                            </div>
                            
                            <p style='margin: 0; font-size: 12px; color: #475569;'>&copy; ${new Date().getFullYear()} HDL Perma Code TECH. All rights reserved.</p>
                        </div>
                    </div>
                </div>
                <!-- Anti-Gmail Trim HACK: Forces unique string to stop message threading -->
                <span style="opacity: 0; color: transparent; display: none; font-size: 0px; line-height: 0px; max-height: 0px; max-width: 0px; overflow: hidden; height: 0px; width: 0px;">Reference ID: ${Date.now()}_${Math.random().toString(36).substring(2, 9)}</span>
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
