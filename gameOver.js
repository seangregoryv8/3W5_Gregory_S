let gameOverWait = 0, gameOverColor = 102, gameOverMusic = 0;
let alpha = 0, change = 0.02, textFade = 1.0;

GameOver()
{
    ambianceAudio.pause();
    timer.draw();
    room.draw();
    character.color = "Red";
    character.draw();
    document.getElementById("time").innerHTML = "";
    context.fillStyle = 'rgba(' + gameOverColor + ', 0, 0, ' + alpha + ')';
    context.fillRect(0, 0, canvas.width, canvas.height);
    document.body.style.backgroundColor = 'rgba(' + gameOverColor + ', ' + room.g + ', ' + room.b + ', ' + alpha + ')';
    room.g--;
    room.b--;
    //Fades to dark red
    while (alpha <= 1)
        alpha += change;
    //Waits a second and a half
    while (gameOverWait <= fullSecond * 1.5)
        gameOverWait++;
    //Fades to black
    while (gameOverColor >= 0)
        gameOverColor--;
    //Game over screen appears
    while (gameOverMusic <= fullSecond * 1.2)
    {
        currentAudio = new Audio('Sound_effects/GameOver.mp3');
        currentAudio.play();
    }
}