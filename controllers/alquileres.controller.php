<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/alquileres.model.php');
$alquileres = new Alquileres();

switch ($_GET["op"]) {
    // Obtener todos los alquileres
    case 'todos': 
        $datos = array();
        $datos = $alquileres->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    // Obtener un alquiler por ID
    case 'uno': 
        $alquiler_id = $_POST["alquiler_id"];
        $datos = array();
        $datos = $alquileres->uno($alquiler_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    // Insertar un nuevo alquiler
    case 'insertar': 
        $vehiculo_id = $_POST["vehiculo_id"];
        $cliente_id = $_POST["cliente_id"];
        $fecha_inicio = $_POST["fecha_inicio"];
        $fecha_fin = $_POST["fecha_fin"];
        $total = $_POST["total"];
        
        $datos = array();
        $datos = $alquileres->insertar($vehiculo_id, $cliente_id, $fecha_inicio, $fecha_fin, $total);
        echo json_encode($datos);
        break;

    // Actualizar un alquiler existente
    case 'actualizar': 
        $alquiler_id = $_POST["alquiler_id"];
        $vehiculo_id = $_POST["vehiculo_id"];
        $cliente_id = $_POST["cliente_id"];
        $fecha_inicio = $_POST["fecha_inicio"];
        $fecha_fin = $_POST["fecha_fin"];
        $total = $_POST["total"];
        
        $datos = array();
        $datos = $alquileres->actualizar($alquiler_id, $vehiculo_id, $cliente_id, $fecha_inicio, $fecha_fin, $total);
        echo json_encode($datos);
        break;

    // Eliminar un alquiler
    case 'eliminar': 
        $alquiler_id = $_POST["alquiler_id"];
        $datos = array();
        $datos = $alquileres->eliminar($alquiler_id);
        echo json_encode($datos);
        break;
}
?>
