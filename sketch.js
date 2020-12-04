var canvas, dog;
var dogImg, happyDogImg, foodS, foodStock;
var database;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var changeState, readState;
var bedroomImg, gardenImg, washroomImg;
var sadDog;
var gameState;
var currentTime;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  bedroomImg= loadImage("images/Bed Room.png");
  gardenImg= loadImage("images/Garden.png");
  washroomImg= loadImage("images/Wash Room.png");
  sadDog= loadImage("images/DeadDog.png");
}

function setup() {
  database = firebase.database();

  createCanvas(650, 750);
  foodObj = new Food();

  foodStock=database.ref('FOOD');
  foodStock.on("value", readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  readState=database.ref('gameState');
  readState.on("value", function(data){
    gameState=data.val;
  });
  
  dog = createSprite(300, 490, 10, 5);
  dog.addImage(dogImg);
  dog.scale=0.6;

  feed=createButton("Feed the Dog");
  feed.position(620,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(200,95);
  addFood.mousePressed(addFoods);

  
}


function draw() {  
 // background(46, 139, 87);

  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<= (lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry")
    foodObj.display();
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog)
  }
  
  drawSprites();

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}