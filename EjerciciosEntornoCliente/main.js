'use strict';

console.log("Buenos días desde visual studio code")

//Number Variable
/*
let number = 5
console.log(typeof number)
number = "5"
console.log(typeof number)

//Undefined

let undefinedVariable;
console.log(typeof undefinedVariable)

let nullVariable = null;
console.log(typeof nullVariable)

//Conversion de tipos
//String a Number

var stringValue = "42";
var age = parseInt(stringValue);

//Tipo var global

variable = "Hola"
numberVariable = parseInt(variable);
console.log(numberVariable, typeof numberVariable)
*/

/*NaN significa not a number*/

let var1 = 23, var2 = 15, var3 = 3, var4 = 2, var5 = 10;
let resultado = var1 + (var2 * (var3/var4)) - var5;
console.log("El resultado es: " + resultado);

resultado += 5;
console.log("El resultado es: " + (resultado));

console.log("El resultado es:" + --resultado);

let ene = 1, feb = 2, mar = 3, abr = 4, may = 5, jun = 6, jul = 7, ago = 8, sep = 9, oct = 10, nov = 11, dic = 12;
console.log("El mes de enero es mayor que diciembre " + (ene > dic));
console.log("El mes de junio es menor que julio " + (jun < jul));
console.log("El mes de marzo es mayor que febrero y septiembre es mayor que octubre" + (mar > feb) && (sep > oct));
console.log("El mes de marzo es mayor que febrero o septiembre es mayor que octubre" + (mar > feb) || (sep > oct));

let m1 = 7, m2 = 13, m3 = 5;
let resul = (m1 + m2 + m3)/3;

console.log("La media aritmética de estos números es " + resul);

//Alerta//

/*
alert("Esto es una alerta");
let mensajeAlerta = "Esto es una alerta con variable";
alert(mensajeAlerta);

let mensajeAlerta = prompt("Escribe un mensaje de alerta");
alert(mensajeAlerta);
*/
let mensajeConfirmacion = confirm("¿Quieres continuar?");
console.log(mensajeConfirmacion);
/*
//Document.Write//

document.writeln("Hola esto es un document.write");
document.writeln("<h1>Hola esto es un document.write con h1</h1>");
*/

//Onclick y ommouser//

function button(){
    alert("Hola")
}

function imagen(){
    alert("Adios")
}

let nombreUsu = prompt("¿Cómo te llamas?");
alert("Bienvenido a mi página " + nombreUsu);

function comprar(){
    let producto = prompt("¿Qué producto quieres comprar?");
    let precio = prompt("¿Cuánto cuesta el producto?");
    let unidades = prompt("¿Cuántas unidades quieres?");
    let total = precio * unidades;
    alert("El total a pagar por " + unidades + " unidades de " + producto + " es de " + total + " euros.");         
    let confirmar = confirm("¿Quieres confirmar la compra?");
    if(confirmar){
        alert("Gracias por su compra " + nombreUsu);
    } else {
        alert("Compra cancelada");
    }
    document.writeln( "<h2>Resumen de la compra</h2>");
    document.writeln("El " + producto + " tiene un precio de " + precio + " y al llevarse " + unidades + " unidades, el total es de " + total + " euros.");
}   

