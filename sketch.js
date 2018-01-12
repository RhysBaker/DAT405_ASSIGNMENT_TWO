//creates array variable
let circleArray = [];
//assigns 100 to variable arraySize
let arraySize = 100;
//creates varaibles for rgb sliders
var rSlider, gSlider, bSlider;
var data;
let sex = "female"; //male or female
let date = "1971"; //from 1920 to 2059
let country = "Uganda"; //http://api.population.io:80/1.0/countries


function preload() {
  // Get the most recent earthquake in the database
  var url =
   "https://api.population.io:80/1.0/life-expectancy/total/" + sex + "/" + country + "/" + date + "-01-01/";
  data = loadJSON(url);
}




function setup() {
  //assigns canvas to variable
  var canvas = createCanvas(1280, 720);
  //assigns class to canvas
  canvas.class("canvasContainer");
  //assigns canvas to variable
  //assigns class to canvas
  //assings the range of the rgb sliders and the starting value
  //positions sliders on page
  rSlider = createSlider(0, 255, 255);
  rSlider.position(1350, 100);
  gSlider = createSlider(0, 255, 255);
  gSlider.position(1350, 130);
  bSlider = createSlider(0, 255, 255);
  bSlider.position(1350, 160);
  //creates an object for the circles
  //needed so that when mouse is clicked it creates new object
  for (let i = 0; i < 100; i++) {
    circleArray[i] = new Circle;
  }
}



function draw() {
  //assingns variables to slider values
  var r = rSlider.value();
  var g = gSlider.value();
  var b = bSlider.value();
  //set background depending on slider values
  //has a transparency so shapes have trail effect
  background(r, g, b, 20);
  document.getElementById("leContainer").innerHTML = "average life expectancy " + round(data.total_life_expectancy);

//creates the arrey and binds arreny length to array(100)
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].moveFunction();
    circleArray[i].displayCircle();

//creates a new object whereever the mouse is positiond and when the mouse is clicked
//assigns random speeds and sizes to the shapes
let arraySize = data.total_life_expectancy;
//console.log(arraySize);

    if (mouseIsPressed) {
      for (let i = 0; i < arraySize; i++) {
        circleArray[i] = new Circle(mouseX, mouseY, random(-2, 2), random(-2, 2), random(1, 25));
      }
    }

  }
}


//Definition of the class Circle
class Circle {

//creating the constructor so that the object can use aruments
  constructor(x, y, speedX, speedY, size) {
    //Setup of class' variables

    //assigning the parameters to the arguments
    //done for x and y position
    //speed
    //and colour
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = size;

    this.rd = random(255);
    this.grn = random(255);
    this.bl = random(255);
    this.a = 100;
  }

  //Class function that takes care of motion and collision
  //creating a function that allows the shapes to move away from the starting point
  moveFunction() {
    //Motion system - current position and speed
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;

    //Based on boundaries collision, reverse direction for x and y
    //if the left arrow key is held down the shapes will vounce off of the boundries
    if (keyIsDown(LEFT_ARROW)) {
      if (this.x > width || this.x < 0) {
        this.speedX *= -1;
      }
      if (this.y > (height) || this.y < 0) {
        this.speedY *= -1;
      }
      //if no key is held down the shapes will go past the canvas boundries
    } else {
      if (this.x > width || this.x < 0) {}
      if (this.y > (height) || this.y < 0) {}
    }
  }


  //Class function that displays the ellipse
  displayCircle() {
    noStroke();
    //assigning colour to the shapes
    this.fillcol = color(this.rd, this.grn, this.bl, this.a)
    fill(this.fillcol);
    //if the right arrow key is held down the shapes will change to rectangles
    if (keyIsDown(RIGHT_ARROW)) {
      rect(this.x, this.y, this.size, this.size);
      //if no key is held down then shapes will be ellipses
    } else {
      ellipse(this.x, this.y, this.size, this.size);
    }
  }
}
