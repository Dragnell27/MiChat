<?php
function con()
{
    $db = 'michat';
    $host = 'localhost';
    $puerto = 3306;
    $user = 'root';
    $pass = '';
    return mysqli_connect($host, $user, $pass, $db, $puerto);
}
