function iniciarJuego() {

    // Pedir al usuario el tamaño del tablero
    let filas = 0;
    let columnas = 0;

    filas =  parseInt(prompt("Introduce el número de filas del tablero"));
    if( filas > 10){
        alert("Número de filas no válido");
    }

    columnas = parseInt(prompt("Introduce el número de columnas del tablero"));
    if( columnas > 10){
        alert("Número de columnas no válido");
    }

    //GenerarTablero (Tamaño del Tablero)

    let tablero = new Array(filas);
    for(let i = 0; i < filas; i++){
        tablero[i] = new Array(columnas);
    }
    
    //ColocarMinas (Tablero, Cantidad de Minas)

    let cantMinas = Math.floor((filas * columnas) / 4);
    let minas = 0;
    while(minas < cantMinas){
        let filaAleatoria = Math.floor(Math.random() * filas);
        let columnaAleatoria = Math.floor(Math.random() * columnas); 
        if(tablero[filaAleatoria][columnaAleatoria] !== 'M'){
            tablero[filaAleatoria][columnaAleatoria] = 'M';
            minas++;
        }
    }

    // Números Tablero 

    for (let i = 0; i < filas; i++){
        for (let j = 0; j < columnas; j++){
            if(tablero[i][j] === 'M') continue;
            let minasCerca = 0;
            for (let x = -1; x <= 1; x++){
                for (let y = -1; y <= 1; y++){
                    let nuevaFila = i + x;
                    let nuevaColumna = j + y;
                    if(nuevaFila >= 0 && nuevaFila < filas && nuevaColumna >= 0 && nuevaColumna < columnas){
                        if(tablero[nuevaFila][nuevaColumna] === 'M'){
                            minasCerca++;
                        }
                    }
                }
            }
            tablero[i][j] = minasCerca;
        }
    }

    //console.table(tablero);

    //Tablero x

    let tablerox = new Array(filas);
    for(let i = 0; i < filas; i++){
        tablerox[i] = new Array(columnas);
    }
    for (let i = 0; i < filas; i++){
        for (let j = 0; j < columnas; j++){
            tablerox[i][j] = 'X';
        }
    }

    console.table(tablerox);

    // Función para revelar celdas adyacentes recursivamente

    function revelarCeldasAdyacentes(fila, columna) {
        if (fila < 0 || fila >= filas || columna < 0 || columna >= columnas) {
            return;
        }
        
        if (tablerox[fila][columna] !== 'X') {
            return;
        }
        
        tablerox[fila][columna] = tablero[fila][columna];
        
        if (tablero[fila][columna] === 0) {
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    if (x === 0 && y === 0) continue; 
                    revelarCeldasAdyacentes(fila + x, columna + y);
                }
            }
        }
    }

    let juegoTerminado = false;

    while (!juegoTerminado) {
        let fila = parseInt(prompt("Introduce la fila que quieres descubrir (0 a " + (filas - 1) + "):"));
        let columna = parseInt(prompt("Introduce la columna que quieres descubrir (0 a " + (columnas - 1) + "):"));

        if (fila < 0 || fila >= filas || columna < 0 || columna >= columnas) {
        alert("Coordenadas fuera de rango. Inténtalo de nuevo.");
        continue;
        }
        if (tablerox[fila][columna] !== 'X') {
        alert("Esta casilla ya ha sido descubierta. Inténtalo de nuevo.");
        continue;
        }

        // Usar la función para revelar celdas
        revelarCeldasAdyacentes(fila, columna);
        console.table(tablerox);

        if (tablero[fila][columna] === 'M') {
            alert("Has perdido");
            juegoTerminado = true;
        }
    }
}
