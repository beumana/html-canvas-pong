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
    if (ballX >= canvas.width - 20) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX <= 0) {
        ballSpeedX = -ballSpeedX;
    }
}

function drawEverything() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0,canvas.width,canvas.height);

    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(20,200,10,100);

    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(ballX,100,20,20);
}