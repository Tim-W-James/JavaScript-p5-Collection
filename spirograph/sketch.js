function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
  // variable setup
  isRCycleUp = true;
  isGCycleUp = true;
  isBCycleUp = true;
  isRCycleUpBack = true;
  isGCycleUpBack = true;
  isBCycleUpBack = true;
  rCycle = 0;
  gCycle = 0;
  bCycle = 0;
  rCycleBack = 0;
  gCycleBack = 0;
  bCycleBack = 0;

  // generate color offsets
  rOffset = Math.round(random(255)); // red offset
  gOffset = Math.round(random(255)); // green offset
  bOffset = Math.round(random(255)); // blue offset 
  rOffsetBack = Math.round(random(255)); // red offset
  gOffsetBack = Math.round(random(255)); // green offset
  bOffsetBack = Math.round(random(255)); // blue offset 
}

function draw() {
  // put drawing code here
  // fill(50,50, 50);
  // ellipse(random(windowHeight), random(windowHeight), 10, 10);

  // fill(100,50,200);
  // rect(100, 100, 100, 150);
  // rect(100, 150, 100, 100);
  
  // rect(100, mouseY % windowHeight, 100, 100);

  // point(mouseX, mouseY);

  //toggle color cycles
  if ((frameCount+rOffset)%255 == 0) // red
    isRCycleUp = !isRCycleUp;

  if ((frameCount+gOffset)%255 == 0) // green
    isGCycleUp = !isGCycleUp;

  if ((frameCount+bOffset)%255 == 0) // blue
    isBCycleUp = !isBCycleUp;

  //toggle color cycles 2
  if ((frameCount+rOffsetBack)%255 == 0) // red
    isRCycleUpBack = !isRCycleUpBack;

  if ((frameCount+gOffsetBack)%255 == 0) // green
    isGCycleUpBack = !isGCycleUpBack;

  if ((frameCount+bOffsetBack)%255 == 0) // blue
    isBCycleUpBack = !isBCycleUpBack;

  // cycle colors
  if (isRCycleUp) // red
    rCycle = (frameCount+rOffset)%255;
  else
    rCycle = 255-(frameCount+rOffset)%255;

  if (isGCycleUp) // green
    gCycle = (frameCount+gOffset)%255;
  else
    gCycle = 255-(frameCount+gOffset)%255;

  if (isBCycleUp) // blue
    bCycle = (frameCount+bOffset)%255;
  else
    bCycle = 255-(frameCount+bOffset)%255;
  
  // cycle colors 2
  if (isRCycleUpBack) // red
    rCycleBack = (frameCount+rOffsetBack)%255;
  else
    rCycleBack = 255-(frameCount+rOffsetBack)%255;

  if (isGCycleUpBack) // green
    gCycleBack = (frameCount+gOffsetBack)%255;
  else
    gCycleBack = 255-(frameCount+gOffsetBack)%255;

  if (isBCycleUpBack) // blue
    bCycleBack = (frameCount+bOffsetBack)%255;
  else
    bCycleBack = 255-(frameCount+bOffsetBack)%255;

  fill(rCycle, gCycle, bCycle, 50);

  background(255, 5)

  translate(width/2,height/2);
  rotate(frameCount/100.);
  
  for(var i=0; i<6; i++) {
    square(100,50,Math.abs(cos(frameCount/30.0)*30),Math.abs(sin(frameCount/30.0)*30));

    rotate(frameCount/100.0);

    square(sin(frameCount/20.0)*100,cos(frameCount/20.0)*180,10+(mouseX/mouseY)/2,(mouseY/mouseX));
    push();
    rotate((120/2));
    fill(rCycleBack, gCycleBack, bCycleBack, 200);
    square(sin(frameCount/20.0)*150,cos(frameCount/20.0)*180,10+(mouseX/mouseY)*5,(mouseY/mouseX)*10);
    rotate((120/2));
    square(sin(frameCount/20.0)*200,cos(frameCount/20.0)*180,Math.abs(sin(frameCount/60.0)*200),Math.abs(sin(frameCount/60.0)*100));
    pop();
  }
}
