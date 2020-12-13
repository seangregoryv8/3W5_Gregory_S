const width = 25, height = 100, distance = 300, minSpace = 50, maxSpace = 600;
var randomArtifactAmount = parseInt(Math.random() * (4 - 2) + 2);

class Room {
    constructor(border, red, green, blue) {
        this.borderColor = border,
        //Random colors
        this.roomColor = {red: red, green: green, blue: blue}
        this.walls = [];
        this.artifacts = [];
        for (let i = 0; i < 4; i++)
            this.walls[i] = new Wall(roomdirections[i], "Red");
        for (let i = 0; i < randomArtifactAmount; i++)
            this.artifacts[i] = new Artifact(randomInt(50, 600), randomInt(50, 600))
        console.log(this.artifacts);
    }
    draw = () => {
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
class Wall {
    constructor(direction, color) {
        this.direction = direction;
        this.color = color;
        this.enter = false;
        this.animation = false;
        this.animationMovement = distance;
    }
    draw = () => {
        context.fillStyle = this.color;
        if (this.direction == "top")
        {
            if (character.y == minSpace && room1.walls[0].enter && this.animationMovement > distance - 100)
                if (character.x > distance + character.radius && character.x < character.radius * 3)
                this.animationMovement--;
            context.fillRect(this.animationMovement, 0, height, width);
        }
        else if (this.direction == "left")
            context.fillRect(0, distance, width, height);
        else if (this.direction == "right")
            context.fillRect(canvas.width - width, distance, width, height);
        else if (this.direction == "bottom")
            context.fillRect(distance, canvas.height - width, height, width);
        //c--
    }
    changeColor = () => {
        this.color = "Green";
        this.enter = true;
    }
}
/*class Enter {
    constructor(x, y, walldown) {
        this.x = x;
        this.y = y;
        this.isWallDown = walldown;
    }
    draw = () => {

    }
}*/
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