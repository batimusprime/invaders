//declare empty arrays
let targets = [];
let shoots = [];
let animation = [];
let zArr = [];

//metrics
var score = 0;
var health = 400;
let lives = 5;

//number of targets
var tarNum = 6;

//p5 preload function, runs once before load
function preload(){

    retroFont = loadFont('assets/BitPotion.ttf');
    //background image
    bg = loadImage('assets/bg.png');

//TODO Rewrite to dynamic variable names, and generic files, get generic pics
//loads all images and assigns them variables
    weaponImg = loadImage("/assets/weapon_red_magic_staff.png");
    imgThree = loadImage("/assets/shoot.png");

    //zombies
    zOne = loadImage("/assets/big_zombie_run_anim_f0.png");
    zTwo = loadImage("/assets/big_zombie_run_anim_f1.png");
    zThree = loadImage("/assets/big_zombie_run_anim_f2.png");
    zFour = loadImage("/assets/big_zombie_run_anim_f3.png");

    //demons
    // zOne = loadImage("/assets/big_demon_run_anim_f0.png");
    // zTwo = loadImage("/assets/big_demon_run_anim_f1.png");
    // zThree = loadImage("/assets/big_demon_run_anim_f2.png");
    // zFour = loadImage("/assets/big_demon_run_anim_f3.png");


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

    //TODO FInd a way to iterate over the array with time delay instead of this
    animation.push(runImg1)
    animation.push(runImg1)
    animation.push(runImg1)
    animation.push(runImg1)
    animation.push(runImg1)
    animation.push(runImg1)

    animation.push(runImg2)
    animation.push(runImg2)
    animation.push(runImg2)
    animation.push(runImg2)
    animation.push(runImg2)
    animation.push(runImg2)

    animation.push(runImg3)
    animation.push(runImg3)
    animation.push(runImg3)
    animation.push(runImg3)
    animation.push(runImg3)
    animation.push(runImg3)

 
    //creates new sprite
    sprite = new Sprite();
    
    //creates new falling object
    enemy = new Enemy();
    
    // creates target arrays
    for (i = 0; i < tarNum; i++){
        
        //distribution of targets
        targets[i] = new Target(width-100, (i * 75) + 80);
    }; 

//healthbar display
healthbar = new Healthbar();
//score display
scorebox = new Scorebox();

 
        //TODO FInd a way to iterate over the array with time delay instead of this
        zArr.push(zOne);
        zArr.push(zOne);
        zArr.push(zOne);
        zArr.push(zOne);
        zArr.push(zOne);
        zArr.push(zOne);
        zArr.push(zTwo);
        zArr.push(zTwo);
        zArr.push(zTwo);
        zArr.push(zTwo);
        zArr.push(zTwo);
        zArr.push(zTwo);
        zArr.push(zThree);
        zArr.push(zThree);
        zArr.push(zThree);
        zArr.push(zThree);
        zArr.push(zThree);
        zArr.push(zThree);
        zArr.push(zFour);
        zArr.push(zFour);
        zArr.push(zFour);
        zArr.push(zFour);
        zArr.push(zFour);
        zArr.push(zFour);
    console.log(zArr);

    
};// End setup


function draw(){

    background(bg);

//shows sprite
sprite.show();
sprite.move();



//shows falling object (at random point on Y axis) and calls update (to make it fall)
for (k=0;k<4;k++){
enemy.show(k);
enemy.update();
}
//shows stats.js
healthbar.show(lives);

scorebox.show();
//displays remaining targets
for (var i=0; i < targets.length; i++){
targets[i].show();
};  
//TODO Refactor to create new levels automatically
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

//winner or level 2

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

//once the health runs out, end game
if (health <= 0){
noLoop();
};

};//End draw


//controls for sprite
//key released stops sprite from moving constantly
function keyReleased(){
    
    if (key != ' '){
    
        sprite.setDir(0);
    
    };
    
};

//press spacebar to shoot
function keyPressed(){

    if (key === ' '){

        //create new object and push to array shoots
        let shoot = new Shoot(10, sprite.y);

        shoots.push(shoot);

    }

    if (keyCode === DOWN_ARROW){

        sprite.setDir(1);

    } else if (keyCode === UP_ARROW){

        sprite.setDir(-1);

    }

};
