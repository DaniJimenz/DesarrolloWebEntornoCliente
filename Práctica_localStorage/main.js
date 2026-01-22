const botonA = document.getElementById('botonA');
const botonB = document.getElementById('botonB');
const columna = document.getElementById('columna');
const nombre = document.getElementById('nombre');
const limpiar = document.getElementById('limpiar');
const label = document.getElementById('label');
const labelLimite = document.getElementById('labelLimite');
const formulario = document.getElementById('formulario');
const limite = document.getElementById('limite');
const botonC = document.getElementById('botonC');
const tabla = document.getElementById('tabla'); 
const tarea = document.getElementById('tarea');
const nuevaTarea = document.getElementById('nuevaTarea'); 
let maxC = 0;
let contadorC = 1;
let contadorT = 1;

/* Ocultar sección nueva tarea principio*/

if (formulario.style.display !== 'none'){
    nuevaTarea.style.display = 'none';
}

/*Cargar contador de columnas desde localStorage si existe*/

if(localStorage.getItem('numecolum')){
    contadorC = JSON.parse(localStorage.getItem('numcolum'));
} else {
    localStorage.setItem('numecolum', JSON.stringify(contadorC));
}

/*Cargar contador tareas desde localstorage si existe*/ 

if (localStorage.getItem('numeTareas')){
    contadorT = JSON.parse(localStorage.getItem('numeTareas'));
} else {
    localStorage.setItem('numeTareas', JSON.stringify(contadorT))
}

/*Cragar máximo de columnas desde localstorage si existe*/



