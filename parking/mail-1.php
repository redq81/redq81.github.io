<?php

$to='nkamyshev@yandex.ru';
$subject='parking reserve';
$message=$_POST['message'];
$from='info@parkovkasamara.ru';
$headers = 'From: ' . $from . "\r\n".
    'Reply-To: ' . $from ;

$is_sent=mail($to,$subject,$message,$headers);

if($is_sent){
    echo('ok');

  } else {
    error_log(error_get_last());
  }
 

