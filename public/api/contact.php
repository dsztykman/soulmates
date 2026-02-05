<?php
/**
 * Soulmates Orchestra - Contact Form Handler
 *
 * Place this file on your PHP server and configure CORS and email settings below.
 */

// Configuration
$SITE_EMAIL = 'info@soulmatesorchestra.com';
$SITE_NAME = 'Soulmates Orchestra';

// CORS headers - adjust origin for production
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit();
}

// Honeypot check
if (!empty($data['honeypot'])) {
    // Bot detected, return success to fool it
    echo json_encode(['success' => true]);
    exit();
}

// Validate required fields
$required = ['name', 'email', 'phone', 'eventType', 'eventDate', 'guestCount', 'message'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit();
    }
}

// Sanitize inputs
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags($data['phone']));
$company = !empty($data['company']) ? htmlspecialchars(strip_tags($data['company'])) : '';
$eventType = htmlspecialchars(strip_tags($data['eventType']));
$eventDate = htmlspecialchars(strip_tags($data['eventDate']));
$guestCount = htmlspecialchars(strip_tags($data['guestCount']));
$message = htmlspecialchars(strip_tags($data['message']));

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

// Event type labels
$eventTypeLabels = [
    'corporate' => 'Corporate Event',
    'barMitzvah' => 'Bar/Bat Mitzvah',
    'private' => 'Private Event',
    'other' => 'Other'
];
$eventTypeLabel = $eventTypeLabels[$eventType] ?? $eventType;

// Format date
$formattedDate = date('l, F j, Y', strtotime($eventDate));

// Build notification email to team
$teamSubject = "New Inquiry: $eventTypeLabel - $name";
$teamMessage = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #CCB380 0%, #B9A06D 100%); color: #FAFAFA; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
        .value { margin-top: 4px; color: #333; }
        .message-box { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #CCB380; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1 style='margin: 0;'>New Event Inquiry</h1>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name</div>
                <div class='value'>$name</div>
            </div>
            <div class='field'>
                <div class='label'>Email</div>
                <div class='value'><a href='mailto:$email'>$email</a></div>
            </div>
            <div class='field'>
                <div class='label'>Phone</div>
                <div class='value'><a href='tel:$phone'>$phone</a></div>
            </div>
            " . ($company ? "
            <div class='field'>
                <div class='label'>Company</div>
                <div class='value'>$company</div>
            </div>
            " : "") . "
            <div class='field'>
                <div class='label'>Event Type</div>
                <div class='value'>$eventTypeLabel</div>
            </div>
            <div class='field'>
                <div class='label'>Event Date</div>
                <div class='value'>$formattedDate</div>
            </div>
            <div class='field'>
                <div class='label'>Guest Count</div>
                <div class='value'>$guestCount guests</div>
            </div>
            <div class='field'>
                <div class='label'>Message</div>
                <div class='message-box'>" . nl2br($message) . "</div>
            </div>
        </div>
    </div>
</body>
</html>
";

// Build confirmation email to user
$userSubject = "Thank you for your inquiry - Soulmates Orchestra";
$userMessage = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #0A0A0A; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .card { background: #1A1A1A; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #CCB380 0%, #B9A06D 100%); padding: 30px; text-align: center; }
        .header h1 { color: #FAFAFA; margin: 0; font-size: 24px; }
        .content { padding: 30px; color: #FAFAFA; }
        .content p { margin-bottom: 15px; color: #A1A1A1; }
        .highlight { color: #CCB380; }
        .footer { padding: 20px 30px; border-top: 1px solid #252525; text-align: center; color: #6B6B6B; font-size: 14px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='card'>
            <div class='header'>
                <h1>Soulmates Orchestra</h1>
            </div>
            <div class='content'>
                <p>Dear <span class='highlight'>$name</span>,</p>
                <p>Thank you for reaching out to Soulmates Orchestra! We've received your inquiry and are excited to learn more about your upcoming $eventTypeLabel.</p>
                <p>Our team will review your request and get back to you within <span class='highlight'>24 hours</span> to discuss how we can make your event unforgettable.</p>
                <p style='margin-top: 30px;'>Warm regards,<br><span class='highlight'>The Soulmates Orchestra Team</span></p>
            </div>
            <div class='footer'>
                &copy; " . date('Y') . " Soulmates Orchestra. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $SITE_NAME . ' <noreply@soulmatesorchestra.com>',
    'Reply-To: ' . $email
];
$headerString = implode("\r\n", $headers);

$userHeaders = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $SITE_NAME . ' <hello@soulmatesorchestra.com>'
];
$userHeaderString = implode("\r\n", $userHeaders);

// Send emails
$teamSent = mail($SITE_EMAIL, $teamSubject, $teamMessage, $headerString);
$userSent = mail($email, $userSubject, $userMessage, $userHeaderString);

if ($teamSent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
