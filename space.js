let pantalla;
let pantallaAncho = 1300;
let pantallaAlto = 650;

let nave1;
let nave2;
let imagenNave;

window.onload = function(){
    pantalla = document.getElementById("pantalla");
    pantalla.width= pantallaAncho;
    pantalla.height= pantallaAlto;
    canvas = pantalla.getContext("2d")

    crearNaves();
    imagenNave1 = new Image();
    imagenNave1.src = "./ship.png";
    imagenNave1.onload = function(){
        canvas.drawImage(imagenNave1,nave1.posicionX,nave1.posicionY,nave1.ancho,nave1.alto);

    }

    imagenNave2 = new Image();
    imagenNave2.src = "./ship2.png";
    imagenNave2.onload = function(){
        canvas.drawImage(imagenNave2,nave2.posicionX,nave2.posicionY,nave2.ancho,nave2.alto);

    }
    
    requestAnimationFrame(actualizar);
    document.addEventListener("keyup",moverNave);
    


}

function crearNaves(){
    
    nave1 = {
        ancho: 70 ,
        alto: 50 ,
        posicionX: pantallaAncho/2 + pantallaAncho/4 ,
        posicionY: 600,
        velocidad: 20

    }

    nave2 = {
        ancho: 70 ,
        alto: 50 ,
        posicionX:pantallaAncho/4 ,
        posicionY: 600,
        velocidad: 20

    }


}

function actualizar(){

    canvas.clearRect(0,0,pantallaAncho,pantallaAlto);


    canvas.drawImage(imagenNave1,nave1.posicionX,nave1.posicionY,nave1.ancho,nave1.alto);
    canvas.drawImage(imagenNave2,nave2.posicionX,nave2.posicionY,nave2.ancho,nave2.alto);


    requestAnimationFrame(actualizar);

}

function moverNave(event){


        if(event.code == "ArrowLeft" && verificarBordeIzquierda(nave1)){
            nave1.posicionX -= nave1.velocidad;

        }
        else if(event.code == "ArrowRight" && verificarBordeDerecha(nave1)){
            nave1.posicionX += nave1.velocidad;
        }




        if(event.code == "KeyW" && verificarBordeIzquierda(nave2)){
            nave2.posicionX -= nave2.velocidad;
        }
        else if(event.code == "KeyE" && verificarBordeDerecha(nave2)){
            nave2.posicionX += nave2.velocidad;
        }
    
}

function verificarBordeIzquierda(nave){

    return(nave.posicionX > 0)
    


}

function verificarBordeDerecha(nave){

    return(nave.posicionX + nave.ancho < pantallaAncho)
}

