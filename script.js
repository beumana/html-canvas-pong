var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 14;
var ballSpeedY = 6;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

var player1Score = 0;
var player2Score = 0;

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

function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2
}

function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY - 35) {
        paddle2Y += 10;
    } else if (paddle2YCenter > ballY + 35){
        paddle2Y -= 10;
    }
}

function moveEverything(){
    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX >= canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
            player1Score += 1;
        }
    } else if (ballX <= 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
            player2Score += 1;
        }
    }

    if (ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    } else if (ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawEverything() {
    colorRect(0, 0, canvas.width,canvas.height, 'black'); // draw background
    
    colorRect(20, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white'); // left player paddle

    colorRect(canvas.width - 30, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white'); // right computer paddle
    
    colorCircle(ballX, ballY, 10, 'white'); // draw ball

    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width-100, 100)
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