var canvas = document.getElementById("canvas")
canvas.style.border = "solid 4px black"
var c = canvas.getContext("2d")

function Bouncer() {
    // set up circle location
    var x = canvas.width/2;
    var y = canvas.height/2;
    var r = 30;

    this.draw = function() {
      // fill in background rectangle
      c.fillStyle="white"
      c.fillRect(0, 0, canvas.width, canvas.height)

      // draw a circle
      c.beginPath()
      c.arc(x, y, r, 0, 2 * Math.PI)
      c.fillStyle="navy"
      c.fill()
      c.strokeStyle="lime"
      c.lineWidth = 5
      c.stroke()
    }

    var now = (new Date) / 1000;
    var h = 100
    var v = 100
    this.update = function() {
      var newNow = (new Date) / 1000
      var delta = newNow - now
      now = newNow
      
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

var ball = new Bouncer;
function update() {
    ball.update();
    ball.draw();
}
setTimeout(update, 20)
