<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/vehiculos.model.php');
$vehiculos = new Vehiculos;

switch ($_GET["op"]) {
    // TODO: Cargar todos los vehículos
    case 'todos':
        $datos = array();
        $datos = $vehiculos->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    // TODO: Obtener un vehículo por ID
    case 'uno':
        $vehiculo_id = $_POST["vehiculo_id"];
        $datos = $vehiculos->uno($vehiculo_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    // TODO: Insertar un nuevo vehículo
    case 'insertar':
        $marca = $_POST["marca"];
        $modelo = $_POST["modelo"];
        $year = $_POST["year"];
        $disponible = isset($_POST["disponible"]) ? $_POST["disponible"] : true;

        $datos = $vehiculos->insertar($marca, $modelo, $year, $disponible);
        echo json_encode($datos);
        break;

    // TODO: Actualizar un vehículo existente
    case 'actualizar':
        $vehiculo_id = $_POST["vehiculo_id"];
        $marca = $_POST["marca"];
        $modelo = $_POST["modelo"];
        $year = $_POST["year"];
        $disponible = $_POST["disponible"];

        $datos = $vehiculos->actualizar($vehiculo_id, $marca, $modelo, $año, $disponible);
        echo json_encode($datos);
        break;

    // TODO: Eliminar un vehículo
    case 'eliminar':
        $vehiculo_id = $_POST["vehiculo_id"];
        $datos = $vehiculos->eliminar($vehiculo_id);
        echo json_encode($datos);
        break;
}
