function ejercicio5(){
    let colores = ["red", "yellow", "green", "white", "blue", "brown", "pink", "black"];
    let palabrasArray = [];
    for(let i = 0; i < 8; i++){
        let palabra = prompt("Introduce la palabra " + (i + 1) + " de 8:");
        palabrasArray.push(palabra);
    }

    document.writeln("(Array original) ");
    document.writeln(palabrasArray);

    let arrayFinal = [];
    for(let i = 0; i < palabrasArray.length; i++){
        if(colores.includes(palabrasArray[i])){
            arrayFinal.push(palabrasArray[i]);
        }
    }
    for(let i = 0; i < palabrasArray.length; i++){
        if(!colores.includes(palabrasArray[i])){
            arrayFinal.push(palabrasArray[i]);
        }
    }
    document.writeln("(Array Final) ");
    document.writeln(arrayFinal);
}

    
    
    
   