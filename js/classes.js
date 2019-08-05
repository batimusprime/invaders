/*
This separate file contains all the classes
*/
////////////////////////////////////////////////////

/*

PLAYER CLASS

*/

class Player{

    constructor(name,char){

        //player properties
        this.name = name
        this.score = 0;

        //character selection
        this.char = char
    }

}
/* 
LEVEL CLASS 
*/

//Level object used to change levels and keep stats about gameplay
class Level{

    constructor(){

        //level properites
        this.enemy = 'demons'
        this.num = 1;
        this.running = false;

        /*level.score is different than player.score, level.score is used to keep track of the total hits taken by the targets during the level, it is not displayed to the user. 
        In level 1 ONLY level.score == player.score (can be used to test for new game)
        */
        this.score = 0;

    }
    //create all the required objects
    createObjs(){

        //player obj to contain player props. Args: username,character
        player = new Player('Bilbo','m_wizard');

        //sprite and player character
        sprite = new Sprite();
        
        //Falling enemies
        enemy = new Enemy();

        //healthbar display
        healthbar = new Healthbar();
  
        //score and stats display
        scorebox = new Scorebox();

        

    }

    //start the game
    run(){

        //set run status to on
        this.running = true;

        //shows sprite
        sprite.show();
        //moves
        sprite.move();
    
    }

    //show the targets
    tarPop(){

        // creates target arrays
        for (let i = 0; i < tarNum; i++){
        
            //distribution of targets
            targets[i] = new Target(width-100, (i * 75) + 80);
    
        }; 

    }

    //ends the game by stopping p5 js loop
    end(){

        //set run status to off
        this.running = false;
        noLoop();

    };
    
    //move to the next level
    next(){

        this.num++;

        //alternate between enemy displays
        if (this.enemy == 'zombies'){

            this.enemy = 'demons';

        }else if (this.enemy == 'demons'){

            this.enemy = 'zombies';

        }
        /*
        setting level.score to 0 resets the level automatically 
        because the level ends based on a test of the level.score property
        */
        this.score = 0;

    }
}

/* 
SCORE BOX CLASS
*/

//Shows score and stats in bottom R of screen
class Scorebox{
    
    constructor(){
        
        this.x = 80;
        this.y = height-51;
    
    }
    
    show(){
        
        //properties
        fill('white');
        textSize(55);
        textFont(retroFont);
        
        //score
        text('SCORE: ' + player.score, 25, this.y+45);

        //level
        text('LEVEL: ' + level.num, 25, this.y+15);
    };

    status(statusMsg){

        //properties
        fill('white');
        textSize(55);
        textFont(retroFont);
 
        //display status message
        text(statusMsg, 525, this.y+30);

    }
}

/* 
SHOOT CLASS
*/

//projectiles shot at targets
class Shoot{

    constructor(){

        //10 pixel padding to make projectile come from top of sprite
        this.x = 10;
        this.y = sprite.y;
        //changes after impact to mark obj for removal
        this.toDelete = false;

    }

    //display projectile on canvas
    show(){

        image(bullet, this.x+60, this.y+20, 35,35);

    };

    //mark for deletion
    gone(){

        this.toDelete = true;

    };

    //handles impacting the target
    hits(target){

        if (this.x < target.x + 50 && this.x + 50 > target.x && this.y < target.y + 50 && 50 + this.y > target.y){

            return true;

        }else{

            return false;

        };

    };

    //moves the image
    move(){

        this.x = this.x+5;

    };

};

/* 
TARGET CLASS
*/

//objects to shoot at (chests)
class Target{

    constructor(x,y){

    //properties
    this.x = x;
    this.y = y;

    //# of player hits this object has taken
    this.hits = 0;
    
    //marked for removal if hits reach a certain number
    this.toDelete = false;
    
}
    //shrink function is called when projectile hits individual target
    shrink(){

    //records number of hits taken 4 hits and objects disppears
    if (this.hits == 4){

        //mark for deletion
        this.toDelete = true;

    }else{

        //give the target a hit
        this.hits += 1;

    }

}
    //displays an ever shrinking target based on hits
    //TODO: REFACTOR TO SWITCH WITH this.tarImg, this.x = and this.y = statements
    show(){

        if(this.hits == 0){

            image(tarImg0, this.x, this.y, 50, 50)


        }else if(this.hits == 1){


            image(tarImg1, this.x, this.y, 50, 50)


        }else if(this.hits == 2){


            image(tarImg2, this.x, this.y, 50, 50)


        }else if(this.hits == 3){

            image(tarImg3, this.x-10, this.y-6, 65, 65)


        }else if(this.hits == 4){

            image(tarImg4, this.x-10, this.y-6, 70, 75)

        }

    }
};

/*
SPRITE CLASS
*/

//Player controlled character
class Sprite{

    constructor(){

        //properties
        this.x = 20;

        this.y = height-150;

        this.ydir = 0;

    }

    show(){

        //shows weapon
        image(weaponImg,this.x+38,this.y+15,20,60);

        /* Modulo frame count is not neccessary
        Frame count is a p5 js counter of total times run like frames displayed in an animation
        it is the reason that 72 image arrays are needed to control gameplay speed
        must find better solution
        */
        //show sprite
        image(animation[frameCount % animation.length],this.x,this.y,55,75);
        
        //keep sprite on screen
        this.y = constrain(this.y, 55 ,height - 170);
    };

    move(){

        //change the sprite y axis based on user input of direction
        this.y += this.ydir*5;

    };

};

//Enemy constructor (falling objects)
function Enemy() {

this.x = width;
this.y = random(400);

//enemy speed
this.gravity = -.18;
this.velocity = 0;

this.show = function() {

    //TODO: FIX THIS SO WE DONT NEED HUGE ARRAYS
    if (level.enemy == 'zombies'){
    
        image(zArr[frameCount % zArr.length],this.x,this.y,55,75);
    
    }else if(level.enemy == 'demons'){

        image(dArr[frameCount % dArr.length],this.x,this.y,55,75);

    
}
}

this.update = function() {

this.velocity += this.gravity;

this.velocity *= .9;

this.x += this.velocity;


if (this.x < 0) {

//if enemy goes off screen, spawn new enemy with proper coordinates  
this.y = random(70,440);
this.x = width;
this.velocity = 0;

}  

if (enemy.x < sprite.x + 50 && enemy.x + 50 > sprite.x && enemy.y < sprite.y + 50 && 50 + enemy.y > sprite.y){

healthbar.hit(health);

}
};



};

//Score and health
function Healthbar(){
this.x = 500;
this.y = height-51;
this.show = function(lives){

//cosmetic outline
image(hOutline,205,height-45, 180,40);

if(lives == 5){

image(hFill0,250,height-41, 146,30);

}else if(lives == 4){


image(hFill1,250,height-41,146,30);

}
else if(lives == 3){

image(hFill2,250,height-41,146,30);

}
else if(lives == 2){

image(hFill3,250,height-41,146,30);

}
else if(lives == 1){

image(hFill4,250,height-41,146,30);

}
else if(lives == 0){


}

};

this.hit = function(){


//TODO REPLACE WITH SWITCH
health = health - 1;
if(health < 400 && health > 320){
lives = 4;
this.show(lives);
// console.log(lives);

}
else if(health < 320 && health > 240){
lives = 3;
this.show(lives);
// console.log(lives);

}
else if(health < 240 && health > 160){

lives = 2;
this.show(lives);
// console.log(lives);

}
else if(health < 160 && health > 80){
lives = 1;
this.show(lives);
// console.log(lives);

}
else if(health < 80 && health > 0){
lives = 1;
this.show(lives);
// console.log(lives);

}else if(health == 0){

lives = 0;
this.show(lives);

}


}
};
