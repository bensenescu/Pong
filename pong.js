class Pong {
  constructor(gameWidth, gameHeight, xBallSpeed, yBallSpeed, lives, score) {
    //console.log("constructor")
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.lives = lives;
    this.score = score;

    //console.log("score:" + this.score)
    this.xBallChange = xBallSpeed;
    this.yBallChange = yBallSpeed;

    this.xBall = (Math.floor(Math.random() * 300) + 50);
    this.yBall = 50;
    this.diameter = 50;   
  
    this.paddleWidth = 100;
    this.paddleHeight = 25;
    this.xPaddle = gameWidth / 2 - this.paddleWidth / 2;
    this.yPaddle = gameHeight - this.paddleHeight - 5;

    this.isGameOver = false;
    this.isRoundOver = false;
    this.isFatalCollision = false;
    this.isGameStarted = true; 
  }

  playPong() {    
    //console.log("playPong")
    //draw lives
    fill(255, 0, 0);
    textSize(30);
    text("Lives: " + this.lives, 10, 30);

    //draw score
    fill(0, 255, 255);
    textSize(30);
    text("Score: " + this.score, this.gameWidth - 140, 30);

    if (!this.isFatalCollision) {
      this.detectCollision();
    }
  
    //ball movement
    this.yBall += this.yBallChange;
    this.xBall += this.xBallChange;
 
    //draw ball at current spot
    this.drawBall(this.xBall, this.yBall, this.diameter);
  
    //draw the rectangle at the given spot
    this.drawRectangle(this.xPaddle, this.yPaddle, 
      this.paddleWidth, this.paddleHeight);

    this.detectRoundOver();

    //console.log(this.isRoundOver)
    if (this.isRoundOver) {
      console.log("isRoundOver was true")
      this.restartRound();
    }
  }

  drawBall(x, y, d) {
    //console.log("drawBall")
    //sets color
    fill(255, 0, 255);
    //prevents the ball from having an outline
    noStroke();
    //places the ball at x,y with a size of w,h
    ellipse(x, y, d, d);
  } 

  drawRectangle(x, y, w, h) {
    //console.log("drawRect")
    fill(0, 255, 255);
    noStroke();
    rect(x, y, w, h);
  }

  //detects if the ball collides with a wall or the paddle
  detectCollision() {
    //console.log("detectCollision")
    //detects collision with top wall
    if (this.yBall < this.diameter / 2 
      || this.yBall > this.gameHeight - this.diameter / 2) {
        this.yBallChange *= -1;
    
      //detects collisions with either side wall
    } else if (this.xBall < this.diameter / 2 
      || this.xBall > this.gameWidth - this.diameter / 2) {
        this.xBallChange *= -1;

      //detects collsion with paddle
    } else if (this.yBall >= (this.yPaddle - this.diameter / 2) 
      && (this.xBall > this.xPaddle 
        && (this.xBall  < this.xPaddle + this.paddleWidth))) {
          this.yBallChange *= -1;
          this.score++;

      //TODO: fix this so that it doesnt just stop the game from working when it hits the side
      //checks if it hit the side of the paddle so that it doesnt just float through the paddle
      //and hit the bottom.
    } else if (this.yBall >= (this.yPaddle - this.diameter / 2) 
      && (this.xBall > this.xPaddle - this.diameter /2 
        && (this.xBall  < this.xPaddle + this.paddleWidth + this.diameter /2))) {
      this.xBallChange *= -1;
      this.isFatalCollision = true;
    }
  } 

  //detects if the ball hit the bottom wall
  //changes the round state to over
  detectRoundOver() {
    //console.log("detectRoundOver")
    if (this.yBall + this.diameter / 2 > this.gameHeight) {
      this.isRoundOver = true;
    }
  }

  //moves the paddle left or right based off of key movements
  movePaddle(keyCode) {
    //console.log("movePaddle")
    if (keyCode === LEFT_ARROW) {
      if(this.xPaddle < 50) {
        this.xPaddle = 0;
      } else {
        this.xPaddle -= 50;
      }
    } else if (keyCode === RIGHT_ARROW) {
      if (this.xPaddle > this.gameWidth - this.paddleWidth - 50) {
        this.xPaddle = this.gameWidth - this.paddleWidth;
      } else {
        this.xPaddle += 50;
      }
    }
  }

  //restart the round through initialize game and take away a life
  //if the player is out of lives, change the isGameOver state to true
  restartRound() {
    console.log("restartRound")
    if (this.lives === 0){
      this.isGameOver = true;
    } else {
      this.lives--;
  
      //reset speeds
      this.xBallChange = Math.abs(this.xBallChange);
      this.yBallChange = Math.abs(this.yBallChange);

      //reset ball position
      this.xBall = (Math.floor(Math.random() * 300) + 50);
      this.yBall = 50; 

      //reset paddle position
      this.xPaddle = this.gameWidth / 2 - this.paddleWidth / 2;
      this.yPaddle = this.gameHeight - this.paddleHeight - 5;

      //reset game states
      this.isRoundOver = false;
      this.isFatalCollision = false; 
    }
  }

  getIsGameOver() {
    return this.isGameOver;
  }

  getScore() {
    return this.score;
  }
}