<?php

//Ejercicio 4. Crear un procesador de texto que analice un párrafo y extraiga estadísticas como conteo
//de palabras, frecuencia de palabras y longitud promedio.
//Ampliar el procesador para identificar n-gramas (secuencias de n palabras) y detectar
//frases comunes en el texto.
function analizarTexto($texto)
{
    // Limpiar y dividir el texto en palabras
    $texto = strtolower($texto);
    $texto = preg_replace('/[^\w\s]/', '', $texto);
    $palabras = preg_split('/\s+/', $texto, -1, PREG_SPLIT_NO_EMPTY);
    // Contar palabras
    $totalPalabras = count($palabras);
    // Frecuencia de palabras
    $frecuencia = array_count_values($palabras);
    arsort($frecuencia);
    // Longitud promedio
    $longitudTotal = array_reduce($palabras, fn($total, $p) => $total + strlen($p), 0
    );
    $longitudPromedio = $totalPalabras > 0 ?
        $longitudTotal / $totalPalabras : 0;

    return [
        'total_palabras' => $totalPalabras,
        'frecuencia' => $frecuencia,
        'longitud_promedio' => $longitudPromedio
    ];
}