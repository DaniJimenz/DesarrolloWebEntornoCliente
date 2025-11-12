<?php

//Ejercicio 1. Calculadora

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
        'division' => $num2 != 0 ? $num1 / $num2 : 'Division por cero',
        'potencia' => pow($num1, $num2),
        'raizCuadrada' => $num1 >= 0 ? sqrt($num1) : 'Raiz cuadrada de numero negativo',
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
echo calcular(10, 5, 'resta');
echo "\n";
echo calcular(10, 5, 'multiplicacion');
echo "\n";
echo calcular(10, 5, 'division');
echo "\n";
echo calcular(10, 5, 'potencia');
echo "\n";
echo calcular(16, 0, 'raizcuadrada');
echo "\n";
echo calcular(10, 3, 'modulo');
echo "\n";

//Errores

echo calcular(10, 0, 'division'); //0
echo "\n";
echo calcular(-16, 0, 'raizcuadrada'); //Negativa
echo "\n";


?>

