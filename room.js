const randomArtifactAmount = parseInt(Math.random() * (4 - 2) + 2);
class Room {
    constructor(trap)
    {
        this.borderColor = "Black";
        this.complete = false;
        this.r = randomInt(1, colorMax);
        this.g = randomInt(1, colorMax);
        this.b = randomInt(1, colorMax);
        this.walls = [];
        this.artifacts = [];
        this.trap = trap;
        for (let i = 0; i < 4; i++)
            this.walls[i] = new Wall(roomDirections[i]);
        for (let i = 0; i < randomArtifactAmount; i++)
            this.artifacts[i] = new Artifact(randomInt(minSpace, maxSpace), randomInt(50, 600))
        switch (this.trap)
        {
            case "Fly":
                this.flyTraps = [];
                this.flyTraps[0] = new FlyTrap(staticDistance + staticHeight, staticWidth, staticDistance - staticWidth, 10, "down");
                this.flyTraps[1] = new FlyTrap(staticWidth, canvas.height - 36, staticDistance - staticWidth, 10, "down");
                this.flyTraps[2] = new FlyTrap(staticWidth, staticWidth, 10, staticDistance - staticWidth, "left");
                this.flyTraps[3] = new FlyTrap(canvas.width - 36, canvas.width - staticDistance, 10, staticDistance - staticWidth, "right");
                break;
            case "Ball":
                this.ballTraps = new BallTrap(randomInt(minSpace, maxSpace), randomInt(minSpace, maxSpace), staticWidth);
                break;
            case "Pressure":
                this.preTraps = [];
                this.preTraps[0] = new PressureTrap(staticDistance - staticWidth, 10, "right");
                this.preTraps[1] = new PressureTrap(staticDistance - staticWidth, 10, "left");
                this.preTraps[2] = new PressureTrap(staticDistance - staticWidth, 10, "right");
                this.preTraps[3] = new PressureTrap(staticDistance - staticWidth, 10, "left");
        }
    }
    draw()
    {
        // Will make the previous wall you entered from passable
            for (let i = 0; i < this.walls.length; i++)
                if (this.walls[i].direction == previousRoomWall)
                    this.walls[i].ImpassibleWall();
        //this.walls[wallToBeReverted].RevertWall();
        if (!character.invin)
        {
            switch (this.trap)
            {
                case "Fly":
                    let oppDistance = canvas.width - (staticDistance + minSpace)
                    if (this.Hit(character.y, this.flyTraps[0].y) && character.x - character.radius >= oppDistance)
                        character.GotHurt();
                    if (this.Hit(character.y, this.flyTraps[1].y) && character.x - character.radius <= staticDistance)
                        character.GotHurt();
                    if (this.Hit(character.x, this.flyTraps[2].x) && character.y - character.radius <= staticDistance)
                        character.GotHurt();
                    if (this.Hit(character.x, this.flyTraps[3].x) && character.y - character.radius >= oppDistance)
                        character.GotHurt();
                    break;
                case "Ball":
                    this.ballTraps.CheckForDamage();
                    break;
            }
        }
        context.fillStyle = 'rgba(0, 0, 0, 0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = this.borderColor;
        context.fillRect(0, 0, staticWidth, staticDistance);
        context.fillRect(0, 0, staticDistance, staticWidth);
        context.fillRect(0, canvas.height - staticDistance, staticWidth, staticDistance);
        context.fillRect(0, canvas.height - staticWidth, staticDistance, staticWidth);
        context.fillRect(canvas.height - staticWidth, 0, staticWidth, staticDistance);
        context.fillRect(canvas.height - staticDistance, 0, staticDistance, staticWidth);
        context.fillRect(canvas.height - staticWidth, canvas.height - staticDistance, staticWidth, staticDistance);
        context.fillRect(canvas.height - staticDistance, canvas.height - staticWidth, staticDistance, staticWidth);
        for (let i = 0; i < this.walls.length; i++)
            this.walls[i].draw();
        if (!this.complete)
        {
            for (let i = 0; i < this.artifacts.length; i++)
                this.artifacts[i].draw();
            switch (this.trap)
            {
                case "Fly":
                    for (let i = 0; i < this.flyTraps.length; i++)
                        this.flyTraps[i].draw();
                    break;
                case "Ball":
                    this.ballTraps.update();
                    break;
                case "Pressure":
                    for (let i = 0; i < this.preTraps.length; i++)
                        this.preTraps[i].draw()
                    break;
            }
        }
    }
    Hit = (point, trap) => (point + character.radius >= trap && point + character.radius <= trap + 55) ? true : false;
}