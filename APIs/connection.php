<?php
function con()
{
    $db = 'railway';
    $host = 'mysql.railway.internal';
    $puerto = 3306;
    $user = 'root';
    $pass = 'DzrJHPLVIwkHgZymmAQkVFExvWxnfzxe';
    return mysqli_connect($host, $user, $pass, $db, $puerto);
}

$con = con();