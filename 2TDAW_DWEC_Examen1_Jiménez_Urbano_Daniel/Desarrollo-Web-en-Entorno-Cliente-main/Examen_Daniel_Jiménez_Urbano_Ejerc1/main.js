//Ejercicio 1

function cifrado(mensaje){
    let invertir = "";
    let mensa = "" .mensaje;
    let longitud = mensaje.length;
    for(let i=0; i<longitud; i++){
        invertir += mensa.charAt(longitud-i-1);
    }
    return invertir;
}

let continua = true;
let conjuro, resultado, invertir, longitud, opciones;
console.log("!Bienvenido al cifrador del Grimorio Real!.\n ");
while(continua){
    console.log("Elige que es lo que quieres hacer.\n 1.Cifrar un conjuro (cifrar).\n 2.Descifrar un conjuro(descifrar).\n 3.Salir del programa");
    let opciones = parseInt(prompt("Elige que es lo que quieres hacer (1,2,3)"));
    while(isNaN(opciones) || opciones > 3 || opciones < 1){
    opciones = parseInt (prompt("No es válido, Introduce un valor correcto (1,2,3)"));
    }

console.log(opciones);

switch(opciones){
    case 1:
        conjuro = (prompt("Introduce un conjuro")).toLowerCase();
        while(conjuro == undefined){
            opciones = prompt("Has introducido mal el conjuro")
        }
        let resul = ((((conjuro.replaceAll('a', '+')).replaceAll('e','%')).replaceAll('i','&')).replaceAll('o','#')).replaceAll('u','@');
        
        let invertir = "";
        let longitud = conjuro.length;
        console.log(longitud);
        for(let i=0; i<longitud; i++){
            invertir = invertir.concat(resul.charAt(longitud-i-1));
        }
        resul = invertir;
        resul = resul.replaceAll('','_');
        console.log(resul);
    break;
    case 2:
        conjuro = (prompt("Descifrar el Conjuro")).toLowerCase();
        while(conjuro == undefined){
            opciones = prompt("Has introducido mal el conjuro")
        }
        resul = resul.replaceAll('','_');
        
        invertir = "";
        longitud = conjuro.length;
        console.log(longitud);
        for(let i=0; i<longitud; i++){
            invertir = invertir.concat(resul.charAt(longitud-i-1));
        }
        resul = invertir;
        resul = resul.replaceAll('','_');
        console.log(resul);
        
    break;
    case 3:
        continua = false;
    break;
    } 
}


