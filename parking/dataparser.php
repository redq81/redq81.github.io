<?php
$data = json_decode($_POST['jsonData']);
$response = 'Получено параметров '.count($data).'\n';
foreach ($data as $key=>$value) {
    $response .= 'Параметр: '.$key.'; Значение: '.$value.'\n';
}
echo $response;
?>