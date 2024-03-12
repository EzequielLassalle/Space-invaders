let pantalla;
let pantallaAncho = 1300;
let pantallaAlto = 650;

let nave1;
let nave2;
let imagenNave;


let enemigos = [];
let numeroEnemigos = 0;
let columnasEnemigos = 2;
let filasEnemigos = 15;


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

    enemigoImagen = new Image();
    enemigoImagen.src = "./alien1.png";
    crearEnemigos();
    
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


    for(let i = 0;i<numeroEnemigos;i++){
        let enemigoDibujo = enemigos[i];
        if(enemigoDibujo.vivo){
            
            canvas.drawImage(enemigoDibujo.imagen,enemigoDibujo.posicionX,enemigoDibujo.posicionY,enemigoDibujo.ancho,enemigoDibujo.alto);
        }
    }

    
    moverEnemigos();
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

function moverEnemigos(){

        for(let i = 0;i < numeroEnemigos; i++){
            enemigoAMover = enemigos[i]

            if(enemigoAMover.posicionX + enemigoAMover.ancho > pantallaAncho || enemigoAMover.posicionX < 0){
                
                enemigoAMover.velocidadX = enemigoAMover.velocidadX * -1;
                enemigoAMover.posicionY += enemigoAMover.alto *2 + 15;
                
            }

            enemigoAMover.posicionX += enemigoAMover.velocidadX;
            ///enemigoAMover.posicionY +=  enemigoAMover.velocidadY;

        }


}

function verificarBordeIzquierda(nave){

    return(nave.posicionX > 0)
    


}

function verificarBordeDerecha(nave){

    return(nave.posicionX + nave.ancho < pantallaAncho)
}

function crearEnemigos(){

    for(let i = 0;i<filasEnemigos;i++){
        for(let j = 0;j<columnasEnemigos;j++){
            let enemigo = {
                imagen: enemigoImagen,
                posicionX: pantallaAncho / 2 + i*60 - 450,
                posicionY: 50 + j * 60 ,
                ancho: 50 ,
                alto: 50,
                vivo: true,
                velocidadX: 1,
                velocidadY: 1/4


            }

            enemigos.push(enemigo);
            numeroEnemigos++;
            

        }

    }

}

