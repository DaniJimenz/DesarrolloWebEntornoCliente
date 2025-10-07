function ejercicio2(){
    let num = prompt("Dime el número de Kilómetros que corres al día");
    if(num<0 || isNaN(num)){
        alert("Número no válido")
    }else if(num>=0 && num <=10){
        alert ("Eres un corredor Novato");
    }else if(num>=10 && num <=30){
            alert("Eres un corredor Iniciado");
    }else if(num>30 && num <=40){
            alert("Eres un corredor Experto");
    }else if(num>40)
            alert("Eres un corredor de Élite");
    }

