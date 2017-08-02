<?php

  header('Content-Type: text/html; charset=utf-8');

  $to='vagrant@vagrant-ubuntu-trusty-64';
  $subject='Сообщение с сайта';
  $from='info@kornet63.ru';
  $headers = 'From: ' . $from . "\r\n".
    'Reply-To: ' . $from ;
  $name =  $_POST['name'];
  $phone =  $_POST['phone'];
  $text = $_POST['message'];
  $message = "name : ".$name."\n"."phone : ".$phone."\n"."message : ".$text;

  $is_sent=mail($to,$subject,$message,$headers);


  if($is_sent){
    echo "message sent succesfully"."\n"."name : ".$name."\n"."phone : ".$phone."\n"."message : ".$text; 
  

  } else {
    error_log(error_get_last());
  }
 
  




