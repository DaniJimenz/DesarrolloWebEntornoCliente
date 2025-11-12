<?php

//Ejercicio 1. Calculadora
//Crear una calculadora simple que realice operaciones básicas (suma, resta,
//multiplicación, división) utilizando funciones.

function calcular($num1, $num2, $operacion){
    try{
        $operacion = strtolower($operacion); // Reducir a minuscula para evitar errores
        if(!is_numeric($num1) || !is_numeric($num2)){
            throw new Exception('Los valores deben ser numericos');
        }
        return match($operacion){
        'suma' => $num1 + $num2,
        'resta' => $num1 - $num2,
        'multiplicacion' => $num1 * $num2,
        'division' => $num2 != 0 ? $num1 / $num2 : 'Error: Division por cero',
        'potencia' => pow($num1, $num2),
        'raizCuadrada' => $num1 >= 0 ? sqrt($num1) : 'Error: Raiz cuadrada de numero negativo',
        'modulo' => $num1 % $num2,
        default => throw new Exception('Operacion no valida'),
        };
    } catch (Exception $e){
        return 'Error: ' . $e->getMessage();
    }
}

// Ejemplos de uso

echo calcular(10, 5, 'suma') ;
echo "\n";



?>

