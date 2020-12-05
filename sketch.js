var PLAY=1;
var END=0;
var gameState=PLAY;

var survivalTime=0;

var monkey, monkey_running;
var banana, bananaImage, obstacles, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);

  ground = createSprite(300, 400, 1200, 30);

  monkey = createSprite(40, 250, 10, 10);
  monkey.scale = 0.15
  monkey.addAnimation("run", monkey_running);
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  if (gameState==PLAY){
    background("white");
    drawSprites();

    ground.velocityX = -10;
    if (ground.x < -0) {
      ground.x = ground.width / 2;
    }

    fill("black");
    textSize(20);
    survivalTime=Math.ceil(frameCount/frameRate());
    text("Survival Time: "+survivalTime,20,20);
    
    physics();

    if (World.frameCount%80==0){
      spawnBanana();
    }

    if (World.frameCount%300==0){
      spawnObstacles();
    }
    if (monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
  }
}

function physics() {
  //Collide with Ground
  monkey.collide(ground);
  //Jump
  if (keyWentDown("space") && monkey.y > 250) {
    monkey.velocityY = -13;
  }
  //console.log(monkey.y);

  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
}

function spawnBanana(){
  banana=createSprite(600,200,20,20);
  banana.addAnimation("banana", bananaImage);
  banana.scale=0.1;
  banana.y=Math.round(random(120,200));
  banana.velocityX=-4;
  banana.lifetime=width/banana.velocityX;
  bananaGroup.add(banana);
}

function spawnObstacles(){
  obstacles=createSprite(600,200,20,20);
  obstacles.addAnimation("obstacles", obstaceImage);
  obstacles.scale=0.2; 
  obstacles.setCollider("circle",0,0,120);
  //obstacles.debug=true;
  obstacles.y=370;
  obstacles.velocityX=-4;
  obstacles.lifetime=width/obstacles.velocityX;
  obstacleGroup.add(obstacles);
}