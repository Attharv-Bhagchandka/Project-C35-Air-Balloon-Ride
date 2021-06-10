var balloon,balloonImage1,balloonImage2;
var Database, Position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

function setup() {
  createCanvas(1200,600);

  balloon=createSprite(600,200,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  Database = firebase.database(); 
  var BalloonPos = Database.ref('Balloon/Position'); 
  BalloonPos.on("value",readPos,showError) 
}

function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePos(-5,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePos(5,0)
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePos(0,-5)
    balloon.scale = balloon.scale - 0.001;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePos(0,5)
    balloon.scale = balloon.scale + 0.001;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updatePos(x,y){ 
  Database.ref('Balloon/Position').set({ 
      'x': Position.x + x, 
             'y': Position.y + y 
  })
}
function readPos(data){ 
  Position = data.val(); 
  balloon.x = Position.x; 
  balloon.y = Position.y; 
}

function showError(){ 
  console.log("Error in Reading Database"); 
}
