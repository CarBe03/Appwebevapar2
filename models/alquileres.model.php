<?php
require_once('../config/config.php'); // Archivo de configuración para la conexión a la base de datos

class Alquileres
{
    // Método para obtener todos los alquileres
    public function todos() 
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `alquileres`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Método para obtener un solo alquiler por ID
    public function uno($alquiler_id) 
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `alquileres` WHERE `alquiler_id` = $alquiler_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Método para insertar un nuevo alquiler
    public function insertar($vehiculo_id, $cliente_id, $fecha_inicio, $fecha_fin, $total) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `alquileres`(`vehiculo_id`, `cliente_id`, `fecha_inicio`, `fecha_fin`, `total`) 
                       VALUES ('$vehiculo_id', '$cliente_id', '$fecha_inicio', '$fecha_fin', '$total')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Devolver el ID insertado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    // Método para actualizar un alquiler existente
    public function actualizar($alquiler_id, $vehiculo_id, $cliente_id, $fecha_inicio, $fecha_fin, $total) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `alquileres` SET 
                       `vehiculo_id`='$vehiculo_id', 
                       `cliente_id`='$cliente_id', 
                       `fecha_inicio`='$fecha_inicio', 
                       `fecha_fin`='$fecha_fin', 
                       `total`='$total' 
                       WHERE `alquiler_id` = $alquiler_id";
            if (mysqli_query($con, $cadena)) {
                return $alquiler_id; // Devolver el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    // Método para eliminar un alquiler
    public function eliminar($alquiler_id) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `alquileres` WHERE `alquiler_id`= $alquiler_id";
            if (mysqli_query($con, $cadena)) {
                return 1; // Éxito
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
?>
