<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Sanitize form input
    $name = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
    $surname = htmlspecialchars(trim($_POST['surname'] ?? ''), ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars(trim($_POST['email'] ?? ''), ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''), ENT_QUOTES, 'UTF-8');

    // Validate required fields
    if (!$name || !$surname || !$email || !$phone) {
        echo "Please fill all fields";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // --- FIX UTF-8 encoding for Russian, Ukrainian, Catalan, etc. ---
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        // SMTP configuration for Hostinger
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@zbcventanas.com';  // Your corporate email
        $mail->Password   = '!S53em4e12345';         // Your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Sender and receiver
        $mail->setFrom('info@zbcventanas.com', 'Website Form');
        $mail->addAddress('info@zbcventanas.com'); // You receive messages here

        // Client reply-to
        $mail->addReplyTo($email, $name);

        // Email content
        $mail->isHTML(false);
        $mail->Subject = 'New form submission from website';
        $mail->Body =
            "Name: $name\n" .
            "Surname: $surname\n" .
            "Email: $email\n" .
            "Phone: $phone";

        // Send email
        $mail->send();

        // ------------------ LANGUAGE REDIRECT SYSTEM ------------------

        $ref = strtolower($_SERVER['HTTP_REFERER'] ?? '');

        // Default = Spanish
        $redirect = '/thanks/thank-you-esp.html';

        // English
        if (strpos($ref, '/eng') !== false || strpos($ref, 'eng.html') !== false) {
            $redirect = '/thanks/thank-you-eng.html';
        }
        // Russian
        elseif (
            strpos($ref, '/rus') !== false ||
            strpos($ref, '/ru') !== false ||
            strpos($ref, 'ru.html') !== false ||
            strpos($ref, 'rus.html') !== false
        ) {
            $redirect = '/thanks/thank-you-ru.html';
        }
        // Ukrainian
        elseif (strpos($ref, '/ua') !== false || strpos($ref, 'ua.html') !== false) {
            $redirect = '/thanks/thank-you-ua.html';
        }
        // Catalan
        elseif (strpos($ref, '/cat') !== false || strpos($ref, 'cat.html') !== false) {
            $redirect = '/thanks/thank-you-cat.html';
        }
        // Spanish
        elseif (
            strpos($ref, '/esp') !== false ||
            strpos($ref, 'esp.html') !== false ||
            strpos($ref, 'index.html') !== false
        ) {
            $redirect = '/thanks/thank-you-esp.html';
        }

        // Redirect user
        header("Location: $redirect");
        exit();

    } catch (Exception $e) {
        echo "Email could not be sent. Error: {$mail->ErrorInfo}";
    }

} else {
    echo "Invalid request method";
}
?>
