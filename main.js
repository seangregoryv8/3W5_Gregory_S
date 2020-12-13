let canvas = document.getElementById("main");
let context = canvas.getContext('2d');
canvas.height = 700;
canvas.width = 700;

const roomdirections = ["top", "left", "right", "bottom"];
let character = new Character(canvas.width / 2, canvas.height / 2);
let room1 = new Room("Black", randomInt(1, 256), randomInt(1, 256), randomInt(1, 256));

class Timer {
    constructor(minutes, seconds) {
        this.minutes = minutes;
        this.seconds = seconds;
    }
    draw() {
        if (this.seconds == -1)
        {
            this.minutes--;
            this.seconds = 59;
        }
        let minuteTen = (this.minutes < 10) ? "0" + this.minutes : this.minutes;
        let secondTen = (this.seconds < 10) ? "0" + this.seconds : this.seconds;
        document.getElementById("time").innerHTML = "Time left: " +  minuteTen + ":" + secondTen;
    }
    countDown = seconds => {
        this.seconds -= seconds;
        this.draw();
    }
}
let timer = new Timer(10, 0);
document.body.style.backgroundColor = 'rgba(233, 210, 153, 0.3)';
var stopwatch = 0;

document.onkeydown = e => {
    switch (e.keyCode) {
        case 37:
            character.turn(0, -2);
            break;
        case 38:
            character.turn(1, -2);
            break;
        case 39:
            character.turn(0, 2);
            break;
        case 40:
            character.turn(1, 2);
            break;
        case 16:
            //character.run = 2;
            break;
    }
};
document.onkeyup = e => {
    switch (e.keyCode) {
        case 37:
            character.speedX = 0;
            break;
        case 38:
            character.speedY = 0;
            break;
        case 39:
            character.speedX = 0;
            break;
        case 40:
            character.speedY = 0;
            break;
        case 16:
            //character.run = 0;
            break;
    }
};

let animate = () => {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    room1.draw();
    character.update();
    stopwatch++;
    if (stopwatch % 80 == 0)
        timer.countDown(1);
}
animate();