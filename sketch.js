var boy;
var background;
var gameState;
var PLAY=1;
var gameState=PLAY;
var END=0;
var ground2Group;
var ground2;
var ground;
var score;
var ground3;
var obstacle, obstacleGroup;
var restart;

function preload(){
backgroundImage=loadImage("cartoon-background-007.jpg")
boyImage=loadImage("cartoon-background-0077.png")
groundImage=loadImage("ground-png-clip-art-image-gallery-yopriceville-high-quality-ground-png-9006_1511.jpg")
ground2Image=loadImage("211-2114421_computer-icons-rock-public-domain-flat-panel-display.png")
obstacleImage=loadImage("29-292438_transparent-pumpkin-vines-clipart-poison-ivy-plant-cartoon.png")
restartImage=loadImage("77707975-cartoon-image-of-restart-icon.jpg")
}




function setup() {
  createCanvas(800,400);

boy=createSprite(300,300,30,30)
boy.scale=0.1
boy.addImage("boy",boyImage)



ground=createSprite(100,200,8000,10)
ground.scale=0
ground.addImage("ground", groundImage)



ground3=createSprite(100,300,8000,10)

ground3.visible=false



restart=createSprite(100,80);
restart.addImage("restart",restartImage);
restart.scale=0.09;
restart.visible=false;


ground2Group = new Group();
obstacleGroup = new Group();
score=0
}

function draw() {
  background(backgroundImage);  
  stroke("white")
  fill("white")
  textSize(15)
  text("Score: " +score,700,20)
 
if(gameState===PLAY){

score = score + Math.round(getFrameRate()/60)

if(keyDown("space")&& boy.y >= 10){
  boy.velocityY=-22;

}

boy.velocityY=boy.velocityY + 1



boy.collide(ground3)
boy.collide(ground2Group)

if(obstacleGroup.isTouching(boy) || boy.x < 1){
  gameState=END
}



  spawnGround();
 
}
if(gameState===END){  
  restart.visible=true
ground3.velocityX=0
ground2Group.setVelocityXEach(0)
obstacleGroup.setVelocityXEach(0)
ground2Group.setLifetimeEach(-1)
obstacleGroup.setLifetimeEach(-1)

stroke("yellow")
fill("yellow")
textSize(30)
text("Game Over",400,100)



if(mousePressedOver(restart)) {
  reset();
}



}











  drawSprites();
 
}





function spawnGround(){
  if(frameCount%100 ===0){



var ground2=createSprite(800,200,800,20)
var obstacle=createSprite(800,150,40,40)
ground2.velocityX=-(6 + 3*score/100);
obstacle.velocityX=-(6 + 3*score/100);
obstacle.x=ground2.x+85;
ground2.y=Math.round(random(200,250))
obstacle.y=ground2.y-95;
obstacle.addImage("obstacle",obstacleImage)
ground2.scale=0.5
obstacle.scale=0.09
ground2.addImage("ground2",ground2Image)




ground2.lifetime = 200
obstacle.lifetime= 200



ground2.depth = boy.depth;
boy.depth = boy.depth + 1;

ground2Group.add(ground2);
obstacleGroup.add(obstacle)


  }


}

function reset(){
gameState = PLAY;

boy.y=20

restart.visible=false;
ground2Group.destroyEach();
obstacleGroup.destroyEach();


score=0


}




// hold space so you can jump better




