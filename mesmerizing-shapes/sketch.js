// Part 3

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   // put setup code here

//   line1y1 = random(windowHeight);  
//   line1y2 = random(windowHeight);

//   line2y1 = random(windowHeight);  
//   line2y2 = random(windowHeight);

//   line3y1 = random(windowHeight);  
//   line3y2 = random(windowHeight);
// }

// function draw() {
//   // put drawing code here
//   background(100, 100, 255);

//   stroke(255);
//   strokeWeight(random(9,12));
//   line(0, line1y1, windowWidth, line1y2);

//   strokeWeight(random(9,12));
//   line(0, line2y1, windowWidth, line2y2);

//   strokeWeight(random(9,12));
//   line(0, line3y1, windowWidth, line3y2);

//   stroke(0);
//   fill(0);
//   ellipse(windowWidth/2, windowHeight/2, Math.abs(sin(frameCount/20.0)*500)+random(0,20), Math.abs(sin(frameCount/20.0)*500)+random(0,20))
// }

// Part 4

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
}

function draw() {
  background(255);
  triangle(windowWidth/2, 
    windowHeight/2 - Math.abs(sin(frameCount/30)*500), 
    windowWidth/2 + (sin(frameCount/30)*500), 
    windowHeight/2 + 250, 
    windowWidth/2 - (sin(frameCount/30)*500), 
    windowHeight/2 + 250);
  circle(windowWidth/2,windowHeight/2,sin(frameCount/30)*500);
  triangle(windowWidth/2, 
    windowHeight/2 - Math.abs(sin(frameCount/30)*500), 
    windowWidth/2 + sin(frameCount/30)*250, 
    windowHeight/2, 
    windowWidth/2 - (sin(frameCount/30)*250), 
    windowHeight/2);
  triangle(windowWidth/2, 
    windowHeight/2 + 250, 
    windowWidth/2 + sin(frameCount/30)*250, 
    windowHeight/2, 
    windowWidth/2 - (sin(frameCount/30)*250), 
    windowHeight/2);
  
}

