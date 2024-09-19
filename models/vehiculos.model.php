<?php
// TODO: Clase de Vehiculos para el Sistema de Gestión de Alquiler de Vehículos
require_once('../config/config.php');

class Vehiculos
{
    // Método para obtener todos los vehículos
    public function todos() // SELECT * FROM vehiculos
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Vehiculos`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Método para obtener un vehículo por su ID
    public function uno($vehiculo_id) // SELECT * FROM vehiculos WHERE vehiculo_id = $vehiculo_id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Vehiculos` WHERE `vehiculo_id` = $vehiculo_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Método para insertar un nuevo vehículo
    public function insertar($marca, $modelo, $year, $disponible = true) // INSERT INTO vehiculos (marca, modelo, year, disponible) VALUES ('$marca', '$modelo', '$year', '$disponible')
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `Vehiculos`(`marca`, `modelo`, `year`, `disponible`) 
                       VALUES ('$marca', '$modelo', '$year', '$disponible')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Retornar el ID insertado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    // Método para actualizar un vehículo existente
    public function actualizar($vehiculo_id, $marca, $modelo, $year, $disponible) // UPDATE vehiculos SET marca = '$marca', modelo = '$modelo', year = '$year', disponible = '$disponible' WHERE vehiculo_id = $vehiculo_id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `Vehiculos` SET 
                       `marca`='$marca',
                       `modelo`='$modelo',
                       `year`='$year',
                       `disponible`='$disponible'
                       WHERE `vehiculo_id` = $vehiculo_id";
            if (mysqli_query($con, $cadena)) {
                return $vehiculo_id; // Retornar el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    // Método para eliminar un vehículo
    public function eliminar($vehiculo_id) // DELETE FROM vehiculos WHERE vehiculo_id = $vehiculo_id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `Vehiculos` WHERE `vehiculo_id`= $vehiculo_id";
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
