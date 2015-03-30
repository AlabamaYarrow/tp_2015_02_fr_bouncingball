var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');

var startTime, animationTime, length, directon;

var img = new Image();
img.src = 'rainbow.jpg';
var pattern = context.createPattern(img, 'repeat');

context.fillStyle = '#3366FF';
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = pattern;
context.lineWidth = 1;
context.strokeStyle = '#FFFFFF';

var radius = 100;
var x = canvas.width / 2;
var y0 = (canvas.height - radius - context.lineWidth / 2);
var y;

img.onload = function () {
  drawCirle(x, y0);
}

canvas.addEventListener('click', checkPosition);

function checkPosition(event) {  
  if (event.clientX < x + radius && 
      event.clientX > x - radius && 
      event.clientY < y0 + radius && 
      event.clientY > y0 - radius)
    startAnimation();
}

function startAnimation() {
  canvas.removeEventListener('click', checkPosition);
  y0 = (canvas.height - radius - context.lineWidth / 2);
  //console.log('start from' + y0 );
  length = y0 - radius;
  animationTime = 300; 
  startTime = new Date().getTime();
  directon = 'up';
  animate(); 
}

function animate () {
  context.fillStyle = '#3366FF';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = pattern;
  var time = new Date().getTime();
  var shiftTime = time - startTime;
  var multiply = shiftTime / animationTime;
  if (directon == 'up')
    y = y0 - length * multiply;
  else {
    y = y0 + length * multiply;    
  }
  //console.log(directon + ' , Y: ' + y);
  drawCirle(x,y);

  if (multiply < 1) {
    requestAnimationFrame(animate);
  } else {
    startTime = new Date().getTime();
    y0 = y;
    if(directon == 'down') {      
      length *= 0.7;
      animationTime *= 0.9;      
      if (length < 10) {
        canvas.addEventListener('click', checkPosition);
        return;      
      }
      directon = 'up';
    }
    else
      directon = 'down'; 
    animate();
  }
}

function drawCirle(x,y) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
  context.stroke();
}