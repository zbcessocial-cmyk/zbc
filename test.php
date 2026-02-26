<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // SMTP config
    $mail->isSMTP();
    $mail->SMTPDebug  = 2; // Подробный лог — убрать после отладки
    $mail->Debugoutput = 'html';
    $mail->Host       = 'smtp.hostinger.com'; // Hostinger SMTP server
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@zbcventanas.com'; // Your Hostinger email
    $mail->Password   = 'DGSsdbsdbfhn4&'; // Email password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer'       => false,
            'verify_peer_name'  => false,
            'allow_self_signed' => true,
        ],
    ];

    // Sender and receiver
    $mail->setFrom('info@zbcventanas.com', 'Hostinger Test');
    $mail->addAddress('info@zbcventanas.com'); // Send test email to yourself

    // Message
    $mail->Subject = 'PHPMailer Hostinger Test';
    $mail->Body    = "If you received this email, Hostinger SMTP works correctly.";

    // Send
    $mail->send();
    echo "SUCCESS: Email has been sent!";
} catch (Exception $e) {
    echo "ERROR: {$mail->ErrorInfo}";
}
