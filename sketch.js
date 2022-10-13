var score=0;
var gramaImg, grama;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var coelho, coelhoImg;
var invisibleBlockGroup, invisibleBlock;
var doorsCollection = 0;
var gameState = "play"


function preload(){
  gramaImg = loadImage("grama.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  coelhoImg = loadImage("coelho.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
 // spookySound.loop();
  grama = createSprite(300,300);
  grama.addImage("grama",gramaImg);
  grama.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  coelho = createSprite(200,200,50,50);
  coelho.scale = 0.3;
  coelho.addImage("coelho", coelhoImg);
  coelho.debug=false;
  coelho.setCollider("rectangle",0,0,300,500); 
}


function draw() {
  background(255);

 if(grama.y >400){ 
      grama.y = 300
    } 
  
  if (gameState === "play") {
    
    if(keyDown("left_arrow")){
        coelho.x = coelho.x - 3;

      // escreva o código para mover para a esquerda quando a tecla para a esquerda for pressionada
    }
    if(keyDown("right_arrow")){
  
          coelho.x = coelho.x + 3;

      // escreva o código para mover para a direita quando a tecla para a direita for pressionada
      
    }
    if(keyDown("space")){
  
        coelho.velocityY = -10;

      // escreva o código para mover para cima quando a tecla espaço for pressionada
      
    }
   
    coelho.velocityY = coelho.velocityY + 0.8;
  
   
      //escreva uma condição para a torre de rolagem infinita
    
      spawnDoors();

    if(doorsGroup.isTouching(coelho)){
       score+=50;
       doorsGroup.destroyEach();
    }
//escreva um código para fazer invisibleBlockGroup (grupo de bloco invisível) colidir com o fantasma, destruir o fantasma e mudar o estado do jogo para end.
     if(climbersGroup.isTouching(coelho)){
      coelho.velocityY = 0;
    }
     if(invisibleBlockGroup.isTouching(coelho) || coelho.y > 600){
      coelho.destroy();
      gameState = "end";
    }
    
 
  drawSprites();
  fill("black");
  text("cenouras: "+score,500,100);
}
    

  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnDoors()
 {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //adicione a função aleatória
    door.x = Math.round(random(120,400));
    door.addImage(doorImg);
    door.scale=0.2;
    climber.addImage(climberImg);
    climber.x = door.x; invisibleBlock.x = door.x;
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //mude a profundidade do fantasma e da porta
    
     
    coelho.depth = door.depth;
    coelho.depth +=1;
    
    //atribuir tempo de vida para a porta, escalador e bloco invisível

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    //adicione cada obstáculo ao grupo obstaclesGroup.add(obstacle); aqui os obstáculos são as portas, o escalador e o bloco invisível
    
    doorsGroup.add(door);
    invisibleBlock.debug = false;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

