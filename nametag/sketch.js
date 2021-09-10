function setup() {
  // create the canvas (800px wide, 600px high)
  createCanvas(800, 600);

  // disable stroke
  noStroke();

  // background
  background(0);

  // variable setup
  textParticleSize = random(1,30);  
  textParticleOpacity = random (1,100);  
  textParticleOverlayOpacity = random (1,50);  
  textParticleOverlayOffsetX = random (-25,25);
  textParticleOverlayOffsetY = random (-25,25);
  textParticleOverlayColor = random (1,200);
  initializeParticle();
}

function draw() {
  // long fade
  background(0, 0.5);


  /*
    TEXT PARTICLES
  */

  // stop after 1000 frames
  if (frameCount < 1000) {
    // generate particle params
    textParticleSize = random(1,30);  
    textParticleOpacity = random (1,100);  
    textParticleOverlayOpacity = random (1,50);  
    textParticleOverlayOffsetX = random (-25,25);
    textParticleOverlayOffsetY = random (-25,25);
    textParticleOverlayColor = random (1,200);
    
    // generate circles in shape of name text
    fill(255,textParticleOpacity);
    // T
    ellipse(random(285,295),random(115,255), textParticleSize);
    ellipse(random(240,340),random(115,125), textParticleSize);
    // I
    ellipse(random(370,380),random(115,255), textParticleSize);
    // M
    ellipse(random(410,420),random(115,255), textParticleSize); 
    ellipse(random(470,480),random(115,255), textParticleSize);  
    ellipse(random(530,540),random(115,255), textParticleSize);    
    ellipse(random(410,540),random(115,125), textParticleSize);  
    
    // generate variable color circles in proximity of name text
    // for a subtle transition to background
    fill(textParticleOverlayColor,textParticleOverlayOpacity);
    // T
    ellipse(random(285,295)+textParticleOverlayOffsetX,random(115,255)+textParticleOverlayOffsetY, textParticleSize*0.5);
    ellipse(random(240,340)+textParticleOverlayOffsetX,random(115,125)+textParticleOverlayOffsetY, textParticleSize*0.5);
    // I
    ellipse(random(370,380)+textParticleOverlayOffsetX,random(115,255)+textParticleOverlayOffsetY, textParticleSize*0.5);
    // M
    ellipse(random(410,420)+textParticleOverlayOffsetX,random(115,255)+textParticleOverlayOffsetY, textParticleSize*0.5); 
    ellipse(random(470,480)+textParticleOverlayOffsetX,random(115,255)+textParticleOverlayOffsetY, textParticleSize*0.5);  
    ellipse(random(530,540)+textParticleOverlayOffsetX,random(115,255)+textParticleOverlayOffsetY, textParticleSize*0.5);    
    ellipse(random(410,540)+textParticleOverlayOffsetX,random(115,125)+textParticleOverlayOffsetY, textParticleSize*0.5); 
  }

  /*
    AMBIENT PARTICLES
  */

  // stop after 12000 frames
  if (frameCount < 12000) {
    if (frameCount%3 == 0) { // ambient smoke
      fill(200,random(10,100));
      circle(random(20,780),
        random(height/2),
        random(1,4));
    }
    if (frameCount%25 == 0) { // ambient blue spark
      fill(200,0,random(0,100),random(200,240));
      circle(random(200,600),
        500+random(height),
        random(5,15));
    }
    if (frameCount%30 == 0) { // ambient haze
      fill(random(200,255),50,0,random(100,220));
      circle(random(100,700),
        400+random(height),
        random(30,60));
    }
  }


  /*
    FLAME PARTICLE
  */

  // stop after 10000 frames
  if (frameCount < 10000) {
    // when particles get too small, start new particle
    if (particleSize < 3)
      initializeParticle();

    // isParticleNearBound is true if a particle approaches text
    isParticleNearBound = (particleNextX < 600 && 
      particleNextX > 200 && 
      particleNextY < 350); 
    
    // set particle size by Y position
    particleSize = 100*
      (particleNextY/(height*particleSizeDecayRate))*
      particleSizeMultiplier;
    
    // fade and shrink particles if they approach text
    if (isParticleNearBound) {
      particleSizeDecayRate += 0.15;
      particleOpacityDecayRate += 0.3;
    }

    // set color by Y position
    if (particleNextY > 500) { // pure red
      particleColorR = 255;
      particleColorG = 0;
      particleColorB = 0;
    }
    else if (particleNextY > 345) { // red to yellow
      // concentrate red towards middle  
      if (particleNextX < 600 && particleNextX > 200) { 
        particleColorR = 255;
        particleColorG = 200*((height-particleNextY)/255);
        particleColorB = 0;
      }
      else { 
        particleColorR = 255;
        particleColorG = 255*((height-particleNextY)/255);
        particleColorB = 0;
      }
    }
    else if (particleNextY > 150) { // yellow to white
      particleColorR = 255;
      particleColorG = 255;
      particleColorB = 255*((height-particleNextY-100)/255);
    }
    else { // white to grey
      particleColorR = 200*(particleNextY/255);
      particleColorG = 200*(particleNextY/255);
      particleColorB = 200*(particleNextY/255);
    }

    // set color/alpha with variance
    fill(particleColorR+random(-particleColorRScatter,particleColorRScatter),
      particleColorG+random(-particleColorGScatter,particleColorGScatter),
      particleColorB+random(-particleColorBScatter,particleColorBScatter),
      200*(particleNextY/(height*particleSizeDecayRate))*
      particleOpacityMultiplier);
    
    // place circle with variance
    circle(particleNextX+
      random(-particleOffsetScatter,particleOffsetScatter), 
      particleNextY+
      random(-particleOffsetScatter,particleOffsetScatter), 
      particleSize);

    // set next Y position
    particleNextOffsetY = particleClimbRate;
    particleNextY -= particleNextOffsetY;

    // determine next X postion
    if (isParticleMovingLeft) { // change value depending of direction following
      particleNextOffsetX = random(-particleOffsetRange);

      // avoid edges of the canvas and tend away from text
      if ((particleNextX - particleNextOffsetX < 0) || 
        (random(10) < 4 && !isParticleNearBound && particleNextX > 400) ||
        random(10) < 2)
        isParticleMovingLeft = false;
    }
    else {
      particleNextOffsetX = random(particleOffsetRange);

      // avoid edges of the canvas and tend away from text
      if ((particleNextX + particleNextOffsetX > width) || 
        (random(10) < 4 && !isParticleNearBound && particleNextX < 400) ||
        random(10) < 2)
        isParticleMovingLeft = true;
    }
    particleNextX += particleNextOffsetX; // set next X position
  }
}

// setup all variables to spawn a new particle
function initializeParticle() { 
  particleSpawnX =  random(300,500);
  particleNextY = height;
  particleNextOffsetX = 0;
  particleNextOffsetY = 0;
  particleOffsetRange = random(25,75);
  particleOffsetScatter = random(15,25);
  particleClimbRate = random(2,12);
  particleSize = 100;
  particleSizeMultiplier = random(0.75,1.5);
  particleSizeDecayRate = random(0.75,1.5);
  particleOpacityMultiplier = random(0.75,1.2);
  particleOpacityDecayRate = random(0.75,1);
  particleColorR = 255;
  particleColorG = 0;
  particleColorB = 0;
  particleColorRScatter = random(1,25);
  particleColorGScatter = random(1,25);
  particleColorBScatter = random(1,25);
  isParticleMovingLeft = true;
  isParticleNearBound = false;

  // small chance for particles that behave differently
  if (random(10) < 2) // direct upward
    particleOffsetRange = random(15);
  else if (random(10) < 1) { // scatter upward
    particleOffsetRange = random(3);
    particleOffsetScatter = random(25,50);
  } 
  else if (random(10) < 0.5) // spawn right corner
    particleSpawnX = random(770,795);
  else if (random(10) < 0.5) // spawn left corner
    particleSpawnX = random(5,30);
  
    particleNextX = particleSpawnX;
}

// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "nametag.png" file) to your downloads folder
function keyTyped() {
  if (key === " ") {
	saveCanvas("nametag.png");
  }
}
