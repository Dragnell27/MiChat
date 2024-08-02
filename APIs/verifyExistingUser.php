<?php

include_once './connection.php';

$data = array();
$con = con();

try {
    $query = 'SELECT * FROM users WHERE username = ' . '"' . $_POST['nameUser'] . '"';
    $result = $con->query($query);
    if ($result) {
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                if ($row['password'] == $_POST['passUser']) {
                    $data['status'] = 'OK';
                    $data['msg'] = 'Inicio de sesión exitoso';
                    $data['newUser'] = $row['username'];
                }else{
                    $data['status'] = 'FAILURE';
                    $data['newUser'] = $row['username'];
                    $data['msg'] = 'El usuario existe pero la contraseña es incorrecta';
                }
            }
        } else {
            $data['status'] = 'NOT_FOUND';
        }
    }
} catch (Exception $e) {
    $data['status'] = 'Error';
    $data['msg'] = 'Error en la consulta de comprobar datos: ' . mysqli_error($con);
}

echo json_encode($data);
