<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['Name'];
    $email = $_POST['Email'];
    $subject = $_POST['Subject'];
    $message = $_POST['Message'];

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';  // Your SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'prasadankit129@gmail.com'; // Your SMTP username
        $mail->Password   = 'odfq hlqq agxu acny'; // Your SMTP password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('prasadanki129@gmail.com', 'Ankit Prasad');
        $mail->addAddress('prasadankit129@gmail.com'); // Email where you want to receive the form data

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = "Name: $name<br>Email: $email<br>Subject: $subject<br>Message: $message";

        // Send email
        $mail->send();
        echo "<script>alert('messege has been sent');</script>";
        header("Refresh:0; url = index.html");
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    // Redirect to the form page if accessed directly
    header("Location: https://prasadankit-129.github.io/prasadankit.in/");
    exit();
}
?>
