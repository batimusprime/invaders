/*
This separate file contains all the classes for objects
*/

//TODO: Replace with class
//Targets
function Target(x, y){

    //props
    this.x = x;
    this.y = y;
    this.hits = 0;
    this.toDelete = false;

    //shrink function is called when projectile hits individual target
    this.shrink = function(){

        //records number of hits taken 4 hits and objects disppears
        if (this.hits == 4){
            
            this.toDelete = true;
        
        }else{

            this.hits += 1;

        }


    }

    this.show  = function(){

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

//Sprite constructor
function Sprite(){

    this.x = 20;

    this.y = height-150;

    this.ydir = 0;

    this.show = function(){

        //shows weapon
        image(weaponImg,this.x+38,this.y+15,20,60);
       
            image(animation[frameCount % animation.length],this.x,this.y,55,75);
        


        this.y = constrain(this.y, 55 ,height - 170);
    };

this.setDir = function(dir){

    this.ydir = dir;
}
this.move = function(){


    this.y += this.ydir*5;

};



this.stop = function(){

    this.r = .000001;
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
      
        // for(i=0;i<4000;i++){
            
            //walk speed of enemy, iterate through array of images every nth count
            // if(i%2 == 0){
                console.log(i)
                image(zArr[frameCount % zArr.length],this.x,this.y,55,75);
            // }
        // }
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
    console.log(health);
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
function Scorebox(){
this.x = 80;
this.y = height-51;
this.show = function(){
fill('white');
textSize(55);
textFont(retroFont);
text('Score: '
 + score, 20, this.y+30);
};
}

//projectile constructor 
function Shoot(x, y){
this.x = x;
this.y = y;
this.toDelete = false;

this.show = function(){

    image(imgThree, this.x+60, this.y+20, 35,35);

};

this.gone = function(){

    this.toDelete = true;
};

this.hits = function(target){

    if (this.x < target.x + 50 && this.x + 50 > target.x && this.y < target.y + 50 && 50 + this.y > target.y){
        return true;
        // healthbar.hit(health);
        // console.log('shabooya');
    }else{

        return false;
    };
};
this.move = function(){

    this.x = this.x+7;

};

};

