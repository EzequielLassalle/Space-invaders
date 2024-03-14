let pantalla;
let pantallaAncho = 1300;
let pantallaAlto = 650;

let nave1;
let nave2;
let imagenNave;


let enemigos = [];
let numeroEnemigos = 0;
let columnasEnemigos = 2;
let filasEnemigos = 2;

let nivel = 0;

let balas1 = [];
let balas2 = [];



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

    enemigoImagen2 = new Image();
    enemigoImagen2.src = "./alien2.png";

    enemigoImagen3 = new Image();
    enemigoImagen3.src = "./alien3.png";

    enemigoImagen5 = new Image();
    enemigoImagen5.src = "./alien5.png";

    enemigoImagen6 = new Image();
    enemigoImagen6.src = "./alien6.png";

    enemigoImagen7 = new Image();
    enemigoImagen7.src = "./alien7.png";
    
    requestAnimationFrame(actualizar);
    document.addEventListener("keyup",moverNave);
    document.addEventListener("keyup",disparar);

    
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




    for(let i = 0;i<enemigos.length;i++){
        let enemigoDibujo = enemigos[i];
        if(enemigoDibujo.vivo){
            
            canvas.drawImage(enemigoDibujo.imagen,enemigoDibujo.posicionX,enemigoDibujo.posicionY,enemigoDibujo.ancho,enemigoDibujo.alto);
        }
    }

   

   for(let i = 0;i<balas2.length;i++){
        let balaD = balas2[i];
        balaD.posicionY += balaD.velocidad;
        canvas.fillStyle = "red"
        canvas.fillRect(balaD.posicionX,balaD.posicionY,balaD.ancho,balaD.alto);

        verificarAtaque(balaD)

    }

    for(let i = 0;i<balas1.length;i++){
        let balaA = balas1[i];
        balaA.posicionY += balaA.velocidad;
        canvas.fillStyle = "blue"
        canvas.fillRect(balaA.posicionX,balaA.posicionY,balaA.ancho,balaA.alto);

        verificarAtaque(balaA)
        

    }

    while(balas1.length > 0 && (balas1[0].usada || balas1[0].posicionY < 0)){
        balas1.shift();
    }

    while(balas2.length > 0 && (balas2[0].usada || balas2[0].posicionY < 0)){
        balas2.shift();
    }

    
    moverEnemigos();
    actualizarNivel();
    requestAnimationFrame(actualizar);

}

function actualizarNivel(){

    if(numeroEnemigos == 0){
        nivel = nivel +1;
        seleccionarNivel(nivel)
    
    }

}

function seleccionarNivel(nivel){

    switch(nivel){
        case 1:
            filasEnemigos = filasEnemigos + 3;
            columnasEnemigos = columnasEnemigos + 1;
            crearEnemigos()
        case 2:
            filasEnemigos = filasEnemigos + 3;
            columnasEnemigos = columnasEnemigos + 1;
            crearEnemigos()

        case 3:

        case 4:

        case 5:

        case 6:


        case 7:

        case 8:

        case 9:


        case 10:



    }



}


function verificarAtaque(bala){

    for(let j = 0;j<numeroEnemigos;j++){
        let enemigoS = enemigos[j]
        
        if(detectarColisiones(bala,enemigoS) && enemigoS.vivo && !bala.usada){
            bala.usada = true;
            enemigoS.vivo = false;
            numeroEnemigos--;

            enemigos.splice(j, 1);
            
           
            j--;
            
            
        }


}

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

    let enemigoAMover;

        for(let i = 0;i < numeroEnemigos; i++){
            enemigoAMover = enemigos[i]

            if(enemigoAMover.posicionX + enemigoAMover.ancho > pantallaAncho || enemigoAMover.posicionX < 0){

                for(let j = 0; j < numeroEnemigos;j++){
                    enemigoACambiar = enemigos[j]
                    enemigoACambiar.velocidadX = enemigoACambiar.velocidadX * -1;
                    enemigoACambiar.posicionY += enemigoAMover.alto;
                    enemigoACambiar.posicionX += enemigoACambiar.velocidadX;

                }

                return;
            }

            enemigoAMover.posicionX += enemigoAMover.velocidadX;
            

        }


}

function verificarBordeIzquierda(nave){

    return(nave.posicionX > 0)
    


}

function verificarBordeDerecha(nave){

    return(nave.posicionX + nave.ancho < pantallaAncho)
}

function disparar(evento){

    if(evento.code == "Space"){
        let bala = {
            posicionX: nave2.posicionX + nave2.ancho/2 - 15,
            posicionY: nave2.posicionY + 10,
            ancho: 3,
            alto: 20,
            usada: false,
            velocidad: -4

        }
        balas2.push(bala);
    }

    if(evento.code == "ShiftRight"){
        let bala = {
            posicionX: nave1.posicionX + nave1.ancho/2 - 15,
            posicionY: nave1.posicionY + 10,
            ancho: 3,
            alto: 20,
            usada: false,
            velocidad: -4

        }
        balas1.push(bala);
    } 



}

function crearEnemigos(){

    for(let i = 0;i<filasEnemigos;i++){
        for(let j = 0;j<columnasEnemigos;j++){
            let enemigo = {
                imagen: enemigoImagen,
                posicionX: pantallaAncho / 2 + i*75 - 450,
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

function detectarColisiones(bloqueA,bloqueB){

    let colisiones = 0;

    if(bloqueA.posicionX < bloqueB.posicionX + bloqueB.ancho){
        colisiones++;
    }

    if(bloqueA.posicionX + bloqueA.ancho > bloqueB.posicionX){
        colisiones++;
    }

    if(bloqueA.posicionY + bloqueA.alto > bloqueB.posicionY){
        colisiones++;
    }

    if(bloqueA.posicionY < bloqueB.posicionY + bloqueB.alto){
        colisiones++;
    }

    if(colisiones == 4){
        return true;
    }

    return false;

}

