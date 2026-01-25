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
}

/*Crear Tablero*/

function crearTablero() {
    
}






