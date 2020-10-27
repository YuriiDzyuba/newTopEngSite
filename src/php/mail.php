<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$formHeader = $_POST['formHeader'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$comment = $_POST['comment'];


//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'mail.adm.tools';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'mail@top-english.com.ua'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = '108ICoP7tlsN'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('mail@top-english.com.ua'); // от кого будет уходить письмо?
$mail->addAddress('daryatorchuk@gmail.com');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с сайта TOP-ENGLISH ФОРМА -' .$formHeader.;
$mail->Body    = '' .$name . ' <br> ' .$phone. ' <br> ' .$comment;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
     echo 'success';
}
?>