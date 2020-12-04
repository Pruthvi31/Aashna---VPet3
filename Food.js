class Food{
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image= loadImage("images/Milk.png");
    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    detuctFood(){
        if(this.foodStock>0){
            this.foodStock= this.foodStock-1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    bedroom(){
        background(bedroomImg, 550, 500);
    }

    garden(){
        background(gardenImg, 550, 500);
    }

    washroom(){
        background(washroomImg, 550, 500);
    }

    display(){
       var x=80,y=100;
       background(46,139,87);

       fill(255,255,254);
       textSize(15);
       if(lastFed>=12){
           text("Last Feed : "+ lastFed%12 + " PM", 50,30);
       }else if(lastFed==0){
           text("Last Feed : 12 AM",50,30);
       }else{
           text("Last Feed : "+ lastFed + " AM", 50,30);
       }
       imageMode(CENTER);
       //image(this.image,120,620,80,80);

       if(this.foodStock!=0){
           for(var i=0; i<this.foodStock; i++){
               if(i%10==0){
                   x=80;
                   y=y+50;
               }
               image(this.image,x,y,50,50);
               x=x+30;
           }
       }
    }
}