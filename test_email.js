require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.hostinger.com",
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: parseInt(process.env.EMAIL_PORT) === 465,
    auth: {
        user: process.env.EMAIL_USER || "developer@hdlpermacodetech.com",
        pass: process.env.EMAIL_PASS || "Nitro19960422."
    },
    logger: true,
    debug: true
});

async function testEmail() {
    try {
        console.log("Verifying connection...");
        await transporter.verify();
        console.log("Connection verified successfully!");

        console.log("Attempting to send a test email...");
        const info = await transporter.sendMail({
            from: `"Test" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "Test Email from Node.js",
            text: "This is a test email to verify SMTP configuration.",
        });
        console.log("Test email sent success:", info.response);
    } catch (error) {
        console.error("Test email failed:", error);
    }
}

testEmail();
