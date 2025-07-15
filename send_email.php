<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone = isset($_POST["phoneNumber"]) ? htmlspecialchars($_POST["phoneNumber"]) : '';
    $subject = isset($_POST["subject"]) ? htmlspecialchars($_POST["subject"]) : 'Consultation Request';
    $message = htmlspecialchars($_POST["message"]);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format!";
        exit;
    }
}
else {
    http_response_code(405);
    echo('Method Not Allowed');
    exit;
}
$mail = new PHPMailer(true);

try {
$mail->isSMTP();
    $mail->Host = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['SMTP_USER'];
    $mail->Password = $_ENV['SMTP_PASS'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $_ENV['SMTP_PORT'];
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ],
    ];
    $mail->setFrom($email, $name);
    $mail->addAddress($_ENV['RECIPIENT_EMAIL']);
    $mail->addReplyTo($email, $name);
    $mail->Subject = "Consultation Request: $subject";
    $mail->Body = "You have received a new consultation request.\n\n".
                        "Name: $name\n".
                        "Email: $email\n".
                        "Phone Number: $phone\n".
                        "\n$message";;

    $mail->send();
    echo 'Message sent successfully!';
} catch (Exception $e) {
    http_response_code(500);
    echo "Message could not be sent. Error: {$mail->ErrorInfo}";
}

?>
