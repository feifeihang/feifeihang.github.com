<?php
$url = str_replace(' ','%20',$_GET['url']);
echo get_http_response_code($url);
function get_http_response_code($url) {
    $headers = get_headers($url);
    return substr($headers[0], 9, 3);
}
?>
