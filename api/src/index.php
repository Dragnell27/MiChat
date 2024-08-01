<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mi chat</title>
    <link rel="stylesheet" href="./css/index.css">
    <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
    <!-- <script src="../js/socket.io.min.js"></script> -->
</head>

<body>
    <?php
        include './view/app.php';
    ?>
    
    <script type="module" src="./js/login.js"></script>
    <script type="module" src="./js/messages.js"></script>
    <script type="module" src="./js/index.js"></script>
</body>