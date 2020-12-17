let lifeCanvas = document.getElementById("lives");
let lifeContext = lifeCanvas.getContext('2d');
lifeCanvas.height = 100;
lifeCanvas.width = 200;

let numberOfLives = [];
for (let i = 0; i < lives; i++)
    numberOfLives[i] = new Character(0, 10);

let lifeAnimate = () =>
{
    requestAnimationFrame(lifeAnimate);
    lifeContext.clearRect(0, 0, lifeCanvas.width, lifeCanvas.height);
    let distanceBetweenLives = character.diameter;
    for (let i = 0; i < lives; i++)
    {
        lifeContext.beginPath();
        lifeContext.fillStyle = "Purple";
        lifeContext.arc(distanceBetweenLives, character.diameter + 10, 25, 0, 2 * Math.PI);
        lifeContext.fill();
        let text = "Lives"
        lifeContext.font = '24px Arial'
        lifeContext.fillStyle = '0,0,0';
        lifeContext.fillText(text, 70, character.radius)
        lifeContext.restore();
        distanceBetweenLives += character.diameter;
    }
}
lifeAnimate();