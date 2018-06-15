<DOCTYPE html>

<?php

$str = "pword";
echo "MD5 HASH - " . md5($str);

echo "<br><br>";

$output = password_hash($str, PASSWORD_DEFAULT);

echo "LASTEST ALG - $output";


?>