<?php

 $source = "https://api.wunderground.com/api/775d1a931876841a/geolookup/conditions/forecast/q/Russia/Kurumoch.json";
 $destination = __DIR__ . "/Kurumoch.json";

 $data = file_get_contents($source);
 $file = fopen($destination, "w+");
 fputs($file, $data);
 fclose($file);

?>