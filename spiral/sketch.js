// part 3
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   // put setup code here
//   originX = windowWidth/1.5;
//   originY = windowHeight/1.5;
//   fill(255, 0);
//   frameRate(1000);
// }

// function draw() {
//   // put drawing code here
//   stroke((frameCount+100)%255,(frameCount)%255,frameCount%255);
//   scale(sin(frameCount*180));
//   rotate(frameCount);
//   translate(p5.Vector.fromAngle(frameCount / 100, 100));
//   triangle(originX+100, originY-100, originX-100, originY-100, originX, originY);
//   triangle(originX+100, originY+100, originX-100, originY+100, originX, originY);
// }

// part 4
function setup() {
  createCanvas(windowHeight, windowHeight);
  // put setup code n here
  originX = 150;
  originY = 150;
  sineCycleSpeed = 1;
  background(0);
  frameRate(60);
  colorMode(RGB, 255);
}

function draw() {
  // put drawing code here
  background(0, 0.5);
  translate(windowHeight/2, windowHeight/2);  
  originX = 2000*Math.sqrt(Math.abs(tan(frameCount*30)));
  originY = 2000*Math.sqrt(Math.abs(tan(frameCount*30)));  

  rCycle = Math.abs(sin(frameCount/sineCycleSpeed))*255-120;
  gCycle = Math.abs(sin(frameCount/sineCycleSpeed))*255;
  bCycle = Math.abs(sin(frameCount/sineCycleSpeed))*255;
  fill(rCycle,gCycle,bCycle,10);
  stroke(0,20);
  noStroke();
  rotate(frameCount/10);
  var numRotations2 = 100;
  for(var i = 0; i < numRotations2; i++) {
    rotate(TWO_PI/numRotations2);
    scale(0.9);
    triangle(originX+100, originY+5, originX-100, originY, originX-50, originY+50);
    triangle(originX+100, originY+5, originX-100, originY, originX+50, originY+50);
  }
}

function keyTyped() {
  if (key === " ") {
	saveCanvas("thingo.png");
  }
}
