class Room {
    constructor(border, red, green, blue)
    {
        this.borderColor = border;
        this.complete = false;
        //Random colors
        this.roomColor = {red: red, green: green, blue: blue};
        this.walls = [];
        this.artifacts = [];
        this.traps = [];
        for (let i = 0; i < 4; i++)
            this.walls[i] = new Wall(roomdirections[i], "Red");
            
        for (let i = 0; i < randomArtifactAmount; i++)
            this.artifacts[i] = new Artifact(randomInt(50, 600), randomInt(50, 600))
        this.traps[0] = new FlyTrap(distance + height, width, distance - width, 10, "down");
        this.traps[1] = new FlyTrap(width, canvas.height - 36, distance - width, 10, "down");
        this.traps[2] = new FlyTrap(width, width, 10, distance - width, "left");
        this.traps[3] = new FlyTrap(canvas.width - 36, canvas.width - distance, 10, distance - width, "right");
    }
    draw()
    {
        //if (this.complete)
        if (this.Hit(character.y, this.traps[0].y) && character.x - character.radius >= canvas.width - (distance + minSpace))
            character.gotHurt = true;
        if (this.Hit(character.y, this.traps[1].y) && character.x - character.radius <= distance)
            character.gotHurt = true;
        if (this.Hit(character.x, this.traps[2].x) && character.y - character.radius <= distance)
            character.gotHurt = true;
        if (this.Hit(character.x, this.traps[3].x) && character.y - character.radius >= canvas.width - (distance + minSpace))
            character.gotHurt = true;
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
        for (let i = 0; i < this.traps.length; i++)
            this.traps[i].draw();
        this.CharacterHurt();
    }
    Hit = (point, trap) => (point + character.radius >= trap && point + character.radius <= trap + 55) ? true : false
    CharacterHurt()
    {
        if (character.gotHurt)
        {
            context.fillStyle = "Red";
            context.fillRect(0, 0, canvas.width, canvas.height);
            character.x = canvas.width / 2
            character.y = canvas.height / 2
            character.gotHurt = false;
        }
    }
}