<?php

//Ejercicio 4
function analizarTexto($texto, $n = 2)
{
    // Limpiar y dividir el texto en palabras
    $texto = strtolower($texto);
    $texto = preg_replace('/[^\w\s]/', '', $texto);
    $palabras = preg_split('/\s+/', $texto, -1, PREG_SPLIT_NO_EMPTY);
    // Contar palabras
    $totalPalabras = count($palabras);

    if ($totalPalabras === 0) {
        return [
            'total_palabras' => 0,
            'frecuencia' => [],
            'longitud_promedio' => 0,
            'ngramas' => []
        ];
    }
    // Frecuencia de palabras
    $frecuencia = array_count_values($palabras);
    arsort($frecuencia);
    // Longitud promedio
    $longitudTotal = array_reduce($palabras, fn($total, $p) => $total + strlen($p), 0
    );
    $longitudPromedio = $totalPalabras > 0 ?
        $longitudTotal / $totalPalabras : 0;

    $ngramas = [];
    if ($totalPalabras >= $n) {
        for ($i = 0; $i <= $totalPalabras - $n; $i++) {
            $slice = array_slice($palabras, $i, $n);
            $ngrama = implode(' ', $slice);

            if (isset($ngramas[$ngrama])) {
                $ngramas[$ngrama]++;
            } else {
                $ngramas[$ngrama] = 1;
            }
        }
        arsort($ngramas);
    }
    return [
        'total_palabras' => $totalPalabras,
        'frecuencia' => $frecuencia,
        'longitud_promedio' => $longitudPromedio,
        'ngramas' => $ngramas
    ];
}
    echo "Ingrese un párrafo de texto:\n";
    $textoUsuario = readline();
    $resultado = analizarTexto($textoUsuario);
    echo "Total de palabras: " . $resultado['total_palabras'] . "\n";
    echo "Frecuencia de palabras:\n";
    foreach ($resultado['frecuencia'] as $palabra => $count) {
        echo "$palabra: $count\n";
    }
    echo "Longitud promedio de palabras: " . round ($resultado['longitud_promedio'], 2). "\n";
    echo "n-gramas más frecuentes:\n";
    foreach ($resultado['ngramas'] as $ngrama => $count) {
        echo "$ngrama: $count\n";
}

?>