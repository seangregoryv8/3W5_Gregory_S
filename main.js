let canvas = document.getElementById("main");
let context = canvas.getContext('2d');
canvas.height = 700;
canvas.width = 700;

let room = chooseNewRoom();
let ambiancePlaying = false;
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

//Associated with the game over screen
let wait = 0, color = 102;
let tryAgain = false;
let alpha = 0, change = 0.02;
let stage = "fadeRed";
let winStage = "nothing";

let animate = () =>
{
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!welcome)
    {

    }
    else if (gameOver)
    {
        if (stage != "playAgain")
        {
            ambianceAudio.pause();
            timer.draw();
            room.draw();
            character.color = "Red";
            character.draw();
            document.getElementById("time").innerHTML = "";
            document.body.style.backgroundColor = 'rgba(' + color + ', ' + room.g + ', ' + room.b + ', ' + alpha + ')';
            room.g--;
            room.b--;
        }
        context.fillStyle = 'rgba(' + color + ', 0, 0, ' + alpha + ')';
        context.fillRect(0, 0, canvas.width, canvas.height);
        switch (stage)
        {
            case "fadeRed":
                if (alpha >= 1)
                    stage = "firstWait"
                else
                    alpha += change;
                break;
            case "firstWait":
                if (wait >= fullSecond * 1.5) stage = "fadeBlack"
                else wait++;
                break;
            case "fadeBlack":
                if (color <= 0) {
                    stage = "secondWait";
                    wait = 0;
                }
                else color--;
                break;
            case "secondWait":
                if (wait >= fullSecond * 2.5) stage = "yiruma"
                else wait++;
            case "yiruma":
                currentAudio = new Audio("Sound_effects/GameOver.mp3")
                currentAudio.play();
                stage = "playAgain";
            case "playAgain":
                context.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
                context.fillStyle = "DarkRed";
                let deathText = "Unfortunate fate, you can never escape...";
                context.font = '30px Courier New';
                context.fillText(deathText, 10, canvas.width / 2)
                document.getElementById("tryAgain").style.visibility = "visible";
        }
    }
    else
    {
        if (!ambiancePlaying)
        {
            ambianceAudio = new Audio('Sound_effects/Ambiance.mp3');
            ambianceAudio.play();
            ambiancePlaying = true;
        }
        if (needToRedraw)
        {
            if (collectedArtifacts >= 2)
            {
                room = new Room("End");
                document.body.style.backgroundColor = 'rgba(' + room.r + ', ' + room.g + ', ' + room.b + ', 0.3)';
                winStage = "emptyRoom";
            }
            else
            {
                room = chooseNewRoom()
                needToRedraw = false;
                document.body.style.backgroundColor = 'rgba(' + room.r + ', ' + room.g + ', ' + room.b + ', 0.3)';
            }
            needToRedraw = false;
        }
        if (collectedArtifacts >= 2)
        {
            room.artifacts = [];
            ambianceAudio.pause();
            switch (winStage)
            {
                case "emptyRoom":
                    for (let i = 0; i < 4; i++)
                        room.walls[i].ImpassibleWall();
                    winStage = "waitFourSeconds"
                    break;
                case "waitFourSeconds":
                    if (endCounter >= fullSecond * 2.5) winStage = "showRoom"
                    else endCounter++;
                    break;
                case "showRoom":
                    room.walls[0].changeColor
                    break;
            }
        }
        else
            timer.draw();
        room.draw();
        character.update();
        document.getElementById("time").innerHTML = "Time left: " +  timer.minuteTen + ":" + timer.secondTen;
    }
}

function TryAgain()
{
    color = 102;
    tryAgain = false;
    alpha = 0;
    document.getElementById("tryAgain").style.visibility = "hidden";
    currentAudio.pause();
    ambianceAudio.play();
    gameOver = false;
    stage = "fadeRed";
    wait = 0;
    needToRedraw = true;
    lives = 3;
    collectedArtifacts = 0;
    character.color = "Purple";
    timer = new Timer(10, 0);
    character = new Character(canvas.width / 2, canvas.height / 2);
}

animate();