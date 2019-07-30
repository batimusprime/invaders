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
let targets = [];
let shoots = [];
//metrics
var score = 0;
var health = 519;

//number of targets
var tarNum = 8;

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
for (i = 0; i < tarNum; i++){
targets[i] = new Target(i*75+50, 50);
}; 

//healthbar display
healthbar = new Healthbar();

//score display
scorebox = new Scorebox();

};// End setup


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
targets[i].show(2);

};  
//creates array of projectiles, their coordinates are set in the keypress function
if(score < (tarNum*100)){for (var i=0; i < shoots.length; i++){
shoots[i].show();
shoots[i].move();
//hit detection
for (var j=0; j<targets.length; j++){
if (shoots[i].hits(targets[j])){
targets[j].shrink();
shoots[i].gone();

}; 

};   
};

}else if(score >= (tarNum * 100)){

//level 2


};
for (var i=shoots.length-1; i>=0; i--){
if (shoots[i].toDelete){

shoots.splice(i,1);
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
sprite.setDir(0);
};
};

function keyPressed(){
if (key === ' '){
var shoot = new Shoot(sprite.x, height-130);
shoots.push(shoot);

}
if (keyCode === RIGHT_ARROW){
sprite.setDir(1);

} else if (keyCode === LEFT_ARROW){
sprite.setDir(-1);


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

this.show = function(lvl){

if (lvl == 1){
image(imgTwo, this.x, this.y, this.r*2, this.r*2);
}else if (lvl == 2){

image(imgFive, this.x, this.y, this.r*2, this.r*2);


}
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

//call show function with arg determining image to display
this.show = function() {
fill(255);

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


//Score and health

function Healthbar(){
this.x = 100;
this.y = height-51;


this.show = function(){
//draws rectangle with no outline
noStroke();
//red box rests behind green
fill('red');
rect(this.x, this.y, width-200 , 50);
//health remaining
fill('green');
rect(this.x, this.y, health, 50);

};




};
function Scorebox(){
this.x = 80;
this.y = height-51;
this.show = function(){
fill('white');
textSize(25);
text(score, 40, this.y+30);
};

}


//projectile constructor 
function Shoot(x, y){
    this.x = x;
    this.y = y;
    this.toDelete = false;
  
    this.show = function(){
      image(imgThree, this.x+20, this.y-20, 35,35);
    };
  this.gone = function(){
  this.toDelete = true;
  
  
  };
    this.hits = function(target){
  
  
      if (this.x < target.x + 50 && this.x + 50 > target.x && this.y < target.y + 50 && 50 + this.y > target.y){
  
        return true;
  
      }
      else{
  
        return false;
      };
  
  
    };
  
    this.move = function(){
      this.y = this.y-5;
  
  
    };
  
  
  
    };
  
  