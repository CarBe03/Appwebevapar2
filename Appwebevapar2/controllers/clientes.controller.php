<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// TODO: controlador de clientes

require_once('../models/clientes.model.php');
error_reporting(0);
$clientes = new Clientes;

switch ($_GET["op"]) {
    // TODO: Procedimiento para cargar todos los datos de los clientes
    case 'todos':
        $datos = array();
        $datos = $clientes->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
    
    // TODO: Procedimiento para obtener un registro específico de la base de datos
    case 'uno':
        $cliente_id = $_POST["cliente_id"];
        $datos = array();
        $datos = $clientes->uno($cliente_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    // TODO: Procedimiento para insertar un cliente en la base de datos
    case 'insertar':
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $licencia = $_POST["licencia"];
        $telefono = $_POST["telefono"];

        $datos = array();
        $datos = $clientes->insertar($nombre, $apellido, $licencia, $telefono);
        echo json_encode($datos);
        break;

    // TODO: Procedimiento para actualizar un cliente en la base de datos
    case 'actualizar':
        $cliente_id = $_POST["cliente_id"];
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $licencia = $_POST["licencia"];
        $telefono = $_POST["telefono"];

        $datos = array();
        $datos = $clientes->actualizar($cliente_id, $nombre, $apellido, $licencia, $telefono);
        echo json_encode($datos);
        break;

    // TODO: Procedimiento para eliminar un cliente de la base de datos
    case 'eliminar':
        $cliente_id = $_POST["cliente_id"];
        $datos = array();
        $datos = $clientes->eliminar($cliente_id);
        echo json_encode($datos);
        break;
}
