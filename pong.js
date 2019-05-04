//game properties
var gameWidth = 750;
var gameHeight = 600;
var isGameStarted = false;
var isGameOver = false;
var isRoundOver;
var isFatalCollision;
var lives = 3;
var score = 0;

//ball properties
var xBall;
var yBall;
var diameter;
var xBallChange;
var yBallChange;

// paddle properties

var xPaddle;
var yPaddle;
var paddleWidth;
var paddleHeight;

function setup() {
  createCanvas(gameWidth, gameHeight);
}

function draw() {
  background(220);

  if (!isGameStarted) {
    intializeGame();
  }

  //draw lives
  fill(255, 0, 0);
  textSize(30);
  text("Lives: " + lives, 10, 30);

  //draw score
  fill(0, 255, 255);
  textSize(30);
  text("Score: " + score, gameWidth - 140, 30);

  if (!isFatalCollision) {
    detectCollision();
  }
  
  //ball movement
  yBall += yBallChange;
  xBall += xBallChange;
 
  //draw ball at current spot
  drawBall(xBall, yBall, diameter);
  
  //draw the rectangle at the given spot
  drawRectangle(xPaddle, yPaddle, paddleWidth, paddleHeight);

  detectRoundOver();

  if (isGameOver) {

  } else if (isRoundOver) {
    restartRound();
  }
}

//initialize the state of a new game or round
function intializeGame() {
  console.log("intializeGame");
  xBallChange = 5;
  yBallChange = 5;

  xBall = (Math.floor(Math.random() * 300) + 50);
  yBall = 50;
  diameter = 50;   
  drawBall(xBall, yBall, diameter);

  paddleWidth = 100;
  paddleHeight = 25;
  xPaddle = gameWidth / 2 - paddleWidth / 2;
  yPaddle = gameHeight - paddleHeight - 5;
  drawRectangle(xPaddle, yPaddle, paddleWidth, paddleHeight);

  isGameOver = false;
  isRoundOver = false;
  isFatalCollision = false;
  isGameStarted = true;
}

function drawBall(x, y, d) {
  //sets color
  fill(255, 0, 255);
  //prevents the ball from having an outline
  noStroke();
  //places the ball at x,y with a size of w,h
  ellipse(x, y, d, d);
}

function drawRectangle(x, y, w, h) {
  fill(0, 255, 255);
  noStroke();
  rect(x, y, w, h);
}

//detects if the ball collides with a wall or the paddle
function detectCollision() {
  //detects collision with top wall
  if (yBall < diameter / 2 || yBall > gameHeight - diameter / 2) {
    yBallChange *= -1;
    
    //detects collisions with either side wall
  } else if (xBall < diameter / 2 || xBall > gameWidth - diameter / 2) {
    xBallChange *= -1;

    //detects collsion with paddle
  } else if (yBall >= (yPaddle - diameter / 2) && (xBall > xPaddle && (xBall  < xPaddle + paddleWidth))) {
    yBallChange *= -1;
    score++;

    //TODO: fix this so that it doesnt just stop the game from working when it hits the side
    //checks if it hit the side of the paddle so that it doesnt just float through the paddle
    //and hit the bottom.
  } else if (yBall >= (yPaddle - diameter / 2) && (xBall > xPaddle - diameter /2 && (xBall  < xPaddle + paddleWidth + diameter /2))) {
    xBallChange *= -1;
    isFatalCollision = true;
  }
}

//detects if the ball hit the bottom wall
//changes the round state to over
function detectRoundOver() {
  if (yBall + diameter / 2 > gameHeight) {
    isRoundOver = true;
  }
}

//moves the paddle left or right based off of key movements
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if(xPaddle < 50) {
      xPaddle = 0;
    } else {
      xPaddle -= 50;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (xPaddle > gameWidth - paddleWidth - 50) {
      xPaddle = gameWidth - paddleWidth;
    } else {
      xPaddle += 50;
    }
  }
}

//restart the round through initialize game and take away a life
//if the player is out of lives, change the isGameOver state to true
function restartRound() {
  if (lives === 0){
    isGameOver = true;
  } else {
    lives--;
    intializeGame();
  }
}

