// --- 1. VARIABLES GLOBALES (IMPORTANTE: Definirlas aquí fuera) ---
const modo = {
    facil: { porcentaje: 0.10 },
    medio: { porcentaje: 0.18 },
    dificil: { porcentaje: 0.30 }
};

// Estas variables deben ser accesibles por TODAS las funciones
let filas = 0;
let columnas = 0;
let totalMinas = 0;
let tableroLogico = [];
let juegoTerminado = false;
let celdasDescubiertas = 0;

// --- 2. FUNCIÓN DE INICIO ---
function iniciarJuego(dificultad) {
    // AQUI EL CAMBIO: No usamos 'let', usamos las variables globales de arriba
    
    let inputFilas = prompt("Introduce el número de filas del tablero (ej. 10):");
    filas = parseInt(inputFilas);
    
    // Validación de filas
    if (isNaN(filas) || filas > 30 || filas < 2) {
        alert("Número de filas no válido. Se usará 8 por defecto.");
        filas = 8;
    }

    let inputCols = prompt("Introduce el número de columnas del tablero (ej. 10):");
    columnas = parseInt(inputCols);

    // Validación de columnas
    if (isNaN(columnas) || columnas > 30 || columnas < 2) {
        alert("Número de columnas no válido. Se usará 8 por defecto.");
        columnas = 8;
    }

    // Calcular minas dependiendo de la dificultad
    const porcentaje = modo[dificultad].porcentaje;
    totalMinas = Math.floor(filas * columnas * porcentaje);
    
    // Aseguramos que haya al menos 1 mina
    if (totalMinas < 1) totalMinas = 1;

    // Resetear estado
    juegoTerminado = false;
    celdasDescubiertas = 0;
    document.getElementById('mensaje-estado').textContent = "";

    // Generar lógica y visual
    generarTableroLogico();
    renderizarTableroDOM();
}

// --- 3. GENERAR LÓGICA ---
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

    // Calcular Números
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

// --- 4. RENDERIZAR DOM ---
function renderizarTableroDOM() {
    const contenedor = document.getElementById('tablero');
    contenedor.innerHTML = ''; // Limpiar tablero anterior

    // Aplicar rejilla CSS dinámica
    contenedor.style.gridTemplateColumns = `repeat(${columnas}, 35px)`;

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const celda = document.createElement('div');
            celda.classList.add('casilla');
            celda.id = `celda-${i}-${j}`; // ID único

            // --- EVENTOS DEL RATÓN ---
            
            // Clic Izquierdo (Descubrir)
            celda.addEventListener('click', () => clickIzquierdo(i, j));

            // Clic Derecho (Bandera)
            celda.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                clickDerecho(i, j);
            });

            // Doble Clic (Quitar Bandera)
            celda.addEventListener('dblclick', () => dobleClic(i, j));

            contenedor.appendChild(celda);
        }
    }
}

// --- 5. LÓGICA DE INTERACCIÓN ---

function clickIzquierdo(f, c) {
    if (juegoTerminado) return;
    const celdaDOM = document.getElementById(`celda-${f}-${c}`);

    // Si tiene bandera o ya está vista, no hacer nada
    if (celdaDOM.classList.contains('bandera') || celdaDOM.classList.contains('descubierta')) return;

    const valor = tableroLogico[f][c];

    if (valor === 'M') {
        // EXPLOSIÓN
        celdaDOM.classList.add('mina'); 
        gameOver(false);
    } else if (valor === 0) {
        // RECURSIVIDAD
        revelarRecursivo(f, c);
        verificarVictoria();
    } else {
        // NÚMERO
        celdaDOM.classList.add('descubierta');
        celdaDOM.classList.add(`num-${valor}`); // Colores del CSS
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
        // Si es 0, expandimos
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

// --- 6. FIN DEL JUEGO ---

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
        mensaje.textContent = "¡VICTORIA ABSURDA CONSEGUIDA!";
        mensaje.style.color = "green";
    } else {
        mensaje.textContent = "¡BOOM! HAS PERDIDO.";
        mensaje.style.color = "red";
        
        // Revelar todas las minas
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
/*
const modo = {
    facil:{porcentaje:0.10},
    medio:{porcentaje:0.18},
    dificil:{porcentaje:0.30}
}

function iniciarJuego(dificultad) {
    // Pedir al usuario el tamaño del tablero
    let filas = 0;
    let columnas = 0;

    filas =  parseInt(prompt("Introduce el número de filas del tablero"));
    if( filas > 30 || filas < 2 ){
        alert("Número de filas no válido");
    }
    columnas = parseInt(prompt("Introduce el número de columnas del tablero"));
    if( columnas > 30 || columnas < 2 ){
        alert("Número de columnas no válido");
    }

    //Calcular minas dependiendo de la dificultad
    const porcentaje = modo[dificultad].porcentaje;
    totalMinas = Math.floor(filas*columnas*porcentaje);

    juegoTerminado = false;
    celdasDescubiertas = 0;
    document.getElementById('mensaje-estado').textContent = "";

    generarTableroLogico();
    renderizarTableroDOM();
}
function generarTableroLogico(){
    tableroLogico=[];
      
    for(let i=0; i<filas; i++){
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

    // Calcular Números
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
    contenedor.innerHTML = ''; // Limpiar tablero anterior

    // Aplicar rejilla CSS dinámica
    contenedor.style.gridTemplateColumns = `repeat(${columnas}, 35px)`;

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const celda = document.createElement('div');
            celda.classList.add('casilla');
            celda.id = `celda-${i}-${j}`; // ID único

            // --- EVENTOS DEL RATÓN ---
            
            // Clic Izquierdo (Descubrir)
            celda.addEventListener('click', () => clickIzquierdo(i, j));

            // Clic Derecho (Bandera)
            celda.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                clickDerecho(i, j);
            });

            // Doble Clic (Quitar Bandera)
            celda.addEventListener('dblclick', () => dobleClic(i, j));

            contenedor.appendChild(celda);
        }
    }
}

// --- 5. LÓGICA DE INTERACCIÓN ---

function clickIzquierdo(f, c) {
    if (juegoTerminado) return;
    const celdaDOM = document.getElementById(`celda-${f}-${c}`);

    // Si tiene bandera o ya está vista, no hacer nada
    if (celdaDOM.classList.contains('bandera') || celdaDOM.classList.contains('descubierta')) return;

    const valor = tableroLogico[f][c];

    if (valor === 'M') {
        // EXPLOSIÓN: Aquí se activa tu CSS de la chica torpedo
        celdaDOM.classList.add('mina'); 
        gameOver(false);
    } else if (valor === 0) {
        // RECURSIVIDAD
        revelarRecursivo(f, c);
        verificarVictoria();
    } else {
        // NÚMERO
        celdaDOM.classList.add('descubierta');
        celdaDOM.classList.add(`num-${valor}`); // Colores del CSS
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
        // Si es 0, expandimos
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

// --- 6. FIN DEL JUEGO ---

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
        mensaje.textContent = "¡VICTORIA ABSURDA CONSEGUIDA!";
        mensaje.style.color = "green";
    } else {
        mensaje.textContent = "¡BOOM! HAS PERDIDO.";
        mensaje.style.color = "red";
        
        // Revelar todas las minas para ver a la chica torpedo
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

*/


    /*
    let tablero = new Array(filas);
        for(let i = 0; i < filas; i++){
            tablero[i] = new Array(columnas);
        }

        //ColocarMinas (Tablero, Cantidad de Minas)

        let minas = 0;
        while(minas < totalMinasMinas){
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
*/