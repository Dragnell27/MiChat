<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mi chat</title>
    <link rel="stylesheet" href="../css/style.css">
    <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
    <!-- <script src="../js/socket.io.min.js"></script> -->
</head>

<body>
    <div id="titulo">
        <h3>Mi chat</h3>
    </div>
    <div id="fondo">
    </div>
    <ul id="contentMsg">
    </ul>
    <script>
        const socket = io('http://localhost:3000');
    </script>
    <script id="scriptMensajes"></script>
    <script src="../js/login.js"></script>
    <script id="eventos"></script>
</body>

</html>