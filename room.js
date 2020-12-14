class Room {
    constructor(trap)
    {
        this.borderColor = "Black";
        this.complete = false;
        this.walls = [];
        this.artifacts = [];
        this.trap = trap;
        for (let i = 0; i < 4; i++)
            this.walls[i] = new Wall(roomDirections[i], "Red");
        for (let i = 0; i < randomArtifactAmount; i++)
            this.artifacts[i] = new Artifact(randomInt(minSpace, maxSpace), randomInt(50, 600))
        if (this.trap == "Fly")
        {
            this.flyTraps = [];
            this.flyTraps[0] = new FlyTrap(distance + height, width, distance - width, 10, "down");
            this.flyTraps[1] = new FlyTrap(width, canvas.height - 36, distance - width, 10, "down");
            this.flyTraps[2] = new FlyTrap(width, width, 10, distance - width, "left");
            this.flyTraps[3] = new FlyTrap(canvas.width - 36, canvas.width - distance, 10, distance - width, "right");
        }
        else if (this.trap == "Ball")
            this.ballTraps = new BallTrap(randomInt(minSpace, maxSpace), randomInt(minSpace, maxSpace), width);
    }
    draw()
    {
        // Will make the previous wall you entered from passable
            for (let i = 0; i < this.walls.length; i++)
                if (this.walls[i].direction == roomDirections[previousRoomWall])
                    this.walls[i].enter = true;
        if (this.trap == "Fly")
        {
            if (this.Hit(character.y, this.flyTraps[0].y) && character.x - character.radius >= canvas.width - (distance + minSpace))
                character.gotHurt = true;
            if (this.Hit(character.y, this.flyTraps[1].y) && character.x - character.radius <= distance)
                character.gotHurt = true;
            if (this.Hit(character.x, this.flyTraps[2].x) && character.y - character.radius <= distance)
                character.gotHurt = true;
            if (this.Hit(character.x, this.flyTraps[3].x) && character.y - character.radius >= canvas.width - (distance + minSpace))
                character.gotHurt = true;
        }
        else if (this.trap = "Ball")
        {
            if (parseInt(this.ballTraps.x) - this.ballTraps.radius <= character.x + character.radius && parseInt(this.ballTraps.x) + this.ballTraps.radius >= character.x - character.radius)
                if (parseInt(this.ballTraps.y) - this.ballTraps.radius <= character.y + character.radius && parseInt(this.ballTraps.y) + this.ballTraps.radius >= character.y - character.radius)
                    character.gotHurt = true;
        }
        context.fillStyle = 'rgba(0, 0, 0, 0)';
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
        if (!this.complete)
        {
            for (let i = 0; i < this.artifacts.length; i++)
                this.artifacts[i].draw();
            if (this.trap == "Fly")
                for (let i = 0; i < this.flyTraps.length; i++)
                    this.flyTraps[i].draw();
            else if (this.trap == "Ball")
                this.ballTraps.update();
            this.CharacterHurt();
        }
    }
    Hit = (point, trap) => (point + character.radius >= trap && point + character.radius <= trap + 55) ? true : false
    CharacterHurt()
    {
        if (character.gotHurt)
        {
            context.fillStyle = "Red";
            context.fillRect(0, 0, canvas.width, canvas.height);
            character.x = respawnPointX;
            character.y = respawnPointY;
            character.gotHurt = false;
        }
    }
}