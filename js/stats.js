
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
  text(score, 10, this.y+25);
};

}
