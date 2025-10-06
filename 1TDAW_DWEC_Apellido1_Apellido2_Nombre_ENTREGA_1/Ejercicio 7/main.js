function ejercicio7() {
    let numeros = [];
    for(let i = 0; i < 10; i++){
        let num = parseFloat(prompt("Introduce el número " + (i + 1) + " de 10"));
        numeros.push(num);
    }
    document.writeln("Array original ");
    document.writeln = "Indices ";
    for(let i = 0; i < numeros.length; i++){
        document.writeln("[" + i + "] ");
    }
    document.writeln("Valores " + numeros );

    let inicial = parseInt(prompt("Introduce la posición inicial 0-9"));
    let final = parseInt(prompt("Introduce la posición final 0-9"));

    while(inicial < 0 || inicial > 9 || final < 0 || final > 9 || inicial >= final){
        alert("Error: inicial < final y ambos entre 0 y 9");
        inicial = parseInt(prompt("Introduce la posición inicial 0-9"));
        final = parseInt(prompt("Introduce la posición final 0-9"));
    }
    let elementoAMover = numeros[inicial];
    for(let i = inicial; i < final; i++){
        numeros[i] = numeros[i + 1];
    }
    numeros[final] = elementoAMover;
    document.writeln("Resultado ");
    document.writeln = "Indices ";
    for(let i = 0; i < numeros.length; i++){
        document.writeln = "[" + i + "] ";
    }
    document.writeln("Valores " + numeros);
}

