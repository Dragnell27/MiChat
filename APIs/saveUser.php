<?php

include_once('./connection.php');
$data = array();
$con = con();
try {
    $query = 'insert into users values("' . $_POST["idSocket"] . '","' . $_POST["nameUser"] . '","' . $_POST["passUser"] . '")';
    $resultado = mysqli_query($con, $query);
    if ($resultado) {
        $data['status'] = 'ok';
        $data['msg'] = 'Usuario guardado exitosamente';
        $data['newUser'] = $_POST["nameUser"];
    } else {
        $data['status'] = 'Error';
        $data['msg'] = 'Error al guardar usuario';
    }
} catch (Exception $e) {
    $data['status'] = 'Error';
    $data['msg'] = 'Error al guardar usuario.: ' . mysqli_error($con);
}finally{
    $con->close();
}

header("Location: http://localhost/MiChat/public/view/");