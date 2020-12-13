const width = 25, height = 100, distance = 300, minSpace = 50, maxSpace = 600;
var randomArtifactAmount = parseInt(Math.random() * (4 - 2) + 2);

class Room {
    constructor(border, red, green, blue)
    {
        this.borderColor = border,
        //Random colors
        this.roomColor = {red: red, green: green, blue: blue}
        this.walls = [];
        this.artifacts = [];
        for (let i = 0; i < 4; i++)
            this.walls[i] = new Wall(roomdirections[i], "Red");
        for (let i = 0; i < randomArtifactAmount; i++)
            this.artifacts[i] = new Artifact(randomInt(50, 600), randomInt(50, 600))
    }
    draw()
    {
        context.fillStyle = 
        'rgba(' + this.roomColor.red + ', ' + this.roomColor.green + ', ' + this.roomColor.blue + ', 0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = this.borderColor;
        context.fillRect(0, 0, width, distance);
        context.fillRect(0, 0, distance, width);
        context.fillRect(0, canvas.height - distance, width, distance);
        context.fillRect(0, canvas.height - width, distance, width);
        context.fillRect(canvas.height - width, 0, width, distance);
        context.fillRect(canvas.height - distance, 0, distance, width);
        context.fillRect(canvas.height - width, canvas.height - distance, width, distance);
        context.fillRect(canvas.height - distance, canvas.height - width, distance, width);
        for (let i = 0; i < this.walls.length; i++)
            this.walls[i].draw();
        for (let i = 0; i < this.artifacts.length; i++)
            this.artifacts[i].draw();
    }
}