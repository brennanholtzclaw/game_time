/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');
	var Hole = __webpack_require__(1);
	var Ball = __webpack_require__(2);
	var Bumper = __webpack_require__(3);

	var golfBall = new Ball(100, 400, 6, context);
	var obstacleOne = new Bumper(50, 50, 250, 60, context);
	var obstacleTwo = new Bumper(50, 450, 250, 460, context);
	var obstacleThree = new Bumper(50, 50, 60, 450, context);
	var obstacleFour = new Bumper(250, 50, 260, 460, context);
	var bumperOne = new Bumper(150, 170, 155, 220, context, "blue");
	var obstacles = [obstacleOne, obstacleTwo, obstacleThree, obstacleFour, bumperOne];
	var puttHole = new Hole(150, 100, context);

	requestAnimationFrame(function gameLoop() {
	  context.beginPath();
	  // context.clearRect(0, 0, canvas.width, canvas.height);
	  context.closePath();
	  puttHole.draw();
	  golfBall.draw();
	  golfBall.holeCheck(puttHole);
	  if (golfBall.moving) {
	    golfBall.move();
	  }
	  requestAnimationFrame(gameLoop);
	  obstacles.forEach(function (obstacle) {
	    obstacle.draw();
	  });
	});

	canvas.addEventListener('mousedown', function (event) {
	  var that = this;
	  var mousePos = getMousePosition(that, event);
	  moveBall(mousePos);
	  console.log(mousePos);
	}, false);

	function getMousePosition(that, event) {
	  var rec = that.getBoundingClientRect();

	  clubToBallSlope({ x: event.clientX - rec.left,
	    y: event.clientY - rec.top
	  });

	  return {
	    x: event.clientX - rec.left,
	    y: event.clientY - rec.top
	  };
	}

	function clubToBallSlope(input) {
	  var ballX = golfBall.x;
	  var ballY = golfBall.y;

	  var clubX = input.x;
	  var clubY = input.y;

	  // var rise = ballY - clubY;
	  // var run = ballX - clubX;
	  var rise = clubY - ballY;
	  var run = clubX - ballX;

	  var slope = rise / run;

	  var ballXSpeed = run * -1;
	  var ballYSpeed = rise * -1;
	  // var ballXSpeed = (slope * Math.cos(slope));
	  // var ballYSpeed = (slope * Math.sin(slope));
	  var squareOfXs = Math.pow(clubX - ballX, 2);
	  var squareOfYs = Math.pow(clubY - ballY, 2);
	  var clubDistance = Math.sqrt(squareOfXs + squareOfYs);

	  if (ballXSpeed > 10) {
	    ballXSpeed = 10;
	  } else if (ballXSpeed < -10) {
	    ballXSpeed = -10;
	  }
	  if (ballYSpeed > 10) {
	    ballYSpeed = 10;
	  } else if (ballYSpeed < -10) {
	    ballYSpeed = -10;
	  }

	  golfBall.xSpeed = ballXSpeed * (clubDistance / 100);
	  golfBall.ySpeed = ballYSpeed * (clubDistance / 100);

	  // golfBall.xSpeed = ballXSpeed;
	  // golfBall.ySpeed = ballYSpeed;

	  // console.warn({speedX: ballXSpeed, speedY: ballYSpeed, dist: clubDistance, bothSlope: slope})
	  console.warn({ mousx: clubX, mousy: clubY, ballx: golfBall.x, bally: golfBall.y, bothSlope: slope, speedX: ballXSpeed, speedY: ballYSpeed });
	};

	function moveBall(mousePos) {
	  // debugger
	  // if(mousePos.x <= golfBall.x + golfBall.radius && mousePos.x >= golfBall.x - golfBall.radius && mousePos.y <= golfBall.y + golfBall.radius && mousePos.y >= golfBall.y - golfBall.radius)
	  golfBall.moving = true;
	}

	module.exports = Ball;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var Hole = function Hole(x, y, context) {
	    this.context = context;
	    this.x = x;
	    this.y = y;
	    this.radius = 10;
	    this.startAngle = 0;
	    this.endAngle = Math.PI * 2;
	    this.color = 'black';
	};

	Hole.prototype.draw = function () {
	    this.context.beginPath();
	    this.context.fillStyle = this.color;
	    this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
	    this.context.closePath();
	    this.context.fill();
	};

	module.exports = Hole;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var Ball = function Ball(x, y, radius, context) {
	  this.x = x;
	  this.y = y;
	  this.radius = radius || 10;
	  this.startAngle = 0;
	  this.moving = false;
	  this.endAngle = Math.PI * 2;
	  this.context = context;
	  this.xSpeed = 5;
	  this.ySpeed = 5;
	  this.xDirection = 1;
	  this.yDirection = 1;
	};

	Ball.prototype.draw = function () {
	  this.context.beginPath();
	  this.context.fillStyle = "white";
	  this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
	  this.context.closePath();
	  this.context.fill();
	  return this;
	};

	Ball.prototype.move = function () {
	  this.bounceCheck();

	  this.x = this.x + this.xSpeed * this.xDirection;
	  this.y = this.y + this.ySpeed * this.yDirection;

	  // this.xSpeed  -= 0.01
	  // this.ySpeed  -= 0.01
	  this.xSpeed *= 0.989;
	  this.ySpeed *= 0.989;
	  this.stopCheck();

	  return this;
	};

	Ball.prototype.stopCheck = function () {
	  if (Math.abs(this.xSpeed) < 0.01 && Math.abs(this.ySpeed) < 0.01) {
	    this.xSpeed = 5;
	    this.ySpeed = 5;
	    this.moving = false;
	  }
	};

	var obstacleCoords = [[50, 50, 250, 60], [50, 450, 250, 460], [50, 50, 60, 450], [250, 50, 260, 460], [150, 170, 155, 220]];

	Ball.prototype.holeCheck = function (puttHole) {
	  if (Math.abs(puttHole.x - this.x) < puttHole.radius + this.radius && Math.abs(puttHole.y - this.y) < puttHole.radius + this.radius) {
	    this.x = puttHole.x;
	    this.y = puttHole.y;
	    this.moving = false;
	  }
	};

	Ball.prototype.bounceCheck = function () {
	  obstacleCoords.forEach(function (obstacle, index) {
	    var xMin = obstacle[0];
	    var yMin = obstacle[1];
	    var xMax = obstacle[2];
	    var yMax = obstacle[3];
	    if (this.y + this.radius >= yMin && this.y - this.radius <= yMax && this.x + this.radius >= xMin && this.x - this.radius <= xMax) {

	      var prevX = this.x - this.xSpeed * this.xDirection;
	      var prevY = this.y - this.ySpeed * this.yDirection;
	      // var prevX = this.x - this.speed * this.xDirection;
	      // var prevY = this.y - this.speed * this.yDirection;

	      if (this.changeXDirection(xMin, xMax, prevX, this)) {
	        this.xDirection *= -1;
	      }
	      if (this.changeYDirection(yMin, yMax, prevY, this)) {
	        this.yDirection *= -1;
	      }
	      this.xSpeed *= 0.8;
	      this.ySpeed *= 0.8;
	      // this.speed *= 0.8;
	    }
	  }, this);
	  return this;
	};

	Ball.prototype.changeXDirection = function (xMin, xMax, prevX, that) {
	  return prevX - that.radius > xMax && that.x - that.radius <= xMax || // check for collision in x direction on right
	  prevX + that.radius < xMin && that.x + that.radius >= xMin; // check for collision in x direction on left
	};

	Ball.prototype.changeYDirection = function (yMin, yMax, prevY, that) {
	  return prevY - that.radius > yMax && that.y - that.radius <= yMax || // check for collision in y direction on bottom
	  prevY + that.radius < yMin && that.y + that.radius >= yMin; // check for collision in y direction on top
	};

	module.exports = Ball;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function Bumper(minX, minY, maxX, maxY, context, color) {
	  this.minX = minX;
	  this.maxX = maxX;
	  this.minY = minY;
	  this.maxY = maxY;
	  this.context = context;
	  this.color = color || "white";
	};

	Bumper.prototype.draw = function () {
	  this.context.fillStyle = this.color;
	  this.context.fillRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY);
	  return this;
	};

	module.exports = Bumper;

/***/ }
/******/ ]);