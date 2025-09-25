
function ejercicio1() {
    let num = prompt("Introduce un número entero positivo mayor que 0");
    if(num > 0){
        let listaDivisores = divisores(); 
        alert("Los divisores de " + num + " son " + divisores(num));
        let sumaCuadrados = (divisores());
        alert("La suma de los cuadrados de los divisores es " + sumaCuadrados) 
        let cuadrado = ;
        if(cuadrado){}
        alert("La suma es un cuadrado")
        }else{
        alert("No es un cuadrado");
        }
    }else{
        alert("Número no válido, este debe de ser mayor a 0")
    }

function divisores(num){
    let resultado = [];
    for(i=1; i <= num; i++){
        if (num%i === 0);
        resultado.push(i);
    }
    return resultado;
}










