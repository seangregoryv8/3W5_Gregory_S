let canvas = document.getElementById("main");
let context = canvas.getContext('2d');
canvas.height = 700;
canvas.width = 700;

let room = chooseNewRoom();

let character = new Character(canvas.width / 2, canvas.height / 2);
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

function chooseNewRoom()
{
    let newRoom = randomInt(1, 4);
    switch (newRoom)
    {
        case 1:
            return new Room("Ball");
        case 2:
            return new Room("Pressure");
        case 3:
            return new Room("Fly");
        // Purely in case
        case 4:
            return new Room("Fly");
    }
}
let gameOverWait = 0, gameOverColor = 102;
let alpha = 0, change = 0.02, textFade = 1.0;
let animate = () =>
{
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!welcome)
    {

    }
    else if (gameOver)
    {
        timer.draw();
        room.draw();
        character.color = "Red";
        character.draw();
        document.getElementById("artifact").innerHTML = "";
        document.getElementById("time").innerHTML = "";
        context.fillStyle = 'rgba(' + gameOverColor + ', 0, 0, ' + alpha + ')';
        context.fillRect(0, 0, canvas.width, canvas.height);
        document.body.style.backgroundColor = 'rgba(' + gameOverColor + ', ' + room.g + ', ' + room.b + ', ' + alpha + ')';
        room.g--;
        room.b--;
        //Fades to dark red
        if (alpha <= 1)
            alpha += change;
        //Waits a second and a half
        else if (gameOverWait <= fullSecond * 1.5)
            gameOverWait++;
        //Fades to black
        else if (gameOverColor >= 0)
            gameOverColor--;
        //Game over screen appears
        else
        {
            artifactContext.fillStyle = "Gray";
            let artifactText = "Artifacts"
            artifactContext.font = '24px Arial';
            artifactContext.fillText(artifactText, character.diameter + 3, character.radius)
        }
    }
    else
    {
        if (needToRedraw)
        {
            room = chooseNewRoom()
            needToRedraw = false;
            document.body.style.backgroundColor = 'rgba(' + room.r + ', ' + room.g + ', ' + room.b + ', 0.3)';
        }
        timer.draw();
        room.draw();
        character.update();
        document.getElementById("artifact").innerHTML = "Number of Artifacts: " + collectedArtifacts;
        document.getElementById("time").innerHTML = "Time left: " +  timer.minuteTen + ":" + timer.secondTen;
    }
}
animate();