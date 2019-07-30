function Afghan(x, y){
  this.x = x;
  this.y = y;
  this.r = 30;
  this.toDelete = false;
 

  this.shrink = function(){
    if (this.r == 5){this.toDelete = true;}else{
    console.log('goodone');
    this.x = this.x*2;
};
  };

  this.show = function(){
    image(imgFive, this.x, this.y, this.r*2, this.r*2);
  }

};
