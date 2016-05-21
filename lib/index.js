var $ = require('./jquery')
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var Hole = require('./hole')
var Ball = require("./ball");
var Bumper = require("./bumper");
var getPlayerName = require('./get_player_name');
var getBallColor = require('./get_ball_color');
var player = require('./player');

$(document).ready(function() {

    $(".a-ball-color").on('click', function(ev) {
        ev.prventDefault;

        var playerName = getPlayerName();
        var ballColor = ev.currentTarget.id;
        player = sessionStorage
        player.setItem('name', playerName) //sets player name to a session
        player.setItem('ballColor', ballColor) //sets player ball color to session

        var golfBall = new Ball(100, 100, 6, context, player['ballColor']);
        var obstacleOne = new Bumper(50, 50, 250, 60, context);
        var obstacleTwo = new Bumper(50, 450, 250, 460, context);
        var obstacleThree = new Bumper(50, 50, 60, 450, context);
        var obstacleFour = new Bumper(250, 50, 260, 460, context);
        var bumperOne = new Bumper(150, 170, 155, 220, context, "blue");
        var obstacles = [obstacleOne, obstacleTwo, obstacleThree, obstacleFour, bumperOne]
        var puttHole = new Hole(context, 150, 100)

        requestAnimationFrame(function gameLoop() {
            context.beginPath();
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.closePath();
            puttHole.draw();
            golfBall.draw();
            golfBall.holeCheck(puttHole)
            if(golfBall.moving) {
                golfBall.move()
            }
            requestAnimationFrame(gameLoop);
            obstacles.forEach(function(obstacle) { obstacle.draw();})
        });

        canvas.addEventListener('mousedown', function(event) {
            var that = this
            var mousePos = getMousePosition(that, event)
            moveBall(mousePos)
            console.log(mousePos)
        }
    , false)

function getMousePosition(that, event) {
    var rec = that.getBoundingClientRect();

    clubToBallSlope({x: event.clientX - rec.left,
                    y: event.clientY - rec.top
    });

    return {
        x: event.clientX - rec.left,
        y: event.clientY - rec.top
    };
}

function clubToBallSlope(input) {
    var ballX = golfBall.x
    var ballY = golfBall.y

    var clubX = input.x
    var clubY = input.y

    // var rise = ballY - clubY;
    // var run = ballX - clubX;
    var rise = clubY - ballY;
    var run = clubX - ballX

    var slope = rise / run

    var ballXSpeed = run * -1
    var ballYSpeed = rise * -1
    // var ballXSpeed = (slope * Math.cos(slope));
    // var ballYSpeed = (slope * Math.sin(slope));
    var squareOfXs = Math.pow((clubX - ballX), 2)
    var squareOfYs = Math.pow((clubY - ballY), 2)
    var clubDistance = Math.sqrt(squareOfXs + squareOfYs)

    if (ballXSpeed > 10) {
        ballXSpeed = 10;
    }
    else if (ballXSpeed < -10) {
        ballXSpeed = -10;
    }
    if (ballYSpeed > 10) {
        ballYSpeed = 10;
    }
    else if (ballYSpeed < -10) {
        ballYSpeed = -10;
    }

    golfBall.xSpeed = ballXSpeed * (clubDistance / 100);
    golfBall.ySpeed = ballYSpeed * (clubDistance / 100);

    // golfBall.xSpeed = ballXSpeed;
    // golfBall.ySpeed = ballYSpeed;

    // console.warn({speedX: ballXSpeed, speedY: ballYSpeed, dist: clubDistance, bothSlope: slope})
    console.warn({mousx: clubX, mousy: clubY, ballx: golfBall.x, bally: golfBall.y, bothSlope: slope, speedX: ballXSpeed, speedY: ballYSpeed})
};

function moveBall(mousePos) {
    // debugger
    // if(mousePos.x <= golfBall.x + golfBall.radius && mousePos.x >= golfBall.x - golfBall.radius && mousePos.y <= golfBall.y + golfBall.radius && mousePos.y >= golfBall.y - golfBall.radius)
    golfBall.moving = true
}
    })
})

module.exports = Ball

