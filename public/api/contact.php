<?php
/**
 * Soulmates Orchestra - Contact Form Handler
 */

// Error handling
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Configuration
$SITE_EMAIL = 'info@soulmatesorchestra.com';
$SITE_NAME = 'Soulmates Orchestra';

/**
 * Send email via direct SMTP socket to localhost:25 (no authentication).
 * Returns true on success, or an error string on failure.
 */
function smtp_send($from, $to, $subject, $body, $headers) {
    $smtp = @fsockopen('localhost', 25, $errno, $errstr, 5);
    if (!$smtp) {
        return "Could not connect to local SMTP: $errstr ($errno)";
    }

    $response = fgets($smtp, 512);
    if (substr($response, 0, 3) !== '220') {
        fclose($smtp);
        return "SMTP greeting failed: $response";
    }

    $hostname = gethostname() ?: 'localhost';
    $commands = [
        "EHLO $hostname" => '250',
        "MAIL FROM:<$from>" => '250',
        "RCPT TO:<$to>" => '250',
        "DATA" => '354',
    ];

    foreach ($commands as $cmd => $expect) {
        fwrite($smtp, "$cmd\r\n");
        $response = fgets($smtp, 512);
        if (substr($response, 0, 3) !== $expect) {
            fwrite($smtp, "QUIT\r\n");
            fclose($smtp);
            return "SMTP command '$cmd' failed: $response";
        }
        // Read any continuation lines (e.g. EHLO multi-line response)
        if ($expect === '250' && strpos($cmd, 'EHLO') === 0) {
            while (substr($response, 3, 1) === '-') {
                $response = fgets($smtp, 512);
            }
        }
    }

    // Send headers + body
    $msg = implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.\r\n";
    fwrite($smtp, $msg);
    $response = fgets($smtp, 512);
    fwrite($smtp, "QUIT\r\n");
    fclose($smtp);

    if (substr($response, 0, 3) !== '250') {
        return "SMTP DATA rejected: $response";
    }

    return true;
}

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['error' => 'Method not allowed']));
}

try {
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        http_response_code(400);
        die(json_encode(['error' => 'Invalid JSON', 'received' => $input]));
    }

    // Honeypot check
    if (!empty($data['honeypot'])) {
        die(json_encode(['success' => true]));
    }

    // Validate required fields
    $required = ['name', 'email', 'phone', 'eventType', 'eventDate', 'guestCount', 'message'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            http_response_code(400);
            die(json_encode(['error' => "Missing required field: $field"]));
        }
    }

    // Sanitize inputs
    $name = htmlspecialchars(strip_tags($data['name']), ENT_QUOTES, 'UTF-8');
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(strip_tags($data['phone']), ENT_QUOTES, 'UTF-8');
    $company = !empty($data['company']) ? htmlspecialchars(strip_tags($data['company']), ENT_QUOTES, 'UTF-8') : '';
    $eventType = htmlspecialchars(strip_tags($data['eventType']), ENT_QUOTES, 'UTF-8');
    $eventDate = htmlspecialchars(strip_tags($data['eventDate']), ENT_QUOTES, 'UTF-8');
    $guestCount = htmlspecialchars(strip_tags($data['guestCount']), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(strip_tags($data['message']), ENT_QUOTES, 'UTF-8');

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        die(json_encode(['error' => 'Invalid email address']));
    }

    // Event type labels
    $eventTypeLabels = [
        'corporate' => 'Corporate Event',
        'barMitzvah' => 'Bar/Bat Mitzvah',
        'private' => 'Private Event',
        'other' => 'Other'
    ];
    $eventTypeLabel = isset($eventTypeLabels[$eventType]) ? $eventTypeLabels[$eventType] : $eventType;

    // Format date
    $formattedDate = date('l, F j, Y', strtotime($eventDate));

    // Build plain text email (more reliable than HTML)
    $teamSubject = "New Inquiry: $eventTypeLabel - $name";
    $teamBody = "NEW EVENT INQUIRY\n";
    $teamBody .= "================\n\n";
    $teamBody .= "Name: $name\n";
    $teamBody .= "Email: $email\n";
    $teamBody .= "Phone: $phone\n";
    if ($company) {
        $teamBody .= "Company: $company\n";
    }
    $teamBody .= "Event Type: $eventTypeLabel\n";
    $teamBody .= "Event Date: $formattedDate\n";
    $teamBody .= "Guest Count: $guestCount\n\n";
    $teamBody .= "Message:\n";
    $teamBody .= "--------\n";
    $teamBody .= "$message\n";

    // Send email via direct SMTP to localhost (bypasses msmtp/authenticated relay)
    $fromEmail = 'noreply@localhost';
    $sent = smtp_send($fromEmail, $SITE_EMAIL, $teamSubject, $teamBody, [
        "From: $SITE_NAME <$fromEmail>",
        "Reply-To: $name <$email>",
        "To: $SITE_EMAIL",
        "Subject: $teamSubject",
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8",
    ]);

    if ($sent === true) {
        // Try to send confirmation to user (don't fail if this doesn't work)
        $userSubject = "Thank you for your inquiry - Soulmates Orchestra";
        $userBody = "Dear $name,\n\n";
        $userBody .= "Thank you for reaching out to Soulmates Orchestra!\n\n";
        $userBody .= "We've received your inquiry about your $eventTypeLabel and are excited to learn more.\n\n";
        $userBody .= "Our team will review your request and get back to you within 24 hours.\n\n";
        $userBody .= "Warm regards,\n";
        $userBody .= "The Soulmates Orchestra Team\n";

        @smtp_send($fromEmail, $email, $userSubject, $userBody, [
            "From: $SITE_NAME <$fromEmail>",
            "To: $email",
            "Subject: $userSubject",
            "MIME-Version: 1.0",
            "Content-Type: text/plain; charset=UTF-8",
        ]);

        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Email sending failed: ' . $sent . '. Please contact us directly at ' . $SITE_EMAIL]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
