//declare empty arrays
let targets = [];
let shoots = [];
let animation = [];
let zArr = [];
let dArr = [];

//metrics
let health = 400;
let lives = 5;

//number of targets
let tarNum = 6;

//global obj variables

let sprite;
let enemy;
let healthbar;
let scorebox;
let level;
let player;
//p5 preload function, runs once before load
function preload(){

//font 
retroFont = loadFont('assets/BitPotion.ttf');

//background image
bg = loadImage('assets/bg.png');


weaponImg = loadImage("/assets/weapon_red_magic_staff.png");
bullet = loadImage("/assets/shoot.png");

//zombies
zOne = loadImage("/assets/big_zombie_run_anim_f0.png");
zTwo = loadImage("/assets/big_zombie_run_anim_f1.png");
zThree = loadImage("/assets/big_zombie_run_anim_f2.png");
zFour = loadImage("/assets/big_zombie_run_anim_f3.png");

//demons
dOne = loadImage("/assets/big_demon_run_anim_f0.png");
dTwo = loadImage("/assets/big_demon_run_anim_f1.png");
dThree = loadImage("/assets/big_demon_run_anim_f2.png");
dFour = loadImage("/assets/big_demon_run_anim_f3.png");


tarImg0 = loadImage('/assets/chest_full_open_anim_f0.png');
tarImg1 = loadImage('/assets/chest_full_open_anim_f1.png');
tarImg2 = loadImage('/assets/chest_full_open_anim_f2.png');
tarImg3 = loadImage('/assets/chest_full_open_anim_f3.png');
tarImg4 = loadImage('/assets/chest_full_open_anim_f4.png');

//sprite running images
runImg1 = loadImage('assets/wizzard_m_run_anim_f3.png');
runImg2 = loadImage('assets/wizzard_m_run_anim_f2.png');
runImg3 = loadImage('assets/wizzard_m_run_anim_f1.png');

//health bar sprites
hOutline = loadImage('assets/health_bar_decoration.png');

hFill0 = loadImage('assets/health_bar_f0.png')
hFill1 = loadImage('assets/health_bar_f1.png')
hFill2 = loadImage('assets/health_bar_f2.png')
hFill3 = loadImage('assets/health_bar_f3.png')
hFill4 = loadImage('assets/health_bar_f4.png')

}

function setup(){

    createCanvas(700,600);

    hack();

        level = new Level();
        level.createObjs();
        level.tarPop();
};// End setup


function draw(){

    background(bg);
    
    level.run();

//shows falling object (at random point on Y axis) and calls update (to make it fall)
for (k=0;k<4;k++){

    enemy.show(k);

    enemy.update();

}
//shows stats.js
healthbar.show(lives);

scorebox.show();
scorebox.status('Go ' + player.name + '!');
//displays remaining targets
for (var i=0; i < targets.length; i++){
targets[i].show();
};  
//TODO Refactor to create new levels automatically
//creates array of projectiles, their coordinates are set in the keypress function
if(level.score < (tarNum*100)){for (var i=0; i < shoots.length; i++){

    shoots[i].show();
    shoots[i].move();

    //hit detection target
for (var j=0; j<targets.length; j++){

    if (shoots[i].hits(targets[j])){

        targets[j].shrink();

        shoots[i].gone();

    }; 

};   

};

}else if(level.score >= (tarNum * 100)){

level.next();

};
for (var i=shoots.length-1; i>=0; i--){
if (shoots[i].toDelete){
shoots.splice(i,1);
}
};
for (var i=targets.length-1; i>=0; i--){
if (targets[i].toDelete){
targets.splice(i,1);
level.score += 100;
};
};

//once the health runs out, end game
if (health <= 0){

    level.end();
};

};//End draw



//this function stops sprite from moving constantly
// function keyReleased(){
    
//     if (key != UP_ARROW || DOWN_ARROW){
    
//         sprite.ydir = 0;
    
//     };
    
// };

/*
CONTROLS
*/

//press spacebar to shoot
function keyPressed(){

    if (key === ' '){

        //create new object and push to array shoots
        let shoot = new Shoot();

        shoots.push(shoot);

    }
        //positively or negatively invcrement the sprite's y position based on user input

    if (keyCode === DOWN_ARROW){

        sprite.ydir = 1;

    } else if (keyCode === UP_ARROW){

        sprite.ydir = -1;

    }

};

//this is the worst code I've ever writter

function hack(){

for (i=0;i<5;i++){

    animation.push(runImg1);
    zArr.push(zOne);
    dArr.push(dOne);

}
for (j=0;j<5;j++){

    animation.push(runImg2);
    zArr.push(zTwo);
    dArr.push(dTwo);

}
for (k=0;k<5;k++){

    animation.push(runImg3);
    zArr.push(zThree);
    dArr.push(dThree);
}

for (l=0;l<5;l++){

    zArr.push(zFour);
    dArr.push(dFour);



}

}