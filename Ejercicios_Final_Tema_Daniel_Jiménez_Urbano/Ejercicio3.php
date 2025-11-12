<?php

//Ejercicio 3. Manipulación de Arrays
//Crear funciones para procesar una lista de productos con operaciones como filtrado,
//ordenación y transformación.

$productos = [
["id" => 1, "nombre" => "Laptop", "precio" => 899.99, "stock" => 10],
["id" => 2, "nombre" => "Teléfono", "precio" => 499.50, "stock" => 15],
["id" => 3, "nombre" => "Tablet", "precio" => 349.99, "stock" => 5],
];
// Filtrar productos con precio > 400// Contar palabras
$caros = array_filter($productos, fn($p) => $p["precio"] > 400);
// Ordenar por precio (ascendente)// Frecuencia de palabras
usort($productos, fn($a, $b) => $a["precio"] <=> $b["precio"]);

$valorTotal = array_reduce($productos, fn($total, $p) =>
    $total + ($p["precio"] * $p["stock"]), 0
);

// Resultados
echo "Productos caros (precio > 400):";

?>
