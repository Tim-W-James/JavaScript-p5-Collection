function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    
    // generate stroke type
    if ((Math.round(random(0,1)) == 0)){
        noStroke();
    }
    
    // generate random parameters
    alphaType = Math.round(random(0, 4));
    shapeType = Math.round(random(0, 3));
    sizeType = Math.round(random(0, 1));
    positionType = Math.round(random(0, 2));
    movementType = Math.round(random(0, 4));
    colorType = Math.round(random(0, 5));
    colorSetting = Math.round(random(0,2))
    backgroundType = Math.round(random(0,6));
    sineCycleSpeed = random(10,100);   
    frameRateSpeed = random(5,500); 

    // generate color offsets
    rOffset = Math.round(random(255)); // red offset
    gOffset = Math.round(random(255)); // green offset
    bOffset = Math.round(random(255)); // blue offset    

    // generate size values
    size = random(25, 1000);
    sizeRange = random(0.25, 1);

    // configure colorType
    if (colorType == 0) { // full random color
        alphaType = 2;
        positionType = 0;
        size = random (20, 250);
    }
    else if (colorType == 1) { // grey color type
        rOffset = 0;
        gOffset = 0;
        bOffset = 0;
        size = random (20, 250);
        backgroundType = 2;
    }

    // configure colorSetting
    if (colorSetting == 0)
        colorMode(HSB, 255);
    else
        colorMode(RGB, 255);

    // generate starting position
    nextPosX = random(windowWidth);
    nextPosY = random(windowHeight);

    // generate movement values
    switch (movementType) {
        case 0: // full random
            xScaleMin = random (0.1, 2);
            xScaleMax = random (0.1, 2);
            yScaleMin = random (0.1, 2);
            yScaleMax = random (0.1, 2);
            break;
        
        case 1: // single value random
            scaleSeed = random (0.1, 2);
            xScaleMin = scaleSeed;
            xScaleMax = scaleSeed;
            yScaleMin = scaleSeed;
            yScaleMax = scaleSeed;
            break;            

        case 2: // two value random A
            xScaleMin = 0;
            xScaleMax = random (0.1, 2);
            yScaleMin = 0;
            yScaleMax = random (0.1, 2);
            break; 
        
        case 3: // two value random B
            xScaleMin = 0;
            xScaleMax = random (0.1, 2);
            yScaleMin = random (0.1, 2);
            yScaleMax = 0;
            break; 
        
        default: // two value random C
            xScaleMin = random (0.1, 2);
            xScaleMax = 0;
            yScaleMin = random (0.1, 2);
            yScaleMax = 0;

    }        
    rangeX = random(100*xScaleMin, 100*xScaleMax);
    rangeY = random(100*yScaleMin, 100*yScaleMax);

    // frame rate
    frameRate(frameRateSpeed);

    // variable setup
    isRCycleUp = true;
    isGCycleUp = true;
    isBCycleUp = true;
    rCycle = 0;
    gCycle = 0;
    bCycle = 0;
    alpha = 0;
  }
  
  function draw() {
    // background type
    switch (backgroundType) {
        case 0: // quick fade
            background(255,8);
            break;
        
        case 1: // medium fade
            background(255,4);
            break;

        case 2: // slow fade
            background(255,1);
            break;

        case 3: // grey fade
            background(200,2);
            break;        

        case 4: // random color fade
            background(random(255),random(255),random(255),2);
            break;

        default:
            break;
    }
   
    // toggle cycles for modulus
    if ((frameCount+rOffset)%255 == 0) // red
        isRCycleUp = !isRCycleUp;

    if ((frameCount+gOffset)%255 == 0) // green
        isGCycleUp = !isGCycleUp;

    if ((frameCount+bOffset)%255 == 0) // blue
        isBCycleUp = !isBCycleUp;

    // cycle colors
    switch (colorType) {
        case 0: // full random
            rCycle = random(255);
            gCycle = random(255);
            bCycle = random(255);
            break;
            
        case 1: // grey modulus cycle
            if (isRCycleUp) // red
                rCycle = (frameCount)%255;
            else
                rCycle = 255-(frameCount)%255;

            if (isGCycleUp) // green
                gCycle = (frameCount)%255;
            else
                gCycle = 255-(frameCount)%255;

            if (isBCycleUp) // blue
                bCycle = (frameCount)%255;
            else
                bCycle = 255-(frameCount)%255;
            break;

        case 2: // random modulus cycle
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
            break;
            
        default: // random sine cycle
            rCycle = Math.abs(sin(frameCount/sineCycleSpeed+rOffset))*255;
            gCycle = Math.abs(sin(frameCount/sineCycleSpeed+gOffset))*255;
            bCycle = Math.abs(sin(frameCount/sineCycleSpeed+bOffset))*255;
    }
         
    // generate next position
    switch (positionType) {
        case 0: // full random
            nextPosX = random(windowWidth);
            nextPosY = random(windowHeight);
            break;

        case 1: // random fall
            nextPosX = Math.abs((nextPosX+random(0,rangeX))%(windowWidth));
            nextPosY = Math.abs((nextPosY+random(0,rangeY))%(windowHeight));
            break;
        
        // case 2:
        //     nextPosX = mouseX + random(rangeX, -rangeX);
        //     nextPosY = mouseY + random(rangeY, -rangeY);
        //     break;
        
        default: // random path
            nextPosX = Math.abs((nextPosX+random(rangeX,-rangeX))%(windowWidth));
            nextPosY = Math.abs((nextPosY+random(rangeY,-rangeY))%(windowHeight));               
            break;
    }
    
    // generate size variance
    var sizeVariance = random(0.1, sizeRange);

    // alpha values
    switch (alphaType) {
        case 0: // vertical alpha
            alpha = (nextPosX/windowHeight) * 255;
            break;

        case 1: // horizontal alpha
            alpha = (nextPosY/windowWidth) * 255;
            break;

        case 2: // no alpha
            alpha = 255;
            break;

        default: // full random
            alpha = (random(0.1,1)) * 255;
            break;
    }

    // assign new color and alpha
    fill(rCycle, bCycle, gCycle, alpha);     
    
    // generate shape
    switch (shapeType) {
        case 0: // square
            square(nextPosX,nextPosY,size*sizeVariance);
            break;

        case 1: // square and ellipse
            if ((Math.round(random(0, 1))) == 0)
                square(nextPosX,nextPosY,size*sizeVariance);
            else
                ellipse(nextPosX,nextPosY,size*sizeVariance,size*sizeVariance);
            break;

        default: // ellipse
            ellipse(nextPosX,nextPosY,size*sizeVariance,size*sizeVariance);
            break;        
    }
  }