const w = 25, h = 100, c = 300;
class Room {
    constructor(border, red, green, blue) {
        this.borderColor = border,
        this.roomColor = {red: red, green: green, blue: blue}
        this.walls = [];
        this.entrances = [];
        this.artifacts = [];
        for (let i = 0; i < 4; i++)
        {
            this.walls[i] = new Wall(roomdirections[i]);
            this.entrances = new Enter(this.walls[i].x, this.walls[i].y, false);
        }
        this.artifacts[0] = new Artifact(50, 100);
        this.artifacts[1] = new Artifact(300, 400);
    }
    draw = () => {
        context.fillStyle = 
        'rgba(' + this.roomColor.red + ', ' + this.roomColor.green + ', ' + this.roomColor.blue + ', 0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = this.borderColor;
        context.fillRect(0, 0, w, c);
        context.fillRect(0, 0, c, w);
        context.fillRect(0, canvas.height - c, w, c);
        context.fillRect(0, canvas.height - w, c, w);
        context.fillRect(canvas.height - w, 0, w, c);
        context.fillRect(canvas.height - c, 0, c, w);
        context.fillRect(canvas.height - w, canvas.height - c, w, c);
        context.fillRect(canvas.height - c, canvas.height - w, c, w);
        for (let i = 0; i < this.walls.length; i++)
            this.walls[i].draw();
        for (let i = 0; i < this.artifacts.length; i++)
            this.artifacts[i].draw();
    }
}
class Wall {
    constructor(direction, color) {
        this.direction = direction;
        this.color = color;
    }
    draw = () => {
        context.fillStyle = "Red";
        if (this.direction == "top")
            context.fillRect(c, 0, h, w)
        else if (this.direction == "left")
            context.fillRect(0, c, w, h);
        else if (this.direction == "right")
            context.fillRect(canvas.width - w, c, w, h)
        else if (this.direction == "bottom")
            context.fillRect(c, canvas.height - w, h, w)
    }
}
class Enter {
    constructor(x, y, walldown) {
        this.x = x;
        this.y = y;
        this.isWallDown = walldown;
    }
    draw = () => {

    }
}
class Artifact {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 15;
        this.height = 15;
    }
    draw = () => {
        context.beginPath();
        context.fillStyle = "gray";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}