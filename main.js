let canvas = document.getElementById("main");
let context = canvas.getContext('2d');
canvas.height = 700;
canvas.width = 700;
let character = new Character(canvas.width / 2, canvas.height / 2);
let r = randomInt(1, colorMax), g = randomInt(1, colorMax), b = randomInt(1, colorMax);
let room1 = new Room("Black", r, g, b);
r = randomInt(1, colorMax), g = randomInt(1, colorMax), b = randomInt(1, colorMax);
let room2 = new Room("Black", r, g, b);
document.body.style.backgroundColor = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.3)';

let timer = new Timer(10, 0);
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
    if (stopwatch % fullSecond == 0)
        timer.countDown(1);
}
animate();