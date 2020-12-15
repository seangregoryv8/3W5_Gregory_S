let canvas = document.getElementById("main");
let context = canvas.getContext('2d');
canvas.height = 700;
canvas.width = 700;
canvas.textAlign = "center";

let rooms = [];
rooms[0] = new Room("Fly");
rooms[1] = new Room("Ball");
rooms[2] = new Room("Pressure");

let character = new Character(canvas.width / 2, canvas.height / 2);
respawnPointX = canvas.width / 2;
respawnPointY = canvas.height / 2;

let r = randomInt(1, colorMax), g = randomInt(1, colorMax), b = randomInt(1, colorMax);
let timer = new Timer(10, 0);

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
    if (needToRedraw)
    {
        for (let i = 0; i < rooms.length; i++)
            if (rooms[i].complete == false)
                currentRoom = i;
        needToRedraw = false;
        document.body.style.backgroundColor = 'rgba(' + rooms[currentRoom].r + ', ' + rooms[currentRoom].g + ', ' + rooms[currentRoom].b + ', 0.3)';
    }
    timer.draw();
    rooms[currentRoom].draw();
    character.update();
    document.getElementById("time").innerHTML = "Time left: " +  timer.minuteTen + ":" + timer.secondTen;
}
animate();