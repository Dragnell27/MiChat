<?php

include_once('./connection.php');
$data = array();
$con = con();
try {
    // $query = 'insert into users (name_user,password) values("' . $_POST["nameUser"] . '","' . $_POST["passUser"] . '")';
    $query = 'insert into users (name_user,password) values("jaider","123")';
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

echo json_encode($data);