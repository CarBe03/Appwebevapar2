<?php
// TODO: Clase de Clientes para el Sistema de Gestión de Alquiler de Vehículos
require_once('../config/config.php');

class Clientes
{
    // TODO: Implementar los métodos de la clase

    // Método para buscar un cliente por nombre
    public function buscar($nombre) // select * from clientes where nombre = '$nombre'
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Clientes` WHERE `nombre`='$nombre'";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Método para obtener todos los clientes
    public function todos() // select * from clientes
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Clientes`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Método para obtener un solo cliente por su ID
    public function uno($cliente_id) // select * from clientes where cliente_id = $cliente_id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Clientes` WHERE `cliente_id` = $cliente_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // Método para insertar un nuevo cliente
    public function insertar($nombre, $apellido, $licencia, $telefono) // insert into clientes (nombre, apellido, licencia, telefono) values ('$nombre', '$apellido', '$licencia', '$telefono')
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `Clientes`(`nombre`, `apellido`, `licencia`, `telefono`) 
                       VALUES ('$nombre', '$apellido', '$licencia', '$telefono')";
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

    // Método para actualizar un cliente existente
    public function actualizar($cliente_id, $nombre, $apellido, $licencia, $telefono) // update clientes set nombre = $nombre, apellido = $apellido, licencia = $licencia, telefono = $telefono where cliente_id = $cliente_id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `Clientes` SET 
                       `nombre`='$nombre',
                       `apellido`='$apellido',
                       `licencia`='$licencia',
                       `telefono`='$telefono'
                       WHERE `cliente_id` = $cliente_id";
            if (mysqli_query($con, $cadena)) {
                return $cliente_id; // Retornar el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    // Método para eliminar un cliente
    public function eliminar($cliente_id) // delete from clientes where cliente_id = $cliente_id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `Clientes` WHERE `cliente_id`= $cliente_id";
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
