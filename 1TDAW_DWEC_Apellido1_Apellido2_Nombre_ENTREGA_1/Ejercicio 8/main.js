function ejercicio8() {
    let numMesas = parseInt(prompt("¿Cuántas mesas tiene el restaurante?"));
    let mesas = [];
    for(let i = 0; i < numMesas; i++){
        mesas[i] = Math.floor(Math.random() * 5);
    }
    console.log("Estado inicial de las mesas " + mesas);
    let comensales = 0;
    while(comensales >= 0){
        comensales = parseInt(prompt("¿Cuántos comensales son?"));
        if(comensales < 0){
            break;
        }
        if(comensales > 4){
            alert("No admitimos grupos de " + comensales + ", 4 personas como máximo ");
            console.log("No admitimos grupos de " + comensales);
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
            console.log("Siéntese en la mesa " + (mesaEncontrada + 1));
            alert("Siéntese en la mesa " + (mesaEncontrada + 1));
        } else {
            console.log("No queda sitio en el restaurante");
            alert("No queda sitio en el restaurante");
        }
        console.log("Estado de las mesas: " + mesas);
    }
}