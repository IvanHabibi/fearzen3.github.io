var canvas = document.getElementById("myCanvas");
var w = window.innerWidth;
var h = window.innerHeight;
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleHeight2 = 75;
var paddleWidth2 = 10;
var paddleX = (canvas.width-paddleWidth)/2;
var paddley = (canvas.height-paddleHeight2)/2;
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;
var speed = 10;
var canvas = document.getElementById('myCanvas');
var gameScore = document.getElementById('Score');
var randomH=Math.floor((Math.random() * h) + 1);
var randomW=Math.floor((Math.random() * w) + 1);
var score=0;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
    else if(e.keyCode == 38) {
        upPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
}



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddleBottom() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddleTop() {
    ctx.beginPath();
    ctx.rect(paddleX, 0, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddleLeft() {
    ctx.beginPath();
    ctx.rect(0, paddley, paddleWidth2, paddleHeight2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddleRight() {
    ctx.beginPath();
    ctx.rect(canvas.width-paddleWidth2  , paddley, paddleWidth2, paddleHeight2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function gameOver(){
  alert("GAME OVER \n Your Score : "+score);
  dx = -dx;
  dy = -dy;
  document.location.reload();
}

function draw() {




    if(randomH == canvas.width || randomH < 360){
      randomH=Math.floor((Math.random() * w) + 1);

    }else if(randomH > canvas.width){
      canvas.width = canvas.width+1;

    }else{
      canvas.width = canvas.width-1;
      if( paddleX+paddleWidth>=canvas.width){

        paddleX -=1;
      }

    }

    if(randomW == canvas.height || randomW < 200 || randomW > h){
      randomW=Math.floor((Math.random() * h) + 1);

    }else if(randomW > canvas.height){

      canvas.height = canvas.height+1;

    }else{
      if( paddley+paddleHeight2>=canvas.height){

        paddley -=1;
      }
      canvas.height = canvas.height-1;

    }



    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddleBottom();
    drawPaddleTop();
    drawPaddleLeft();
    drawPaddleRight();


    if( x + dx  < ballRadius){
      if(y > paddley && y < paddley + paddleHeight2) {
          dx = -dx;
          score +=100;
          gameScore.innerHTML= score;
      }else {
        gameOver();
      }
    }else if(x + dx > canvas.width-ballRadius ) {
      if(y > paddley && y < paddley + paddleHeight2) {
          dx = -dx;
          score +=100;
          gameScore.innerHTML= score;
      }  else {
        gameOver();
      }
    }


    if(y + dy < ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
          score +=100;
          gameScore.innerHTML= score;
      }else {
        gameOver();
      }
    } else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
          score +=100;
          gameScore.innerHTML= score;
      }else {
        gameOver();
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }


    if(downPressed && paddley < canvas.height-paddleHeight2) {
        paddley += 7;
    }
    else if(upPressed && paddley >0) {
        paddley -= 7;
    }

    x += dx;
    y += dy;
}

setInterval(draw, speed);
