var ground;
var monkey , monkey_running;
var bananaImage, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var gameState;
var play=0;
var end=1;
var score=0;

function preload(){
   monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  monkey=createSprite(40,150,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  gameState=play;
  
  ground=createSprite(500,180,1000,10);
  foodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  background("white");
  
  if(gameState===play){
   if(keyDown("space")){
      monkey.y+=-10;
   } 
   if(foodGroup.isTouching(monkey)){
      score+=2;
     foodGroup.destroyEach();
   }
   if(obstacleGroup.isTouching(monkey)){
     gameState=end;
   }
  }
  food();   
  obstacle();
  monkey.velocityY+=0.5;
  monkey.collide(ground);
  
  if(gameState===end){
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.visible=true;
    foodGroup.visible=true;
  }
  
  drawSprites();
  text("score: "+score,500,50);
}          
function food(){
  if(frameCount % 150 === 0){
    var banana=createSprite(650,random(60,100),10,10);
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.scale=0.1;
    banana.lifetime=165;
    banana.setCollider("circle",0,0,200);
    
  }
}
function obstacle(){
  if(frameCount % 200 === 0 ){
    var obstacle=createSprite(650,150,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale=0.15;
    obstacle.lifetime=125;
    obstacle.setCollider("circle",0,0,250);
    
  } 
}




