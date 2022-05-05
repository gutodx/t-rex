var trex, trex_correndo;
var chao, chao_imagem;
var chao2;
var nuvem, nuvem_imagem;
var cactoImg1, cactoImg2, cactoImg2, cactoImg3, cactoImg4, cactoImg5, cactoImg6;
var aleatorio;
var cacto;
var pontos = 0;
var JOGANDO = 1;
var MORREU = 0;
var estado;
var grupocactos;
var gruponuvens;
var gameOver;
var gameOverimg;
var restart;
var restartimg;
var trexmortoanimation;

estado = JOGANDO;


function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  chao_imagem = loadImage("ground2.png");
  nuvem_imagem = loadImage("cloud.png");
  cactoImg1 = loadImage("obstacle1.png");
  cactoImg2 = loadImage("obstacle2.png");
  cactoImg3 = loadImage("obstacle3.png");
  cactoImg4 = loadImage("obstacle4.png");
  cactoImg5 = loadImage("obstacle5.png");
  cactoImg6 = loadImage("obstacle6.png");
  gameOverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  trexmortoanimation = loadAnimation("trex_collided.png");
}

function setup() {
  createCanvas(600, 200);
  
  grupocactos = new Group();
  gruponuvens = new Group();

  //crie um sprite de trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("correndo", trex_correndo);
  trex.addAnimation("morto",trexmortoanimation);
  trex.depth = 2;
  trex.debug = true;
  trex.setCollider("circle",0,0,40);
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  
  //crie um sprite chao (solo)
  chao = createSprite(200,180,400,20);
  chao.addImage("chao que mexe", chao_imagem);
  chao.x = chao.width/2;
  chao.velocityX = -3;

  chao2 = createSprite(200, 193, 400, 10);
  chao2.shapeColor = "white";

  //chão fica invisível
  chao2.visible = false;
  
  restart = createSprite(300,140,50,50);
  restart.addImage(restartimg);
  restart.visible = false;
  restart.scale = 0.5

  gameOver = createSprite(300,100,50,50);
  gameOver.addImage(gameOverimg);
  gameOver.visible = false;
  gameOver.scale = 0.5
}

function draw() {

  
  aleatorio = Math.round(random(10,70));

  background("white");
  trex.collide(chao2);
  drawSprites(); 

  text("pontuação:"+pontos,450,30)

  if(estado==JOGANDO){
   in_Game();
   if(trex.isTouching(grupocactos)){
     estado=MORREU;
   }
   

  }
  if(estado==MORREU){
    Morte();

  }
  
}



function pular(){
  if(keyDown("space") && trex.isTouching(chao)) {
    trex.velocityY = -13;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
}

function corrige_chao(){
  if(chao.x<0){
    chao.x = chao.width/2;
  }
}

function corrige_chao2(){
  if(chao2.x<0){
    chao2.x = chao2.width/2;
  }
}

function criar_nuvens(){
  if(frameCount%120===0){
    nuvem = createSprite(650,aleatorio,10,10);
    nuvem.velocityX = -2;
    nuvem.addImage("passando",nuvem_imagem); 
    nuvem.scale = 1;
    nuvem.depth = 1;
    nuvem.lifetime = 400;
    gruponuvens.add(nuvem);
  }
}

function criar_cactos(){
  if(frameCount%160===0){
    cacto = createSprite(650,170,10,10);
    cacto.velocityX = -3;
    cacto.scale = 0.5;
    cacto.depth = 1;
    cacto.lifetime = 300;

    switch(Math.round(random(1,6))){
      case 1:
        cacto.addImage(cactoImg1);
        cacto.scale = 0.4 ;
        break;
      case 2:
        cacto.addImage(cactoImg2);
        cacto.scale = 0.5;
        break;
      case 3:
        cacto.addImage(cactoImg3);
        cacto.scale = 0.3;
        break;
      case 4:
        cacto.addImage(cactoImg4);
        cacto.scale = 0.5;
        break;
      case 5:
        cacto.addImage(cactoImg5);
        cacto.scale = 0.4;
        break;
      case 6:
        cacto.addImage(cactoImg6);
        cacto.scale = 0.5;
        break;

      default:
        break;
    }
    grupocactos.add(cacto);
  }
}

function in_Game(){

  corrige_chao();
  pular();
  criar_cactos();
  criar_nuvens();
  pontuacao();
}

function Morte(){
  chao.velocityX=0;
  gameOver.visible = true;
  restart.visible = true;
  grupocactos.setVelocityXEach(0);
  gruponuvens.setVelocityXEach(0);
  trex.velocityY=0;
  grupocactos.setLifetimeEach(-1);
  gruponuvens.setLifetimeEach(-1);
  trex.changeAnimation("morto",trexmortoanimation);
}

function pontuacao(){
  pontos=pontos+round(frameCount/60);


}

