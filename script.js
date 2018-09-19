var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
const PADDLE_HEIGHT = 100;

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', 
        function(evt){
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
        })
}

function moveEverything(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    ballSpeedX += .03;
    ballSpeedY += .03;

    if (ballX >= canvas.width) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX <= 0) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    } else if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawEverything() {
    colorRect(0, 0, canvas.width,canvas.height, 'black'); // draw background
    
    colorRect(20, paddle1Y, 10, PADDLE_HEIGHT, 'white'); // draw paddle
    
    colorCircle(ballX, ballY, 10, 'white'); // draw ball
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