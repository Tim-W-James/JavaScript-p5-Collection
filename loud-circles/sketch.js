var bloomers = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  colorMode(HSB, 255);
  noStroke();

  setupSound();
}

function draw() {
  background(0);

  // map the "drawBloomer" and "updateBloomer" functions over the bloomer array
  for (var i = 0; i < bloomers.length; i++) {
	  drawBloomer(bloomers[i]);
	  updateBloomer(bloomers[i]);
  }
}

function mouseReleased() {
  b = {
    x : mouseX,
    y : mouseY,
    colorH : random(255),
    colorS : 255/2,
    colorB : 255/2,
    colorA : 255,
    scale : random (1,5),
    rate : random(0.5, 1.25),
    hasBloomed : false,
    fixedSize : 0,
    age : 0
  };

  bloomers.push(b);
}

function drawBloomer(b) {
  fill(b.colorH, b.colorS, b.colorB, b.colorA);

  if (b.hasBloomed) {
    b.colorH += 0.5;
    ellipse(b.x, b.y, b.fixedSize);
  }
  else {
    ellipse(b.x, b.y, b.age*b.scale+10);    
  }
}

function updateBloomer(b) {
  if (b.age > 100 && !b.hasBloomed) {
    b.hasBloomed = true;
    b.fixedSize = b.age*b.scale+10;
    playBoop();
  }

  if (b.age < 255) {
    b.age += b.rate;
    b.colorS += b.rate/2;
    b.colorB += b.rate/2;
    b.colorA -= b.rate;
  }
}

//PART 5

// an array for our brushes
// var rings = [];

// function setup() {
//     createCanvas(windowWidth, windowHeight);

//     for(let i = 0; i < 40; i++) {
//         rings.push({x: random(width), y: random(height), size: Math.abs(Math.sin(frameCount))*width});
//     }
// }

// function draw() {
//     // draw all the brushes
//     rings.map(drawRing);

//     // move all the brushes around
//     rings.map(updateRing);
// }

// function drawRing(r) {
//     noFill();
//     let collisions = 0;
//     rings.map(function (r2) {
//         if(r != r2 && dist(r.x,r.y,r2.x,r2.y) < (r.size + r2.size) / 2) {
//             collisions += 1;
//         }
//     });

//     if(collisions % 2 == 0) stroke(0);
//     else stroke(255);
//     if(collisions > 9) {
//         rings.splice(rings.indexOf(r), 1);
//     }
//     ellipse(r.x,r.y,r.size);
// }
// function updateRing(r) {
//     r.size++;

//     if(random(100) > 98) {
//         // remove this ring from the rings array
//         rings.splice(rings.indexOf(r), 1);
//         rings.push({x: random(width), y: random(height), size: Math.abs(Math.sin(frameCount))*width});
//     }
// }
