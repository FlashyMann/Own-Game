var animal, animal_img
var hunter, hunter_img
var bullet
var bullet_img
var forest, forest_img
var leftGround
var rightGround
var heart1, heart2, heart3
var heart1Img, heart2Img, heart3Img;
var life = 3;
var gameOver,gameOver_img
var restart;
var PLAY,END
var gameState=PLAY



var score=0

function preload() {
  restartImage=loadImage("./assets/restart.png");
  gameOver_img=loadImage('./assets/gameOver.png');
  animal_img=loadImage("./assets/deer.png");
  bullet_img=loadImage("./assets/bullet.webp");
  hunter_img=loadImage('./assets/hunter.png');
  forest_img=loadImage("./assets/forest.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
}

function setup() {
  
createCanvas(windowWidth,windowHeight);

forest=createSprite(displayWidth/2-0,displayHeight/2-40,5,5)
forest.addImage(forest_img)
forest.scale=1.4999

gameOver=createSprite(800,350,5,5);
gameOver.addImage(gameOver_img);


restart=createSprite(800,400,4,4);
restart.addImage(restartImage)


restart.scale=0.5
gameOver.scale=0.5

heart1 = createSprite(125,40,20,20)
heart1.visible = false
heart1.addImage("heart1",heart1Img)
heart1.scale = 0.4

heart2 = createSprite(100,40,20,20)
heart2.visible = false
heart2.addImage("heart2",heart2Img)
heart2.scale = 0.4

heart3 = createSprite(150,40,20,20)
heart3.addImage("heart3",heart3Img)
heart3.visible = true
heart3.scale = 0.4




animal=createSprite(700,100,30,30);
animal.addImage(animal_img);
animal.scale=0.2
animal.setCollider("rectangle",0,0,500,500)
animal.collider.visible=true
animal.debug=true

hunter=createSprite(700,650,10,10);
hunter.addImage(hunter_img);
hunter.scale=0.8

bulletGroup = new Group()

leftGround=createSprite(1200,500,10,1000)
leftGround.visible=false

rightGround=createSprite(300,500,10,1000)
rightGround.visible=false

}

function draw() {

  background("white")


   if(gameState===PLAY){
    score = score + Math.round(frameCount/60);

    leftGround.velocityX=-0.09
    rightGround.velocityX=0.09
  
  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
    
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  if(animal.isTouching(bulletGroup)){
    life=life-1
    bullet.destroy();
    if(life<=0){
      gameState=END;
    }
  }

  spawnBullets();

  hunter.x=animal.x

    restart.visible=false
    gameOver.visible=false

  animal.bounce(leftGround)
  animal.bounce(rightGround)

  if(keyDown("LEFT_ARROW")){
    animal.x = animal.x-10
  }

  if(keyDown("RIGHT_ARROW")){
    animal.x = animal.x+10
  }

   

}
  
   if(gameState===END){
    if(life<=0){
  

      heart1.visible=false
      restart.visible=true
      gameOver.visible=true
      animal.visible=false;
      hunter.visible=false;
      bullet.destroy();
      score=score+Math.round(frameCount/-59.999);
    
  }
  
   }

   if(mousePressedOver(restart)){
    reset();
   }

   drawSprites()

textSize(20)
  fill("white")
text("Score = " + score,displayWidth-200,displayHeight/2-220)


  }






  function reset(){
    gameState=PLAY;
    life=3;
    gameOver.visible=false;
    restart.visible=false;
    animal.visible=true;
    hunter.visible=true;
    animal.position.x=700
    animal.velocityX=0
    leftGround.position.x=1200
    rightGround.position.x=300
    score=0
    bulletGroup.destroyEach();

    }

function spawnBullets(){
  if(frameCount%50===0){


    bullet = createSprite(hunter.x,600,40,40)

    bullet.addImage(bullet_img)
    bullet.scale = 0.02
    bullet.velocityY = -10 
    bullet.lifetime=100
 
    bulletGroup.add(bullet)
    }
}


