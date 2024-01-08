<?php
$data = array();
try {
    $db = 'michat';
    $host = 'localhost';
    $puerto = 3306;
    $user = 'root';
    $pass = '';

    $con = mysqli_connect($host, $user, $pass, $db, $puerto);

    $query = 'insert into users values("' . $_POST["idSocket"] . '","' . $_POST["nameUser"] . '")';
    $resultado = mysqli_query($con, $query);

    if ($resultado) {
        $data['status'] = 'ok';
        $data['msg'] = 'Usuario guardado exitosamente';
    } else {
        $data['status'] = 'Error';
        $data['msg'] = 'Error al guardar usuario';
    }

} catch (Exception $e) {
    $data['status'] = 'Error';
    $data['msg'] = 'Error al guardar usuario';
}
echo json_encode($data);
