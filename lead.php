<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';

if (empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Email address is required.']);
    exit;
}

// Ensure PHPMailer is included correctly. 
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$devMail = new PHPMailer(true);
$clientMail = new PHPMailer(true);

try {
    // --- Developer Email Configuration (Notify Developer of new Lead) ---
    $devMail->isSMTP();
    $devMail->Host = 'smtp.hostinger.com';
    $devMail->SMTPAuth = true;
    $devMail->Username = 'developer@hdlpermacodetech.com';
    $devMail->Password = 'Nitro19960422.';
    $devMail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $devMail->Port = 465;

    $devMail->setFrom('developer@hdlpermacodetech.com', 'HDL Website Lead');
    $devMail->addAddress('developer@hdlpermacodetech.com', 'HDL Developer');
    $devMail->addReplyTo($email);

    $devMail->isHTML(true);
    $devMail->Subject = "New Audit Checklist Download - $email";
    $devMail->Body = "
    <html>
    <head><title>New Lead Notification</title></head>
    <body style='font-family: Arial, sans-serif;'>
      <h2>New Lead Captured!</h2>
      <p>A user has downloaded the Free Website Audit Checklist.</p>
      <p><strong>Email:</strong> {$email}</p>
    </body>
    </html>
    ";
    $devMail->send();

    // --- Client Auto-Reply Configuration (Send Checklist Link to Client) ---
    $clientMail->isSMTP();
    $clientMail->Host = 'smtp.hostinger.com';
    $clientMail->SMTPAuth = true;
    $clientMail->Username = 'developer@hdlpermacodetech.com';
    $clientMail->Password = 'Nitro19960422.';
    $clientMail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $clientMail->Port = 465;

    $clientMail->setFrom('developer@hdlpermacodetech.com', 'HDL Perma Code TECH');
    $clientMail->addAddress($email);

    $clientMail->isHTML(true);
    $clientMail->Subject = "Here is your Free Website Audit Checklist! 🚀";

    // Auto Response Content for the Client
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
            .btn { display: inline-block; background-color: #38bdf8; color: #020617 !important; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; margin-top: 20px; }
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
                    <h2>Here is your Audit Checklist!</h2>
                    <p>Thank you for requesting our Free Website Audit Checklist. We are thrilled to share these 10 exact steps that help our clients increase conversion rates and SEO rankings.</p>
                    <p>Inside, you'll find actionable insights that you can implement right away to improve your digital presence.</p>
                    
                    <div style='text-align: center; margin: 30px 0;'>
                        <a href='https://hdlpermacodetech.com/' class='btn'>Download Checklist Now</a>
                    </div>
                    
                    <p>If you have any questions or decide you want the experts to handle it, don't hesitate to reach out to us. We build premium, high-converting digital infrastructure.</p>
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

    $clientMail->Body = $clientMessage;
    $clientMail->send();

    echo json_encode(['success' => true, 'message' => 'Checklist sent to your email successfully.']);
}
catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => "Email failed to send. Developer Error: {$devMail->ErrorInfo}"]);
}
?>
