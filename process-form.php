<?php
header('Content-Type: application/json');

// Include PHPMailer library files
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// -------------------------------------------------------------
// IMPORTANT: HOSTINGER SMTP CREDENTIALS
// -------------------------------------------------------------
// The user MUST fill in their created email password here.
$smtp_host = 'smtp.hostinger.com';
$smtp_username = 'developer@hdlpermacodetech.com';
$smtp_password = 'Nitro19960422.';

$smtp_port = 465; // Hostinger uses 465 for SSL, or 587 for TLS
// -------------------------------------------------------------


// Define recipients
$to_developer = 'developer@hdlpermacodetech.com';
$developer_subject = 'New Project Brief Submitted - HDL Perma Code TECH';

// Get JSON POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid data received.']);
    exit;
}

// Sanitize inputs
$name = htmlspecialchars(trim($data['name'] ?? ''));
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$inquiryType = htmlspecialchars(trim($data['inquiryType'] ?? ''));
$budget = htmlspecialchars(trim($data['budget'] ?? ''));
$messageText = htmlspecialchars(trim($data['message'] ?? ''));

// Map values for better readability
$inquiryMap = [
    'starter_pkg' => 'Starter Package ($549)',
    'business_pkg' => 'Business Package ($999)',
    'professional_pkg' => 'Professional Package ($1,799)',
    'ecommerce_pkg' => 'E-Commerce Package ($1,499)',
    'custom_dev' => 'Custom Website Development',
    'templates' => 'Premium Website Templates',
    'other' => 'Other'
];

$budgetMap = [
    'under_1k' => 'Under $1,000',
    '1k_to_5k' => '$1,000 - $5,000',
    'over_5k' => '$5,000+'
];

$readableInquiry = $inquiryMap[$inquiryType] ?? $inquiryType;
$readableBudget = $budgetMap[$budget] ?? $budget;

if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Valid name and email are required.']);
    exit;
}

// Initialize Mailer Instances
$devMail = new PHPMailer(true);
$clientMail = new PHPMailer(true);

try {
    // ==========================================
    // 1. Email to Developer (Notification)
    // ==========================================

    // Server settings
    $devMail->isSMTP();
    $devMail->Host = $smtp_host;
    $devMail->SMTPAuth = true;
    $devMail->Username = $smtp_username;
    $devMail->Password = $smtp_password;
    $devMail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable SSL
    $devMail->Port = $smtp_port;

    // Recipients
    $devMail->setFrom($smtp_username, 'HDL Perma Code TECH Website');
    $devMail->addAddress($to_developer);
    $devMail->addReplyTo($email, $name);

    // Content
    $devMail->isHTML(false);
    $devMail->Subject = $developer_subject;

    $dev_body = "New Project Brief Received!\n\n";
    $dev_body .= "Name: $name\n";
    $dev_body .= "Email: $email\n";
    $dev_body .= "Inquiry Type: $readableInquiry\n";
    $dev_body .= "Budget: $readableBudget\n\n";
    $dev_body .= "Project Details:\n$messageText\n";

    $devMail->Body = $dev_body;

    // Send developer notification
    $devMail->send();


    // ==========================================
    // 2. Auto-Reply to Client
    // ==========================================
    $clientMail->isSMTP();
    $clientMail->Host = $smtp_host;
    $clientMail->SMTPAuth = true;
    $clientMail->Username = $smtp_username;
    $clientMail->Password = $smtp_password;
    $clientMail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable SSL
    $clientMail->Port = $smtp_port;

    $clientMail->setFrom($smtp_username, 'HDL Perma Code TECH');
    $clientMail->addAddress($email, $name);
    $clientMail->addReplyTo($smtp_username, 'HDL Perma Code TECH');

    $clientMail->isHTML(true);
    $clientMail->Subject = 'We received your project brief! - HDL Perma Code TECH';

    // Beautiful Branded HTML Template
    $clientMail->Body = "
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
                    <div class='logo'>HDL<span class='perma'>Perma</span><span class='code'>Code</span><span class='tech'>TECH</span></div>
                </div>
                
                <div class='content'>
                    <h2>Hi $name,</h2>
                    <p>Thank you for reaching out and submitting your project brief. We have successfully received your inquiry and our team is already reviewing the details.</p>
                    <p>At HDL Perma Code TECH, we take pride in engineering high-performance, conversion-optimized digital experiences. We're excited about the possibility of building your next big project.</p>
                    
                    <div class='summary-box'>
                        <strong>Your Submission Summary:</strong>
                        <p><strong>Inquiry Type:</strong> $readableInquiry</p>
                        <p><strong>Estimated Budget:</strong> $readableBudget</p>
                    </div>
                    
                    <p>One of our lead developers will review your requirements and follow up with you within 24-48 hours to discuss the next steps.</p>
                    <p>Best regards,<br>
                    <strong>The HDL Perma Code TECH Team</strong></p>
                </div>
                
                <div class='footer'>
                    Questions? Reply directly to this email or contact us at developer@hdlpermacodetech.com<br>
                    &copy; " . date('Y') . " HDL Perma Code TECH. All rights reserved.
                </div>
            </div>
        </div>
    </body>
    </html>
    ";

    $clientMail->send();

    echo json_encode(['success' => true, 'message' => 'Brief sent successfully via Hostinger SMTP!']);

}
catch (Exception $e) {
    http_response_code(500);
    // Returning the exact mailer Error so they know if the password/auth failed
    echo json_encode(['success' => false, 'message' => 'Mailer Error: ' . $devMail->ErrorInfo]);
}
?>
