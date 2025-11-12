<?php

//Ejercicio 2. Validador de Formularios

class Validador {
    public function validarEmail($email) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return "Email no valido.";
        }
        return "Email valido.";
    }
    public function validarNombre($nombre) {
        if (strlen($nombre) < 2 || !preg_match('/^[a-zA-Z\s]+$/', $nombre)) {
            return "Nombre no valido. Debe tener al menos 2 caracteres y solo letras.";
        }
        return "Nombre valido.";
    }
    public function validarTelefono($telefono) {
        if (!preg_match('/^[0-9]{9}$/', $telefono)) {
            return "Telefono no valido. Debe contener 9 digitos.";
        }
        return "Telefono valido.";
    }
    public function validarClave($clave) {
        if (strlen($clave) < 8 ||
            !preg_match('/[A-Z]/', $clave) ||
            !preg_match('/[a-z]/', $clave) ||
            !preg_match('/[0-9]/', $clave)) {
            return "Clave no valida. Debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero.";
        }
        return "Clave valida.";
    }
}

// Ejemplos de uso

$validador = new Validador();
$email = readline("Ingresa un email: ");
echo $validador->validarEmail($email);
$nombre = readline("Ingresa un nombre: ");
echo $validador->validarNombre($nombre);
$telefono = readline("Ingresa un telefono: ");
echo $validador->validarTelefono($telefono) ;
$clave = readline("Ingresa una clave: ");
echo $validador->validarClave($clave);

//En clase si me sale en la terminal lo que pido que se ingrese pero en casa no
?>
