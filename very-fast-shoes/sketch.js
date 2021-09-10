/*  COMP1720 Assignment 3
*   2019 Sem 2
*   Tim James - u6947396
*/

var earth;
var logo;
var cycles = 0;
var rot = 0;
var speed = 0;
var hasInteracted = false;
var hasReachedHighSpeed = false;
var starX = [];
var starY = [];
var starSize = [];
const maxSpeed = 100;

function preload() {
  // load image
  earth = loadImage('assets/earth.png');
  logo = loadImage('assets/logo.png');
}

function setup() {
  // setup canvas
  createCanvas(windowWidth, windowHeight); 
  background(0);
  noStroke();
  
  // setup images
  earth.resize(250, 250);
  logo.resize(720*0.35, 340*0.35);
  imageMode(CENTER);
  angleMode(DEGREES);
  
  // setup text
  textFont('Helvetica');
  textAlign(CENTER);

  // create random positions and sizes for stars
  for (i = 0; i < 200; i++) {
    starX.push(random(windowWidth));
    starY.push(random(windowHeight));
    starSize.push(random(1, 3.5));
  }
}

function draw() {
  background(0, 40);

  // draw stars
  fill(255);
  for (i = 0; i < 200; i++)
    ellipse(starX[i], starY[i], random(0, starSize[i]));

  // draw earth
  if (speed > maxSpeed) { // ensure speed is not greater than the max
    speed = maxSpeed;
    hasReachedHighSpeed = true;
    speed -= 1; // speed decay
  }
  else if (speed > maxSpeed/2)
    speed -= 0.5; // speed decay
  else if (speed > 0)
    speed -= 0.25; // speed decay

  rot += speed;

  cycles = Math.floor(rot/360); // count number of cycles

  translate(windowWidth / 2, windowHeight / 2);
  rotate(rot);
  tint(
    200 + 55 * (speed/maxSpeed), 
    200 - 150 * (speed/maxSpeed), 
    200 - 150 * (speed/maxSpeed)
  );
  image(earth, 0, 0);
  rotate(-rot);
  translate(-(windowWidth / 2), -(windowHeight / 2));
  tint(255, 255, 255);

  // draw flames
  fill(random(200, 255), 50, 50, 100)
  if (speed > maxSpeed / 2) // only draw once speeds are high enough
    ellipse(
      windowWidth/2 + random(-100, 100),
      windowHeight/2 + random(-100, 100), 
      random(10, 150)
    );

  // draw logo
  image(logo, windowWidth/2, 100);  
  
  // draw text
  rotate(0);
  fill(225, 10, 10);
  textSize(50);
  textStyle(ITALIC);
  text("Reach new speeds", windowWidth/2, 200);

  textSize(90);
  textStyle(BOLDITALIC);
  text("Zike", windowWidth/2, 90);

  triangle( // arrow
    windowWidth/2, 
    windowHeight/2 + 120, 
    windowWidth/2 - 100, 
    windowHeight/2 + 150, 
    windowWidth/2 + 100, 
    windowHeight/2 + 150
  );

  textSize(90);
  textSize(50);
  textStyle(NORMAL);
  text("You are here", windowWidth/2, windowHeight/2 + 200);

  if (cycles == 1)
    text("You ran around the earth "+cycles+" time", windowWidth/2, windowHeight - 60);
  else
    text("You ran around the earth "+cycles+" times", windowWidth/2, windowHeight - 60);

  // hints
  if (frameCount > 200 && !hasInteracted) {
    textStyle(BOLD);
    text("Press any key to run", windowWidth/2, windowHeight - 120);
  }

  if (frameCount > 400 && hasInteracted && !hasReachedHighSpeed) {
    textStyle(BOLD);
    text("The faster you press keys the faster you run", windowWidth/2, windowHeight - 120);
  }
}

// rotate the earth as keys are pressed
function keyPressed() {
  hasInteracted = true;
  speed += 10;
}