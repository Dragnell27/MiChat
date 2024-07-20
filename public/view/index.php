<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mi chat</title>
    <link rel="stylesheet" href="../css/index.css">
    <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
    <!-- <script src="../js/socket.io.min.js"></script> -->
</head>

<body>
    <div class="container">

        <?php
    include 'components/header.php';
    ?>
    <?php
    include 'components/form.php';
    ?>
    <main class="content">
        <div id="mensajes" class="messages">
            
            </div>
            <form id="form" class="form">
                <input type="text" id="input" class="input-mensajes" autocomplete="off" placeholder="Nuevo mensaje">
                <button type="submit" class="btn-send">Enviar</button>
            </form>
        </main>
        <ul id="contentMsg">
            </ul>
            <script>
                const socket = io('http://localhost:3000');
                </script>
</div>
    <script src="../js/login.js"></script>
    <script src="../js/mensajes.js"></script>
    <script src="../js/index.js"></script>
</body>

</html>