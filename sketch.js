let coinImg;
let coins = [];
let coinSound;
let coin1, coin2, coin3, coin4;

let pink = '#FF3691';
let blue = '#4A31FF';

function preload() {
  // coinImg = loadImage('../assets/coin.png'); // Adjust path based on your folder structure
  logoImg = loadImage('assets/logo.png'); // Load the logo image
  coinSound = loadSound('assets/coinSound.mp3'); // Adjust the path and filename as needed
  coin1 = loadImage('assets/coins-01.png');
  coin2 = loadImage('assets/coins-02.png');
  coin3 = loadImage('assets/coins-03.png');
  coin4 = loadImage('assets/coins-04.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
}

function draw() {
  background(blue);

  push();
  // scale(0.9); // Scale down the logo to fit the canvas
  image(logoImg, width/2,height/2); // Display the logo at the center
  pop();

  // Update and display all coins
  for (let i = coins.length - 1; i >= 0; i--) {
    coins[i].update();
    coins[i].display();

    // Optional: remove coin if it goes off screen
    if (coins[i].y < -50 || coins[i].x < -50 || coins[i].x > width + 50) {
      coins.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (coinSound && coinSound.isLoaded()) {
    coinSound.play();
  }
  let numCoins = random(3, 10); 
  for (let i = 0; i < numCoins; i++) {
    coins.push(new Coin(mouseX, mouseY));
  }
}

function keyPressed() {
  let k = key.toLowerCase();
  if (k === 's') {
    saveCanvas('coinSketch', 'png'); // Downloads canvas as "coinSketch.png"
  }
}

class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-3, 3);       // Disperse horizontally
    this.vy = random(-4, -1);      // Float upward
    this.angle = random(TWO_PI);
    this.rotationSpeed = random(-0.1, 0.1);
    this.size = 120;

    // Randomly assign one of the four coin images
    let coinImages = [coin1, coin2, coin3, coin4];
    this.img = random(coinImages);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.rotationSpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    let aspect = 206 / 300;
    let targetHeight = this.size;
    let targetWidth = this.size * aspect;
    image(this.img, 0, 0, targetWidth, targetHeight);
    pop();
  }
}
