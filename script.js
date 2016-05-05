var canvas = document.getElementById("canvas")
canvas.style.border = "solid 4px black"
var c = canvas.getContext("2d")

function randRange(min, max) {
    return min + Math.floor(Math.random() * (max+1 - min));
}

function randColor() {
    //   color like: rgb(255, 127, 20)
    return "rgb("
        + randRange(0,255) + ", " // red
        + randRange(0,255) + ", " // green
        + randRange(0,255) + ")"  // blue
}

function Bouncer() {
    // set up circle location
    var minR = 10
    var maxR = 50
    var r = randRange(minR, maxR)
    var x = randRange(r, canvas.width - r)
    var y = randRange(r, canvas.height - r)

    // random colors, too
    var fillColor = randColor()
    var strokeColor = randColor()
    var lineWidth = randRange(1,10)

    this.draw = function() {
      // draw a circle
      c.beginPath()
      c.arc(x, y, r, 0, 2 * Math.PI)
      c.fillStyle = fillColor
      c.fill()
      c.strokeStyle = strokeColor
      c.lineWidth = lineWidth
      c.stroke()
    }

    var h = randRange(10,500)
    var v = randRange(10,500)
    this.update = function(delta) {
      
      x = x + h*delta
      y += v*delta
      
      // new stuff starts here
      if (x < r) {
        x = r; h = -h
      }
      else if (x > canvas.width - r) {
        x = canvas.width - r; h = -h
      }
      
      if (y < r) {
        y = r; v = -v
      }
      else if (y > canvas.height - r) {
        y = canvas.height - r; v = -v;
      }
      // new stuff ends here
      
      setTimeout(update, 20)
    }
}

var balls = [ new Bouncer ];
var now = (new Date) / 1000;
function update() {
    // fill in background rectangle
    c.fillStyle="white"
    c.fillRect(0, 0, canvas.width, canvas.height)

    var newNow = (new Date) / 1000
    var delta = newNow - now
    now = newNow

    for (var i=0; i != balls.length; ++i) {
        var ball = balls[i];
        ball.update(delta);
        ball.draw();
    }
}

function addBall() {
    balls.push(new Bouncer)
}
setTimeout(update, 20)
addEventListener('click', addBall)
