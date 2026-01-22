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






