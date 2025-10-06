
function ejercicio1() {
    let num = prompt("Introduce un número entero positivo mayor que 0");
    if(num > 0){
        let listaDivisores = divisores(num); 
        alert("Los divisores de " + num + " son " + listaDivisores);
        let sumaCuadrados = 0;
        for(let i = 0; i < listaDivisores.length; i++){
            sumaCuadrados += listaDivisores[i] * listaDivisores[i];
        }
        alert("La suma de los cuadrados de los divisores es " + sumaCuadrados);
        let cuadrado = Math.sqrt(sumaCuadrados);
        if(cuadrado === Math.floor(cuadrado)){
        alert("La suma es un cuadrado")
        }else{
        alert("No es un cuadrado");
        }
    }else{
        alert("Número no válido, este debe de ser mayor a 0")
    }
}
function divisores(num){
    let resultado = [];
    for(i=1; i <= num; i++){
        if (num%i === 0){
        resultado.push(i);
        }
    }
    return resultado;
}











