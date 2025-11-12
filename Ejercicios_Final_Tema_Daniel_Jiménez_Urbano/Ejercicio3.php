<?php

//Ejercicio 3. Manipulación de Arrays

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

function buscarPorNombre($productos, $nombre) {
    return array_filter($productos, fn($p) =>
        stripos($p["nombre"], $nombre) !== false
    );
}

// Resultados

echo "Productos caros (precio > 400):";
print_r($caros);
echo "Productos ordenados por precio:";
print_r($productos);
echo "Valor total del inventario: $valorTotal\n";

//Reto adicional

$coincidenciaParcial1 = "lap";
$resultadoCoincidencia1 = buscarPorNombre($productos, $coincidenciaParcial1);
echo "Productos que coinciden con '$coincidenciaParcial1':";
print_r($resultadoCoincidencia1);

$coincidenciaParcial2 = "fono";
$resultadoCoincidencia2 = buscarPorNombre($productos, $coincidenciaParcial2);
echo "Productos que coinciden con '$coincidenciaParcial2':";
print_r($resultadoCoincidencia2);


?>
