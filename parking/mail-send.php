<?php
        
  header('Content-Type: text/html; charset=utf-8');

  $to='nkamyshev@yandex.ru';
  $subject='parking reserve';
  $acception= 'Подтверждение';
  $message=$_POST['message'];
  $from='info@parkovkasamara.ru';
  $contactEmail=$_POST['contactEmail'];
  $notification='Добрый день! <br />' . 'Место для вашего автомобиля зарезервировано, мы ожидаем вас ' . $_POST['from'] . ' c ' . $_POST['fromTime'] . ' <br />' . 'Спасибо что воспользовались электронной формой заказа! <br /> Письмо сгенерировано автоматически, но вы можете задать любые вопросы, написав на данный адрес.';
  $headers = 'From: ' . $from . "\r\n".
      'Reply-To: ' . $from ;

  $is_sent=mail($to,$subject,$message,$headers);
        


  if($is_sent){
    echo('ok'); 
    $subject=$acception;
    $message=$notification;
    $to=$contactEmail;
    $notice=mail($to,$subject,$message,$headers);
  } else {
    error_log(error_get_last());
  }
