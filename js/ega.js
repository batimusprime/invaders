function Ega(x, y){
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
  
  