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
        startButton = createButton('Start Game!');
        startButton.position(gameWidth / 2, gameHeight /2);
        startButton.mousePressed(startGame);
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