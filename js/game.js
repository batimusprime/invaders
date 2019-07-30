//objects
//displays remaining health
var healthbar;
//displays score
var scorebox;
//sprite
var maddog;
//falling obstacle
var enemy;
//arrays
var targets = [];
var ega = [];
//metrics
var score = 0;
var health = 519;
var scum = 8;
var afghan = [];

function preload(){
  //loads all images and assigns them variables
  img = loadImage("/img/maddog.png");
  imgTwo = loadImage("/img/iraq.png");
  imgThree = loadImage("/img/ega.png");
  imgFour = loadImage("/img/sadam.png");
  imgFive = loadImage('/img/afghan.png');

}

function setup(){

  createCanvas(700,600);
  //creates new sprite
  sprite = new Sprite();
  //creates new falling object
  enemy = new Enemy();
  // creates target arrays
  for (var i = 0; i < scum; i++){
    targets[i] = new Target(i*75+50, 50);
  }; 


  //healthbar display
  healthbar = new Healthbar();
  //score display
  scorebox = new Scorebox();
//setup
};

function draw(){

  background(51);
  //shows sprite and calls move
  sprite.show();
  sprite.move();
  //shows falling object (at random point on X axis) and calls update (to make it fall)
  enemy.show();
  enemy.update();
  //shows stats.js
  healthbar.show(300);
  scorebox.show();


//displays remaining targets
  for (var i=0; i < targets.length; i++){
    targets[i].show();

  };  
//creates array of projectiles, their coordinates are set in the keypress function
if(score < (scum*100)){for (var i=0; i < ega.length; i++){
    ega[i].show();
    ega[i].move();
    //hit detection
    for (var j=0; j<target.length; j++){
      if (ega[i].hits(target[j])){
        target[j].shrink();
        ega[i].gone();

      }; 
  
    };   
};

}else if(score >= (scum * 100)){

//level 2


};
  for (var i=ega.length-1; i>=0; i--){
    if (ega[i].toDelete){

      ega.splice(i,1);
    }
};

for (var i=targets.length-1; i>=0; i--){
  if (targets[i].toDelete){

    targets.splice(i,1);
    score += 100;
    console.log(score);
  };

};





//falling obstacles / health
if (enemy.update() == false){
//while fallings object is intersecting with sprite, deduct health points.
//12 gives the right ratio of healthbar indicated and actual remaining health
health = health-12;

};
//once the health runs out, end game
if (health <= 0){
noLoop();
};

  //draw
};

//controls for sprite
function keyReleased(){
  if (key != ' '){
  maddog.setDir(0);
};
};

function keyPressed(){
  if (key === ' '){
    var egas = new Ega(maddog.x, height-130);
    ega.push(egas);

  }
  if (keyCode === RIGHT_ARROW){
    maddog.setDir(1);

  } else if (keyCode === LEFT_ARROW){
    maddog.setDir(-1);


  }


}
//TODO: Replace with class
//constructor for targets
function Target(x, y){
  this.x = x;
  this.y = y;
  this.r = 30;
  this.toDelete = false;
 

  this.shrink = function(){
    if (this.r == 5){this.toDelete = true;}else{
    this.r -= 5;
};
  };

  this.show = function(){
    image(imgTwo, this.x, this.y, this.r*2, this.r*2);
  }

};

//Sprite constructor
function Sprite(){
  this.x = width/2;
  this.y = height-125;
  this.xdir = 0;




  this.show = function(){

    image(img, this.x, this.y, 75, 75);
    this.x = constrain(this.x, 0,width - 80);

  };
  this.setDir = function(dir){
    this.xdir = dir;


  }
  this.move = function(dir){
    this.x += this.xdir*5;

  };

  this.stop = function(){
this.r = .000001;

  }


};


//Enemy constructor


function Enemy() {
  this.y = 0;
  this.x = random(600);


  this.gravity = .35;
  this.velocity = 0;

  this.show = function() {
    fill(255);
    // ellipse(this.x, this.y, 32, 32);
    image(imgFour, this.x, this.y, 50, 50);
  }



  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = 0;
      this.x = random(600);
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    };


if (enemy.x < sprite.x + 50 && enemy.x + 50 > sprite.x && enemy.y < sprite.y + 50 && 50 + enemy.y > sprite.y){

return false;
}

  };


this.stop = function(){


  this.y =10000;
  this.gravity = 0;
  this.velocity = 0;
};

};
