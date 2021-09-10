// part 1-4
// var sally; // declare a variable called sally

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   // https://p5js.org/reference/#/p5/colorMode
//   colorMode(HSB, 360, 100, 100);

//   sally = {
//     type: "Squirtle",
//     level: 3,
//     hp: 100,
//     owner: "ME",
//     isCaptured: false,
//     captureSound: loadSound("assets/pokeball-catch.mp3"),
//     x: 100,
//     y: 100
//   };
// }

// function draw() {
//   background(100, 80, 50);

//   drawPokemon(sally);

//   if (!sally.isCaptured)
//     updatePokemon(sally);
// }

// function drawPokemon(aPokemon) {
//   noStroke();
//   colorMode(RGB,255);

//   if (!aPokemon.isCaptured) {
//     fill(200,200,50);
//     ellipse(aPokemon.x, aPokemon.y, 50, 50);
//     triangle(aPokemon.x+20, aPokemon.y-10, aPokemon.x+10, aPokemon.y-14, aPokemon.x+25, aPokemon.y-30);
//     triangle(aPokemon.x-20, aPokemon.y-10, aPokemon.x-10, aPokemon.y-14, aPokemon.x-25, aPokemon.y-30);

//     fill(0);
//     ellipse(aPokemon.x+7, aPokemon.y-7, 10, 10);
//     ellipse(aPokemon.x-7, aPokemon.y-7, 10, 10);
//   }
//   else {
//     fill(200,10,10);
//     arc(aPokemon.x, aPokemon.y, 50, 50, PI, 0);

//     fill(255); 
//     arc(aPokemon.x, aPokemon.y, 50, 50, 0, PI);  
    
//     fill(0);
//     ellipse(aPokemon.x, aPokemon.y, 20, 20);
//     rect(aPokemon.x-25.5, aPokemon.y-2.5, 51, 5, 3);

//     fill(255);
//     ellipse(aPokemon.x, aPokemon.y, 10, 10);
//   }

//   colorMode(HSB, 360, 100, 100);
// }

// function updatePokemon(aPokemon) {
//   // this is just a bit of controlled randomness to make the pokemon move around the canvas
//   aPokemon.x += 0.05*width*cos(frameCount*0.01)*randomGaussian(0, 0.1);
//   aPokemon.y += 0.05*height*cos(frameCount*0.011)*randomGaussian(0, 0.1);
// }

// function mouseClicked() {
//     if (dist(sally.x, sally.y, mouseX, mouseY) < 25) {
//       if (!sally.isCaptured) {
//         console.log("Caught "+sally.type+"!");
//         sally.captureSound.play();
//       }
//       sally.isCaptured = true;
//     }
// }

// part 5
// an array for our brushes
var brushes = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    // create colour palette for the painting
    var palette = [
        color(237,176,5), 
        color(187,16,6),
        color(26,82,164),
        color(236,126,3)
    ];

    // push 100 objects to the brushes array
    for(var i=1; i<=102; i++) {
        brushes.push({
            color: 
                // pick two colours from the palette
                // and mix them together randomly
                lerpColor(
                        palette[floor(random(palette.length))],
                        palette[floor(random(palette.length))],
                        random(1)),
            // brush size
            size: randomGaussian(6,3),
            // position
            pos: createVector(random(width),random(height)),
            // velocity
            vel: createVector(0,0)
        });
    }

    noStroke();

    // set mouse position to centre
    mouseX = width/2;
    mouseY = height/2;

    background(255);

    frameRate(30);
}

function draw() {
    // draw all the brushes
    brushes.map(drawBrush);

    // move all the brushes around
    brushes.map(moveBrush);
}

function drawBrush(b, i) {
    fill(b.color);
    ellipse(b.pos.x, b.pos.y, b.size);
}

function moveBrush(b) {
    // add brush velocity to brush position
    b.pos.add(b.vel)
    for (var i=0; i<brushes.length; i++) {
        if(brushes[i] == b) continue;

        // gravity
        var g = b.pos.copy();
        g.sub(brushes[i].pos);
        g.normalize();

        if(b.pos.dist(brushes[i].pos) > 90) {
            // move toward other brushes
            g.div(4);
            b.vel.add(g);
        } else {
            // move away from other brushes
            b.vel.add(g.mult(100 - b.pos.dist(brushes[i].pos)));
        }

    }

    // move towards the mouse
    var m = createVector(mouseX, mouseY);
    m.sub(b.pos);
    m.normalize();
    m.mult(10 - max(b.pos.dist(createVector(mouseX,mouseY)),100));
    b.vel.sub(m);


    // add some noise to the movement
    var n = noise(b.pos.x/400,b.pos.y/400);
    b.vel.add(createVector(sin(n*TWO_PI*400),cos(n*TWO_PI*400)).mult(100));

    if (frameRate%3 == 0) {      
      b.vel.add(createVector(sin(n*TWO_PI*400),cos(n*TWO_PI*400)).mult(10000));
    }

    // try tweaking this value
    b.vel.limit(Math.abs(tan(frameCount/30)));
}