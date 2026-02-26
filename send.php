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
