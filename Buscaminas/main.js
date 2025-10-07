'use strict'

// Pedir al usuario el tamaño del tablero
let filas = 0;
let columnas = 0;

filas =  parseInt(prompt("Introduce el número de filas del tablero"));
if( filas > 5){
    alert("Número de filas no válido");
}

columnas = parseInt(prompt("Introduce el número de columnas del tablero"));
if( columnas > 5){
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

//mostrarTablero (Tablero)
function mostrarTablero(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        let fila = '';
        for (let j = 0; j < tablero[i].length; j++) {
            if (tablero[i][j] === 'M') {
                fila += ' M ';
            } else {
                fila += ' . ';
            }
        }
        console.log(fila);
    }
}
   
mostrarTablero(tablero);

//Jugar()
function jugar(tablero) {
    let juegoTerminado = false;  
    while (!juegoTerminado) {
        let fila = parseInt(prompt("Introduce la fila que quieres descubrir (0 a " + (filas - 1) + "):"));
        let columna = parseInt(prompt("Introduce la columna que quieres descubrir (0 a " + (columnas - 1) + "):"));
        
        if (fila < 0 || fila >= filas || columna < 0 || columna >= columnas) {
            alert("Coordenadas fuera de rango. Inténtalo de nuevo.");
            continue;
        }
        
        if (tablero[fila][columna] === 'M') {
            alert("¡Has perdido! Has descubierto una mina.");
            juegoTerminado = true;
        } else {
            alert("¡Casilla segura! Continúa jugando.");
        }
    }
}