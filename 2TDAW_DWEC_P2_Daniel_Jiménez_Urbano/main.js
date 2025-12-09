
const modo = {
    facil: { 
        porcentaje: 0.10 },
    medio: { 
        porcentaje: 0.18 },
    dificil: { 
        porcentaje: 0.30 }
};


let filas = 0;
let columnas = 0;
let totalMinas = 0;
let tableroLogico = [];
let juegoTerminado = false;
let celdasDescubiertas = 0;


function iniciarJuego(dificultad) {
    let inputFilas = prompt("Introduce el número de filas del tablero (ej. 10):");
    filas = parseInt(inputFilas);
    
    if (isNaN(filas) || filas > 30 || filas < 2) {
        alert("Número de filas no válido. Se usará 8 por defecto.");
        filas = 8;
    }
    let inputCols = prompt("Introduce el número de columnas del tablero (ej. 10):");
    columnas = parseInt(inputCols);
    if (isNaN(columnas) || columnas > 30 || columnas < 2) {
        alert("Número de columnas no válido. Se usará 8 por defecto.");
        columnas = 8;
    }

    const porcentaje = modo[dificultad].porcentaje;
    totalMinas = Math.floor(filas * columnas * porcentaje);
    if (totalMinas < 1) totalMinas = 1;

    juegoTerminado = false;
    celdasDescubiertas = 0;
    document.getElementById('mensaje-estado').textContent = "";

    
    generarTableroLogico();
    renderizarTableroDOM();
}

function generarTableroLogico() {
    tableroLogico = [];
      
    for (let i = 0; i < filas; i++) {
        tableroLogico[i] = new Array(columnas).fill(0);
    }

    let minasColocadas = 0;
    while (minasColocadas < totalMinas) {
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columnas);
        if (tableroLogico[f][c] !== 'M') {
            tableroLogico[f][c] = 'M';
            minasColocadas++;
        }
    }

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (tableroLogico[i][j] === 'M') continue;
            
            let contador = 0;
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    let nf = i + x;
                    let nc = j + y;
                    if (nf >= 0 && nf < filas && nc >= 0 && nc < columnas) {
                        if (tableroLogico[nf][nc] === 'M') contador++;
                    }
                }
            }
            tableroLogico[i][j] = contador;
        }
    }
}

function renderizarTableroDOM() {
    const contenedor = document.getElementById('tablero');
    contenedor.innerHTML = ''; 

    contenedor.style.gridTemplateColumns = `repeat(${columnas}, 35px)`;

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const celda = document.createElement('div');
            celda.classList.add('casilla');
            celda.id = `celda-${i}-${j}`; 
         
            celda.addEventListener('click', () => clickIzquierdo(i, j));

            celda.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                clickDerecho(i, j);
            });
            celda.addEventListener('dblclick', () => dobleClic(i, j));

            contenedor.appendChild(celda);
        }
    }
}

function clickIzquierdo(f, c) {
    if (juegoTerminado) return;
    const celdaDOM = document.getElementById(`celda-${f}-${c}`);

    if (celdaDOM.classList.contains('bandera') || celdaDOM.classList.contains('descubierta')) return;

    const valor = tableroLogico[f][c];

    if (valor === 'M') {
        celdaDOM.classList.add('mina'); 
        gameOver(false);
    } else if (valor === 0) {
        revelarRecursivo(f, c);
        verificarVictoria();
    } else {

        celdaDOM.classList.add('descubierta');
        celdaDOM.classList.add(`num-${valor}`); 
        celdaDOM.textContent = valor;
        celdasDescubiertas++;
        verificarVictoria();
    }
}

function revelarRecursivo(f, c) {
    if (f < 0 || f >= filas || c < 0 || c >= columnas) return;
    
    const celdaDOM = document.getElementById(`celda-${f}-${c}`);
    if (celdaDOM.classList.contains('descubierta') || celdaDOM.classList.contains('bandera')) return;

    celdaDOM.classList.add('descubierta');
    celdasDescubiertas++;
    
    const valor = tableroLogico[f][c];

    if (valor > 0) {
        celdaDOM.textContent = valor;
        celdaDOM.classList.add(`num-${valor}`);
    } else {
    
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                revelarRecursivo(f + x, c + y);
            }
        }
    }
}

function clickDerecho(f, c) {
    if (juegoTerminado) return;
    const celdaDOM = document.getElementById(`celda-${f}-${c}`);
    
    if (!celdaDOM.classList.contains('descubierta') && !celdaDOM.classList.contains('bandera')) {
        celdaDOM.classList.add('bandera');
    }
}

function dobleClic(f, c) {
    if (juegoTerminado) return;
    const celdaDOM = document.getElementById(`celda-${f}-${c}`);
    
    if (celdaDOM.classList.contains('bandera')) {
        celdaDOM.classList.remove('bandera');
    }
}

function verificarVictoria() {
    const casillasSeguras = (filas * columnas) - totalMinas;
    if (celdasDescubiertas === casillasSeguras) {
        gameOver(true);
    }
}

function gameOver(victoria) {
    juegoTerminado = true;
    const mensaje = document.getElementById('mensaje-estado');

    if (victoria) {
        mensaje.textContent = "¡VICTORIA!";
        mensaje.style.color = "green";
    } else {
        mensaje.textContent = "¡BOOM! HAS PERDIDO.";
        mensaje.style.color = "red";
        
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                if (tableroLogico[i][j] === 'M') {
                    const celda = document.getElementById(`celda-${i}-${j}`);
                    celda.classList.add('mina');
                }
            }
        }
    }
}
