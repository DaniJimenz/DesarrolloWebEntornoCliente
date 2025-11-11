function heroes( nombre, clase, reino){
    this.nombre = nombre;
    this.clase = clase;
    this.reino = reino;
    this.misionesCompletadas = 0;
}


let salir = false;
opciones = ""; 
let hero3 = {
    nombre : "Felipe",
    clase: "mago",
    reino: "Andalucía",
    misionesCompletadas: 0
}
let hero4;

console.log("!Bienvenido a la Agencia de Aventuras del Reino!")
while(salir){
    console.log("¿Que quieres hacer?\n1.Introducir un nuevo héroe\n\t2.Mostrar los heroes registrados\n\t3.Buscar un héroe\t\n4.Añadir una misión cumplida a un héroe\n\t5. Saber quién es el mejor Héroe\n\t6.Salir del programa");
    opciones = parseInt(prompt("Elige una opción (1-6)"));
    while( opciones < 1 || opciones > 6 || isNaN(opciones)){
        opciones = parseInt("Valor Incorrecto");
    }
    switch(opciones){
        case 1:
            let n, c, r, m;
            n = prompt("Introduce el nombre del Héroe");
            while( n == undefined){
                n = prompt("No has introducido un nombre");
            }
            c = prompt("Introduce la clase del Héroe");
            while( c == undefined){
                c = prompt("No has introducido una clase");
            }
            r = prompt("Introduce el reino del Héroe");
            while( r == undefined){
                r = prompt("No has introducido un reino");
            }
            
            heroes.push(new heroes(nom,cla,rei));
        break;

        case 2:
            console.log("Heroes registrados")
            for(let i = 0; i<heroes.length; i++){
                console.log(heroes[i]);
        }
        break;
        case 3:
            let nom3 = prompt("Introduce el nombre del heroe que quieres buscar").toLowerCase();
            let find3 = false;
            let hero3;
            for(let i=0; heroes.length && !find3; i++){
                if(heroes[i].nombre.toLowerCase() == nom3){
                    find3 = true;
                    hero3 = heroes[i];
                }
            }
            console.log((find)`El nombre que buscas es ${hero3}`)
        break;
        case 4: 
        let nom4 = prompt("Introduce el nombre del Héroe al que sumarle la misión").toLowerCase;
        let find4 = false;
        for(let i=0; heroes.length && !find4; i++){
                if(heroes[i].nombre.toLowerCase() == nom4){
            }
            find4 = true;
            heroes.misionesCompletadas;
        }
        console.log((encontrado)`Se le ha sumado una misión al heroe de nombre ${hero4}`);
        break;
        case 5:
        
        break;
        case 6:
            salir = false;
        break;
    }
}