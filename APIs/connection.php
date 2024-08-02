<?php
function con()
{
    $db = 'if0_37024331_michat';
    $host = 'sql112.infinityfree.com';
    $puerto = 3306;
    $user = 'if0_37024331';
    $pass = 'kj6f3gelEgRwnd0';
    return mysqli_connect($host, $user, $pass, $db, $puerto);
}
