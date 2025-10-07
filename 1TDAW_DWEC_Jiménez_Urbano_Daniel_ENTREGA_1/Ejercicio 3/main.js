function ejercicio3(){
let num = prompt("Cual es el presupuesto total de la obra")
    if(num <= 0){
        document.writeln("<h1>Error. Presupuesto no válido</h1>")
    }else{ 
        let materiales = num*0.5;
        let mano = num*0.2;
        let licencias = num*0.3;
        document.writeln(
            `<ul>
            <li> Materiales 50% ${materiales}</li>
            <li> Mano de Obra 20% ${mano}</li>
            <li> Licencias 30% ${licencias}</li>
            </ul>`
        );
    }
}

