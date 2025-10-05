function ejercicio8() {
    let numMesas = parseInt(prompt("¿Cuántas mesas tiene el restaurante?"));
    let mesas = [];
    for(let i = 0; i < numMesas; i++){
        mesas[i] = Math.floor(Math.random() * 5);
    }
    console.log("Estado inicial de las mesas: " + mesas);
    let comensales = 0;
    while(comensales >= 0){
        comensales = parseInt(prompt("¿Cuántos comensales son? (número negativo para salir)"));
        if(comensales < 0){
            break;
        }
        if(comensales > 4){
            alert("Lo siento, no admitimos grupos de " + comensales + ", haga grupos de 4 personas como máximo e intente de nuevo");
            console.log("Lo siento, no admitimos grupos de " + comensales);
            continue;
        }
        let mesaEncontrada = -1;
        for(let i = 0; i < mesas.length; i++){
            if(mesas[i] === 0){
                mesaEncontrada = i;
                break;
            }
        }
        if(mesaEncontrada === -1){
            for(let i = 0; i < mesas.length; i++){
                if(mesas[i] + comensales <= 4){
                    mesaEncontrada = i;
                    break;
                }
            }
        }
        if(mesaEncontrada !== -1){
            mesas[mesaEncontrada] += comensales;
            console.log("Por favor, siéntese en la mesa " + (mesaEncontrada + 1));
            alert("Por favor, siéntese en la mesa " + (mesaEncontrada + 1));
        } else {
            console.log("Lo siento, no queda sitio en el restaurante");
            alert("Lo siento, no queda sitio en el restaurante");
        }
        console.log("Estado de las mesas: " + mesas);
    }
}