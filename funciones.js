var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
    
var x=canvas.width/2;
var y=canvas.height-30;
    
var dx=2;
var dy=-2;
    
var radioBola=10;
    
var paletaHe=10;
var paletaWi=75;
var paletaX=(canvas.width-paletaWi)/2;
    
var btnRight=false;
var btnLeft=false;
    
var filasBloques=3;
var columnasBloques=5;
var bloquesWi=75;
var bloquesHe=20;
var bloquesPa=10;
var bloquesMTop=30;
var bloquesMLeft=30;
    
var score=0;
    
var vidas=3;
    
var bloques=[];
    
for(var c=0; c<columnasBloques; c++){
        
    bloques[c]=[];
        
    for(var r=0; r<filasBloques; r++){
            
        bloques[c][r]={x:0, y:0, status:1};
            
    }
        
}
    
function crear_bola(){
        
    ctx.beginPath();
    ctx.arc(x, y, radioBola, 0, Math.PI*2);
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
        
}
    
function crear_paleta(){
        
    ctx.beginPath();
    ctx.rect(paletaX, canvas.height-paletaHe, paletaWi, paletaHe);
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
        
}
    
function crear_bloques(){
        
    for(var c=0; c<columnasBloques; c++){
            
        for(var r=0; r<filasBloques; r++){
                
            if(bloques[c][r].status==1){
                
                var bloqueX=(c*(bloquesWi+bloquesPa))+bloquesMLeft;
                var bloqueY=(r*(bloquesHe+bloquesPa))+bloquesMTop;
                bloques[c][r].x=bloqueX;
                bloques[c][r].y=bloqueY;
                ctx.beginPath();
                ctx.rect(bloqueX, bloqueY, bloquesWi, bloquesHe);
                ctx.fillStyle="#0095DD";
                ctx.fill();
                ctx.closePath();
                
            }
                
        }
            
    }
        
}
    
function mostrar_score(){
        
    ctx.font="16px arial";
    ctx.fillStyle="#0095DD";
    ctx.fillText("Puntaje: "+score, 8, 20);
        
}
    
function mostrar_vida(){
        
    ctx.font="16px arial";
    ctx.fillStyle="#0095DD";
    ctx.fillText("Vidas: "+vidas, canvas.width-65, 20);
        
}
    
function dibujar() {
        
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    crear_bloques();
    crear_bola();
        
    if(y + dy < radioBola){
            
        dy = -dy;
            
    }
        
    else if(y + dy > canvas.height-radioBola){
            
        if(x > paletaX && x < paletaX + paletaWi){
                
            dy = -dy;
                
        }
            
        else{
            
            vidas--;
                
            if(vidas==0){
                    
                alert("Fin del juego");
                document.location.reload();
                    
            }
                
            x=canvas.width/2;
            y=canvas.height-30;
            dx=2;
            dy=-2;
            paletaX=(canvas.width-paletaWi)/2;
                
        }
            
    }
        
    if(x + dx < radioBola || x + dx > canvas.width-radioBola){
            
        dx = -dx;
            
    }
        
    if(btnLeft && paletaX > 0){
            
        paletaX-=7;
            
    }
        
    else if(btnRight && paletaX < canvas.width-paletaWi){
            
        paletaX+=7;
            
    }
        
    x+=dx;
    y+=dy;
        
    detectar_choque()
    crear_paleta();
    mostrar_score();
    mostrar_vida();
        
    requestAnimationFrame(dibujar);
        
}
    
document.addEventListener("keydown", tecla_hundida, false);
document.addEventListener("keyup", tecla_soltada, false);
document.addEventListener("mousemove", raton_movido, false);
    
function tecla_hundida(e){
        
    if(e.keyCode==39){
            
        btnRight=true;
            
    }
        
    else if(e.keyCode=37){
            
        btnLeft=true;
            
    }
        
}
    
function tecla_soltada(e){
        
    if(e.keyCode==39){
            
        btnRight=false;
            
    }
        
    else if(e.keyCode=37){
            
        btnLeft=false;
            
    }
        
}
    
function raton_movido(e){
        
    var punteroX=e.clientX-canvas.offsetLeft;
        
    if(punteroX>0 && punteroX<canvas.width){
            
        paletaX=punteroX-paletaWi/2;
            
    }
        
}
    
function detectar_choque(){
        
    for(var c=0; c<columnasBloques; c++){
            
        for(var r=0; r<filasBloques; r++){
                
            var b=bloques[c][r];
                
            if(b.status==1){
                    
                if(x>b.x && x<b.x+bloquesWi && y>b.y && y<b.y+bloquesHe){

                    dy=-dy;
                    b.status=0;
                    score++;
                        
                    if(score==columnasBloques*filasBloques){
                            
                        alert("Felicitaciones, Ganaste");
                        document.location.reload();
                            
                    }

                }
                    
            }
                
        }
            
    }
        
}
    
dibujar();