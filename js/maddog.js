function Maddog(){
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
  