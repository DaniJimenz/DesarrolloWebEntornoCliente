function ejercicio4(){
    let num = parseInt(prompt( "Cual es el número de franjas de la bandera "))

    while(num >= 0 && num >= 5){
        alert = ("Número no válido")
    }

    let colores = ["pink", "black" , "yellow", "green", "blue", "red", "white", "brown"];
    
    colores[Math.floor(Math.random() * colores.length)];

    document.writeln("<table border='1'><tr>");
}