var gameWidth = 750;
var gameHeight = 600;
var isGameStarted = false;
var pong;


function setup() {
    createCanvas(gameWidth, gameHeight);
}

function draw() {
    background(220);
    if (!isGameStarted) {
        createWelcomeScreen();
    } else if (pong.getIsGameOver()) {
        fill(255, 0, 0);
        textSize(60);
        text("Game Over!", gameWidth / 2 - 175, gameHeight / 2);
        
        fill(0, 255, 255);
        textSize(40);
        text("Score: " + pong.getScore(), gameWidth / 2 - 90, gameHeight / 2 + 40);
    } else {
        pong.playPong();
    }
}

function keyPressed() {
    pong.movePaddle(keyCode);
}

function startGame() {
    startButton.hide();
    pong = new Pong(gameWidth, gameHeight, 5, 5, 3, 0);
    isGameStarted = true;
}

function createWelcomeScreen() {
    fill(0);
    textSize(60);
    textAlign(CENTER);
    text("Welcome to my game!", gameWidth / 2 - 175, gameHeight / 2 - 200, 350, 300);
    createStartButton();
}

function createStartButton() {
    //create start game button
    fill(0, 128, 0);
    //noStroke();
    rect(gameWidth / 2 - 75, gameHeight/ 2 - 25, 150, 30);
    fill(0);
    textSize(24);
    text("Start Game!", gameWidth / 2, gameHeight / 2);
    textAlign(LEFT);
}

function mousePressed() {
    if (mouseX > gameWidth / 2 - 75 && mouseX < gameWidth / 2 + 75
        && mouseY > gameHeight / 2 - 25  && mouseY < gameHeight / 2 + 25) {
            pong = new Pong(gameWidth, gameHeight, 5, 5,3, 0);
            isGameStarted = true;
        }
}
