const botonA = document.getElementById('botonA');
const botonB = document.getElementById('botonB');
const botonC = document.getElementById('botonC');
const columnas = document.getElementById('columna');
const columna = document.getElementById('columna');
const nombre = document.getElementById('nombre');
const limpiar = document.getElementById('limpiar');
const label = document.getElementById('label');
const limite = document.getElementById('limite');
const formulario = document.getElementById('formulario');
const tabla = document.getElementById('tabla'); 
const nuevaTarea = document.getElementById('nuevaTarea'); 
const inputTareaTxt = document.getElementById('inputTareaTxt');
let maxColum = 0;
let columnasConfig = [];

/* Ocultar sección nueva tarea principio*/

if (formulario.style.display !== 'none'){
    nuevaTarea.style.display = 'none';
}

/*Persistencia de datos al cargar*/

window.onload = function(){
    const guardado = this.localStorage.getItem('guardadoKanban');
    if(guardado){
        columnasConfig = JSON.parse(guardado);
        formulario.classList.add('oculto');
        tabla.classList.remove('oculto');
        nuevaTarea.classList.remove('coulto');
        crearTablero();
    }
}

botonA.onclick = function() {
    const num = parseInt(columnasInput.value); 
    if (isNaN(num) || num < 1 || num > 4) {
        alert("Introduce un número entre 1 y 4"); 
        return;
    }
    maxColum = num;
    divColumnaCampos.classList.remove('oculto'); 
    botonA.disabled = true;
};

/*Guardar en localStorage*/

botonB.onclick = function() {
    localStorage.setItem('kanban_storage', JSON.stringify(columnasConfiguradas)); 
    location.reload(); 
};

botonC.onclick = function() {
    const nombreVal = nombre.value.trim();
    const limiteVal = parseInt(limite.value);

    if (nombreVal === "" || isNaN(limiteVal) || limiteVal < 1) {
        alert("Introduce un nombre y un límite válido");
        return;
    }

    columnasConfiguradas.push({
        titulo: nombreVal,
        max: limiteVal,
        tareas: []
    });

    /*Limpio para la siguiente Columna*/
    nombre.value = "";
    limite.value = "";

    if (columnasConfiguradas.length === maxColum) {
        divColumnaCampos.classList.add('oculto'); 
        botonB.disabled = false; 
    }
}

/*Crear Tablero*/

function crearTablero() {
    tabla.innerHTML = "";
    columnasConfig.forEach(function(columna, indiColumna) {
        const divColumna = document.createElement('div');
        divColumna.className = 'columnaKanban';
    });
    const tituloColumna = document.createElement('h3');
    tituloColumna.textContent = columna.titulo;
    divColumna.appendChild(tituloColumna);

    const listaTareas = document.createElement('ul');
    columna.tareas.forEach(function(tarea, indiTarea) {
        const itemTarea = document.createElement('li');
        itemTarea.textContent = tarea;
        listaTareas.appendChild(itemTarea);
    });
    divColumna.appendChild(listaTareas);
    tabla.appendChild(divColumna);
}

/*Reiniciar Tablero*/

limpiar.onclick = function() {
    if(confirm("¿Quieres reiniciar el tablero?")) {
        localStorage.removeItem('guardadoKanban'); 
        location.reload();
    }
}

/*Gestionar Tareas*/

function agregarTarea(indiColumna){
    const texto = inputTareaTxt.value.trim();
    if(texto === "") return alert("La tarea no puede estar vacía");
    if(columnasConfig[indiColumna].tareas.length >= columnasConfig[indiColumna].max){
        return alert("Has introducido un límite de tareas máximo en esta columna");
    }
    columnasConfig[indiColumna].tareas.push(texto);
    guardarActualizar();
    inputTareaTxt.value = "";
    }
    function elimarTarea(indiColumna, indiTarea){
        columnasConfig[indiColumna].tareas.splice(indiTarea, 1);
        guardarActualizar();
    }
    function soltarTarea(indiColumnaOrigen, indiTarea, indiColumnaDestino){
        const tarea = columnasConfig[indiColumnaOrigen].tareas[indiTarea];
        if(columnasConfig[indiColumnaDestino].tareas.length >= columnasConfig[indiColumnaDestino].max){
            return alert("La columna a la que quieres moverla está llena");
        }

    const tareaMovida = columnasConfig[indiColumnaOrigen].tareas.splice(indiTarea, 1)[0];
    columnasConfig[indiColumnaDestino].tareas.push(tareaMovida);
    guardarActualizar();
}





