<?php
$url = str_replace(' ','%20',$_GET['url']);
echo file_get_contents($url);
?>
