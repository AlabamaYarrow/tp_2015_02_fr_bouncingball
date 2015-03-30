var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');

var startTime, animationTime, length, direction;

var V01 = 0, V0 = 0; //px per second
var V = 0; //px per second
var g = 500; //px per second per second

var img = new Image();
img.src = 'rainbow.jpg';
var pattern;
img.onload = function() {
  pattern = context.createPattern(img, 'repeat');  
  context.fillStyle = '#3366FF';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = pattern;
  context.lineWidth = 1;
  context.strokeStyle = '#FFFFFF';
  drawCirle(x, y0);
  
  g = prompt('Gravity on your planet (10..2000 px/s^2):');
  V01 = prompt('Throw speed (100..2000 px/s^2):');
}

var radius = 100;
var x = canvas.width / 2;
var y;
var y0 = radius;


direction = 'down';


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
  startTime = new Date().getTime(); 
  if (direction == 'down') {	
	 V0 = 0;
	 animate(); 
  }
  else {	  	 
	 V0 = V01;
	 animateUp();
  }
}

function animate () {
  context.fillStyle = '#3366FF';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = pattern;
  var time = new Date().getTime();
  var shiftTime = time - startTime;
  
  V = V0 + 0.001 * shiftTime * g; //px per second
  y = y0 + V0 * (0.001 * shiftTime) + 0.5*g*Math.pow(0.001 * shiftTime, 2);
  
  if (y > canvas.height - radius) {
  	y = canvas.height - radius;
  	drawCirle(x,y);	 
  	startTime = new Date().getTime();
  	y0 = y; 
  	V0 = V * 0.7;
  	if ( V0 < 50) {	
		console.log(V0 + ' ' + V);
  		direction = 'up';
  		y0 = (canvas.height - radius - context.lineWidth / 2); 
  		canvas.addEventListener('click', checkPosition);
  		return;	
  	}
  	animateUp();
  	return;
  }
  drawCirle(x,y);  
  requestAnimationFrame(animate);
}

function animateUp () {  
  context.fillStyle = '#3366FF';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = pattern;
  var time = new Date().getTime();
  var shiftTime = time - startTime;
    
  V = V0 - (shiftTime * 0.001) * g;
  y = y0 - V0 * (0.001 * shiftTime) + 0.5*g*Math.pow(0.001 * shiftTime, 2);
  
  if (y < radius) {
  	y = radius;
  	drawCirle(x,y);	 
  	startTime = new Date().getTime();
  	y0 = y; 
  	V0 = V * 0.7;  	
  	animate();
  	return;
  }
  
  if (V < 0) {
  	drawCirle(x,y);
  	startTime = new Date().getTime();
  	y0 = y;
	V0 = 0;
  	animate();
  	return;	
  }    
  drawCirle(x,y);  
  requestAnimationFrame(animateUp);
}

function drawCirle(x,y) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
  context.stroke();
}
