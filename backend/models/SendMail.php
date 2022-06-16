<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

function send_email( $to, $to_name, $subject, $message ) {
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->Mailer = 'smtp';

    $mail->SMTPDebug  = 0;

    $mail->SMTPAuth   = TRUE;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->Host       = 'smtp.gmail.com';
    $mail->Username   = 'infosqlgame@gmail.com';
    $mail->Password   = 'ryxtmdfqzgxucnmy';

    $mail->IsHTML( true );
    $mail->AddAddress( $to, $to_name );
    $mail->SetFrom( 'infosqlgame@gmail.com', 'SQL Game' );
    $mail->Subject = $subject;
    $content = $message;

    $mail->MsgHTML( $content );
    if ( !$mail->Send() ) {
        return 0;
    } else {
        return 1;
    }
}
// send_email('dobosalexandru2502@gmail.com', 'Alex Dobos', 'blabla', 'Verificare', 'Verificare')
?>
