
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
        <ul id="contentMsg" class="notification">
        </ul>
        <script>
        const socket = io('https://servidormichat.onrender.com');
        </script>
    </div>
