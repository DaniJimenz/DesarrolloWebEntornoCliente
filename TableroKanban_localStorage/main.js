const botonA = document.getElementById('botonA');
const botonB = document.getElementById('botonB');
const botonC = document.getElementById('botonC');
const columnasInput = document.getElementById('columnas');
const nombre = document.getElementById('nombre');
const limpiar = document.getElementById('limpiar');
const limite = document.getElementById('limite');
const formulario = document.getElementById('formulario');
const tabla = document.getElementById('tabla'); 
const nuevaTarea = document.getElementById('nuevaTarea'); 
const inputTareaTxt = document.getElementById('tarea');
const divColumnaCampos = document.getElementById('columnaCampos');
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
        nuevaTarea.classList.remove('oculto');
        crearTablero();
    }
}

/*Configuro número de Columnas*/

botonA.onclick = function() {
    const num = parseInt(columnasInput.value); 
    if (isNaN(num) || num < 1 || num > 4) {
        alert("Introduce un número entre 1 y 4"); 
        return;
    }
    maxColum = num;
    divColumnaCampos.classList.remove('oculto'); 
    botonA.disabled = true;
    columnasInput.disabled = true;
};

/*Guardar en localStorage/ Se genera tablero*/

botonB.onclick = function() {
    localStorage.setItem('guardadoKanban', JSON.stringify(columnasConfig)); 
    formulario.classList.add('oculto');
    tabla.classList.remove('oculto'); 
    nuevaTarea.style.display = 'block'; 
    crearTablero();
};

/*Guardo Columna individual*/

botonC.onclick = function() {
    const nombreVal = nombre.value.trim();
    const limiteVal = parseInt(limite.value);

    if (nombreVal === "" || isNaN(limiteVal) || limiteVal < 1) {
        alert("Introduce un nombre y un límite válido");
        return;
    }

    columnasConfig.push({
        titulo: nombreVal,
        max: limiteVal,
        tareas: []
    });

    /*Limpio para la siguiente Columna*/
    nombre.value = "";
    limite.value = "";

    if (columnasConfig.length === maxColum) {
        divColumnaCampos.classList.add('oculto'); 
        botonB.classList.remove('oculto'); 
    } else {
        alert(`Columna ${columnasConfig.length} de ${maxColum} configurada. Haz la siguiente`);
    }
}

/*Crear Tablero*/

function crearTablero() {
    tabla.innerHTML = "";
    columnasConfig.forEach(function(columna, indiColumna) {
        const divColumna = document.createElement('div');
        divColumna.className = 'columna-kanban';
        divColumna.setAttribute('draggable', 'false');
    
    const tituloColumna = document.createElement('h3');
    tituloColumna.textContent = columna.titulo + ' (' + columna.tareas.length + '/' + columna.max + ')';
    divColumna.appendChild(tituloColumna);

    const listaTareas = document.createElement('ul');

    columna.tareas.forEach(function(tarea, indiTarea) {
        const itemTarea = document.createElement('li');
        itemTarea.textContent = tarea;
        itemTarea.className = 'tarea';
        itemTarea.draggable = true;

        /*Drag Drop*/
        
        itemTarea.ondragstart = function(event) {
            event.dataTransfer.setData('indiColumnaOrigen', indiColumna);
            event.dataTransfer.setData('indiTarea', indiTarea);
        };

        /*Doble click eliminar*/

        itemTarea.ondblclick = function(){
            if(confirm("¿Quieres eliminar esta tarea?")){
                eliminarTarea(indiColumna, indiTarea);
            }
        };

        listaTareas.appendChild(itemTarea);
    });

    /*Soltar Tarea*/

    listaTareas.ondragover = function(event) {
        event.preventDefault();
    }

    listaTareas.ondrop = function(event) {
        event.preventDefault();
        const indiColumnaOrigen = event.dataTransfer.getData('indiColumnaOrigen');
        const indiTarea = event.dataTransfer.getData('indiTarea');
        soltarTarea(parseInt(indiColumnaOrigen), parseInt(indiTarea), indiColumna);
    }

    divColumna.appendChild(listaTareas);

    /*Añadir Tarea*/

    const botonAñadir = document.createElement('button');
    botonAñadir.textContent = 'Añadir Tarea';
    botonAñadir.onclick = function() {
        agregarTarea(indiColumna);
    };
    divColumna.appendChild(botonAñadir);

    tabla.appendChild(divColumna);
    });
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
    if(texto === "") {
        alert("La tarea no puede estar vacía");
        return;
    }
    if(columnasConfig[indiColumna].tareas.length >= columnasConfig[indiColumna].max){
        alert("Has introducido un límite de tareas máximo en esta columna");
        return;
    }
    columnasConfig[indiColumna].tareas.push(texto);
    guardarActualizar();
    inputTareaTxt.value = "";
    }

    function eliminarTarea(indiColumna, indiTarea){
        columnasConfig[indiColumna].tareas.splice(indiTarea, 1);
        guardarActualizar();
    }

    function soltarTarea(indiColumnaOrigen, indiTarea, indiColumnaDestino){
        if(columnasConfig[indiColumnaDestino].tareas.length >= columnasConfig[indiColumnaDestino].max){
            alert("La columna a la que quieres moverla está llena");
            return;
        }

    const tareaMovida = columnasConfig[indiColumnaOrigen].tareas.splice(indiTarea, 1)[0];
    columnasConfig[indiColumnaDestino].tareas.push(tareaMovida);
    guardarActualizar();
}

/*Guardar y actualizar tablero*/

function guardarActualizar(){
    localStorage.setItem('guardadoKanban', JSON.stringify(columnasConfig));
    crearTablero();
}





