<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require './PHPMailer/src/Exception.php';
    require './PHPMailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->isHTML(true);

    $mail->setFrom('young.bezero@gmail.com', 'name');

    $mail->addAddress('macesbeats@gmail.com');

    $mail->Subject = 'Hello';

   
    if(trim(!empty($_POST['name']))) {
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }

    if(trim(!empty($_POST['surname']))) {
        $body.='<p><strong>Фамилия:</strong> '.$_POST['surname'].'</p>';
    }

    if(trim(!empty($_POST['website']))) {
        $body.='<p><strong>website:</strong> '.$_POST['website'].'</p>';
    }

    if(trim(!empty($_POST['number']))) {
        $body.='<p><strong>tel:</strong> '.$_POST['number'].'</p>';
    }

    if(trim(!empty($_POST['mail']))) {
        $body.='<p><strong>email:</strong> '.$_POST['mail'].'</p>';
    }

    if(trim(!empty($_POST['job']))) {
        $body.='<p><strong>job:</strong> '.$_POST['job'].'</p>';
    }

    if(trim(!empty($_POST['service']))) {
        $body.='<p><strong>service:</strong> '.$_POST['service'].'</p>';
    }


    if(!empty($_FILES['documents']['tmp_name'])) {
        $filePath = __DIR__ . '/files/' . $_FILES['documents']['name'];

        if(copy($_FILES['image']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body.='<p><strong>Document in file</p>';
            $mail->addAttachment($fileAttach);
        }
    }

    $mail->Body = $body;

    if($mail->send()) {
        $message = 'Okay';
    } else {
        $message = "Error";
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);

?>

    