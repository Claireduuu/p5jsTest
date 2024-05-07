// Splash class to display the initial screen
    class Splash {
      constructor() {
        this.splashBorder = 100;
        fill(255);
        stroke(255, 0, 0);
        rect(this.splashBorder, this.splashBorder, windowWidth - this.splashBorder * 2, windowHeight - this.splashBorder * 2);
        fill(0, 0, 222);
        noStroke();

        this.title = createDiv("Apple Harvest Game");
        this.title.style('color:deeppink');
        this.title.style('font-family: Arial, Helvetica, sans-serif');
        this.title.position(this.splashBorder + 20, this.splashBorder + 20);

        this.name = createDiv("Hongying Du");
        this.name.position(this.splashBorder + 20, this.splashBorder + 60);

        this.info = createDiv("My project aims to create an interactive game where players control a cursor to find and click on randomly distributed apples of varying sizes on an apple tree within a 10-second timer. The game will challenge players to quickly locate and harvest all the apples. The random distribution and size variation of apples in each game session will ensure that each time is unique.");
        this.info.position(this.splashBorder + 20, this.splashBorder + 100);
        this.info.size(windowWidth - this.splashBorder * 2 - 50, windowHeight - this.splashBorder * 2 - 50);

        this.button = createButton('Continue');
        this.button.position(this.splashBorder + 20, windowHeight - this.splashBorder - 30);
        this.button.mousePressed(() => this.hide());
      }

      hide() {
        this.title.remove();
        this.name.remove();
        this.info.remove();
        this.button.remove();
        gameState = 'start';
      }
    }

    // Game variables
    let splash;
    let gameState = 'splash'; // start, playing, gameover, success, splash
    let apples = [];
    let gameTimer = 10; // 10 seconds game time
    let osc; successOsc, failOsc;// Oscillator for click sound

    function setup() {
      createCanvas(windowWidth, windowHeight);
      splash = new Splash();
      textAlign(CENTER, CENTER);
      textSize(32);

      osc = new p5.Oscillator('sine');
      successOsc = new p5.Oscillator('sine');
      successOsc.freq(880); // Set the frequency for success sound
      successOsc.amp(0); // Start with amplitude 0
      successOsc.start(); // Start the oscillator

      failOsc = new p5.Oscillator('sine');
      failOsc.freq(440); // Set the frequency for fail sound
      failOsc.amp(0); // Start with amplitude 0
      failOsc.start(); // Start the oscillator
    }



   function draw() {
  background(100, 200, 100); // A green background for the grass
  
  drawAppleTree(); // Always draw the tree
  
  if (gameState !== 'playing') {
    drawApplesOnTree(); // 只在没开始前显示装饰苹果
  }
  
  fill(0); // 黑色的文字显示
  noStroke();
  
  if (gameState === 'start') {
    displayStartScreen();
  } else if (gameState === 'playing') {
    displayGame();
    updateTimer();
  } else if (gameState === 'gameover') {
    displayGameOverScreen(false);
  } else if (gameState === 'success') {
    displayGameOverScreen(true);
  }
     
    startButton = createButton('Start Game');
  startButton.position(width / 2 - startButton.width / 2, height / 2 + 100);
  startButton.mousePressed(startGame);
}

function drawAppleTree() {
  // Trunk
  fill(101, 67, 33); // Brown color
  rect(width / 2 - 25, height - 150, 50, 150);
  endShape(CLOSE);

  // Leaves
  fill(34, 155, 34); // A green middle back
  ellipse(width / 2, height - 250, 245, 215); // Central foliage
  fill(34, 140, 34); // A top single green circle
  ellipse(width / 2, height - 350, 100, 80);
  fill(60, 179, 113); // A slightly lighter green
  ellipse(width / 2 - 120, height - 200, 130, 110); // Left 
  ellipse(width / 2 + 120, height - 200, 130, 110); // Right
  fill(46, 139, 87); // A darker shade of green for contrast
  ellipse(width / 2 - 80, height - 280, 100, 85);
  ellipse(width / 2 + 80, height - 280, 100, 85);
  fill(30, 110, 65); // A darkest shade of green for contrast
  ellipse(width / 2 - 60, height - 330, 70, 45);
  ellipse(width / 2 + 60, height - 330, 70, 45);
}

function drawApplesOnTree() {
  let applePositions = [
    { x: width / 2 - 100, y: height - 220 },
    { x: width / 2 + 100, y: height - 220 },
    { x: width / 2, y: height - 350 },
    { x: width / 2 - 50, y: height - 280 },
    { x: width / 2 + 50, y: height - 280 },
  ];

  fill(255, 0, 0); // Apple red
  for (let pos of applePositions) {
    ellipse(pos.x, pos.y, 30, 30); // 装饰画面苹果
  }
}

function displayStartScreen() {
  text("Click 'Start Game' to begin", width / 2, height / 2 - 100);
  startButton.show();
}

function startGame() {
  gameState = 'playing';
  gameTimer = 10;
  apples = []; // Reset apples for the game
  for (let i = 0; i < 10; i++) {
    apples.push(createApple());
  }
  startButton.hide();
}

function displayGame() {
  for (let apple of apples) {
    fill(255, 0, 0); // Red color for apples
    ellipse(apple.x, apple.y, apple.size, apple.size); // Display interactive apples
  }
  text(`Time left: ${gameTimer}`, width / 2, 30); // Display timer
}

function displayGameOverScreen(success) {
  let message = success ? "Success! You've harvested all apples!" : "OH NO! Time's up! Try again!";
  text(message, width / 2, height / 2);
  startButton.show();
}

function updateTimer() {
  if (frameCount % 60 == 0 && gameTimer > 0) {
    gameTimer--;
  }
  if (gameTimer === 0 && gameState === 'playing') {
    gameState = apples.length === 0 ? 'success' : 'gameover';
    if (gameState === 'gameover') {
      playFailSound();  // Ensure this is called when the game over condition is met
    } else if (gameState === 'success') {
      playSuccessSound();
    }
  }
}


function checkGameOutcome(gameResult) {
  if (gameResult === 'success') {
    playSuccessSound();
  } else if (gameResult === 'fail') {
    playFailSound();
  }
}

function successOsc() {
  let successOsc = new p5.Oscillator();
  successOsc.setType('sine');
  successOsc.freq(880); 
  successOsc.amp(0); 
}

function failOsc() {
  let failOsc = new p5.Oscillator();
  failOsc.setType('sine'); 
  failOsc.freq(440); 
  failOsc.amp(0); 
}

function playSuccessSound() {
  successOsc.amp(0.5, 0.1); 
  setTimeout(() => {
    successOsc.amp(0, 0.1); 
  }, 500);
}

function playFailSound() {
  failOsc.amp(0.5, 0.1); 
  setTimeout(() => {
    failOsc.amp(0, 0.1); 
  }, 500); 
}


function mousePressed() {
  if (gameState === 'playing') {
    for (let i = apples.length - 1; i >= 0; i--) {
      if (dist(mouseX, mouseY, apples[i].x, apples[i].y) < apples[i].size / 2) {
        playClickSound();
        apples.splice(i, 1); // 消除苹果
        break;
      }
    }
    if (apples.length === 0) {
      gameState = 'success';
      playSuccessSound();
    }
  }
}

function createApple() {
  // 在树的范围内产生苹果
  let minX = width / 2 - 120;
  let maxX = width / 2 + 120;
  let minY = height - 300;
  let maxY = height - 200;
  return {
    x: random(minX, maxX),
    y: random(minY, maxY),
    size: random(20, 40)
  };
}

function playClickSound() {
  osc.freq(random(100, 1200));
  osc.start();
  osc.amp(0.5, 0.1);
  setTimeout(() => osc.stop(), 100);
}

function stopOscillators() {
  successOsc.stop();
  failOsc.stop();
}
