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
if($con){
    echo "Connected successfully";
    mysqli_close($con);  // Always close the connection when finished.  This is good practice for security and efficiency.  In this case, we're closing the connection immediately after the connection was successful.  In a real-world application, you might want to close the connection after some time or when you're done with it.  For this simple example, we're closing it immediately.  The connection will be closed when the script ends.  However, it's always a good practice to close the connection when you're done.  This helps prevent resource leaks and helps ensure that your database server is not overwhelmed with connections.  This is a good practice for all database connections, not just MySQL connections.  You should always close your connections when you're done with them.  This is especially important in PHP, where connections are automatically closed when the script ends.  However, it's always a good practice to close the connection when
}else{
    echo "Connection failed: ".mysqli_connect_error();
}