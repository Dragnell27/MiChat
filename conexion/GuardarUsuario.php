<?php
function con()
{
    $db = 'michat';
    $host = 'localhost';
    $puerto = 3306;
    $user = 'root';
    $pass = '';
    return mysqli_connect($host, $user, $pass, $db, $puerto);
}
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
echo json_encode($data);
