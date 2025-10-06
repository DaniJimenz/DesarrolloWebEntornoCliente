function ejercicio6() {
    let array1 = [1, 2, 3, 3];
    let array2 = [3, 2, 1, 4, 5];
    let resultado = [];
    let todosElementos = array1.concat(array2);
    
    for(let i = 0; i < todosElementos.length; i++){
        let elemento = todosElementos[i];
        let contador = 0;
        for(let j = 0; j < todosElementos.length; j++){
            if(todosElementos[j] === elemento){
                contador++;
            }
        }
        if(contador === 1){
            let listo = false;
            for(let k = 0; k < resultado.length; k++){
                if(resultado[k] === elemento){
                    listo = true;
                    break;
                }
            }
            if(!listo){
                resultado.push(elemento);
            }
        }
    }
    console.log("Array 1:", array1);
    console.log("Array 2:", array2);
    console.log("Resultado:", resultado);
}