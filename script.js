var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);
}

function moveEverything(){
    ballX += ballSpeedX;
    ballSpeedX += .01
    if (ballX >= canvas.width) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX <= 0) {
        ballSpeedX = -ballSpeedX;
    }
}

function drawEverything() {
    colorRect(0, 0, canvas.width,canvas.height, 'black'); // draw background
    colorRect(20, 200, 10, 100, 'white'); // draw paddle
    colorCircle(ballX, 150, 10, 'white'); // draw ball
}

// Creates circles
function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

// Creates rectangles
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}