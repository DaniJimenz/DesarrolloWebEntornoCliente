
function ejercicio4(){
    let num = parseInt(prompt("¿Cuál es el número de franjas de la bandera? (entre 1 y 5)"));
    while(num < 1 || num > 5 || isNaN(num)){
        alert("Número no válido");
        num = parseInt(prompt("¿Cuál es el número de franjas de la bandera? (entre 1 y 5)"));
    }
    let colores = ["red", "yellow", "green", "white", "blue", "brown", "pink", "black"];
    let bandera = [];
    for(let i = 0; i < num; i++){
        let colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        bandera.push(colorAleatorio);
    }

    document.writeln("<table border='1'><tr>");
    for(let i = 0; i < bandera.length; i++){
        document.writeln("<td style='width:100px; height:100px; background-color:" + bandera[i] + "'></td>");
    }
    document.writeln("</tr></table>");
}