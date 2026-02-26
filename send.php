<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader based on standard Hostinger/Composer setup, or fallback to manual include if needed
// Assuming the user might not have composer, we'll suggest including PHPMailer manually, but for a robust script, it's best to standard require.
// If PHPMailer is not installed via composer, they need to download it into a PHPMailer folder.
// For maximum compatibility on shared hosting without shell access, we'll write a standalone script that assumes PHPMailer is in a 'vendor' folder or similar.

header('Content-Type: application/json');

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$inquiryType = $data['inquiryType'] ?? '';
$budget = $data['budget'] ?? '';
$message = $data['message'] ?? '';

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Name, email, and message are required.']);
    exit;
}

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

$readableInquiry = isset($inquiryMap[$inquiryType]) ? $inquiryMap[$inquiryType] : $inquiryType;
$readableBudget = isset($budgetMap[$budget]) ? $budgetMap[$budget] : $budget;

$subject = "New Project Brief from $name - HDL Perma Code TECH";

// Developer Email Content
$devMessage = "
<html>
<head>
  <title>New Project Brief</title>
</head>
<body style='font-family: Arial, sans-serif; color: #333;'>
  <h2>New Project Brief Received!</h2>
  <p><strong>Name:</strong> {$name}</p>
  <p><strong>Email:</strong> {$email}</p>
  <p><strong>Inquiry Type:</strong> {$readableInquiry}</p>
  <p><strong>Budget:</strong> {$readableBudget}</p>
  <h3>Project Details:</h3>
  <p>" . nl2br(htmlspecialchars($message)) . "</p>
</body>
</html>
";

// Client Auto-Reply Content
$clientSubject = "We received your project brief! - HDL Perma Code TECH";
$clientMessage = "
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
                <h2>Hi {$name},</h2>
                <p>Thank you for reaching out and submitting your project brief. We have successfully received your inquiry and our team is already reviewing the details.</p>
                <p>At HDL Perma Code TECH, we take pride in engineering high-performance, conversion-optimized digital experiences. We're excited about the possibility of building your next big project.</p>
                
                <div class='summary-box'>
                    <strong>Your Submission Summary:</strong>
                    <p><strong>Inquiry Type:</strong> {$readableInquiry}</p>
                    <p><strong>Estimated Budget:</strong> {$readableBudget}</p>
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

// Ensure PHPMailer is included correctly. 
// If using Composer: require 'vendor/autoload.php';
// If manual installation, uncomment and adjust paths:
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);
$clientMail = new PHPMailer(true);

try {
    // --- Developer Email Configuration ---
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com'; // Hostinger SMTP Server
    $mail->SMTPAuth = true;
    $mail->Username = 'developer@hdlpermacodetech.com'; // Your Hostinger Email
    $mail->Password = 'Nitro19960422.'; // Your Hostinger Email Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    // Developer Email Content
    $mail->setFrom('developer@hdlpermacodetech.com', 'HDL Website');
    $mail->addAddress('developer@hdlpermacodetech.com', 'HDL Developer');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $devMessage;
    $mail->send();

    // --- Client Auto-Reply Configuration ---
    $clientMail->isSMTP();
    $clientMail->Host = 'smtp.hostinger.com';
    $clientMail->SMTPAuth = true;
    $clientMail->Username = 'developer@hdlpermacodetech.com';
    $clientMail->Password = 'Nitro19960422.';
    $clientMail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $clientMail->Port = 465;

    $clientMail->setFrom('developer@hdlpermacodetech.com', 'HDL Perma Code TECH');
    $clientMail->addAddress($email, $name);

    $clientMail->isHTML(true);
    $clientMail->Subject = $clientSubject;
    $clientMail->Body = $clientMessage;
    $clientMail->send();

    echo json_encode(['success' => true, 'message' => 'Project brief sent successfully.']);
}
catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => "Email failed to send. Mailer Error: {$mail->ErrorInfo}"]);
}
?>
