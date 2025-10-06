function ejercicio6() {
    let array1 = [1, 2, 3, 3];
    let array2 = [3, 2, 1, 4, 5];
    let resultado = [];
    for(let i = 0; i < array1.length; i++){
        resultado.push(array1[i]);
    }
    for(let i = 0; i < array2.length; i++){
        resultado.push(array2[i]);
    }
    
    let elementos = [];

    for(let i = 0; i < resultado.length; i++){
        let elemento = resultado[i];
        let contador = 0;

        for(let j = 0; j < resultado.length; j++){
            if(resultado[j] === elemento){

            }
        }
        if( contador === 1){
            let listo = false;
            for(let k = 0; k < elementos.length; k++){
                if(elementos[k] === elemento){
                    listo = true;
                    break;
                }
            }
            if(!existe){
                elementos.push(elemento);
            }
        }
    }
    document.writeln("(Array 1) ", array1);
    document.writeln("(Array 2) ", array2);
    document.writeln("(Resultado) ", resultado);
}

  