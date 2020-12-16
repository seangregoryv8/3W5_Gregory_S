const randomArtifactAmount = parseInt(Math.random() * (4 - 2) + 2);
class Room {
    constructor(trap)
    {
        this.borderColor = "Black";
        this.r = randomInt(1, colorMax);
        this.g = randomInt(1, colorMax);
        this.b = randomInt(1, colorMax);
        this.walls = [];
        this.artifacts = [];
        this.trap = trap;
        for (let i = 0; i < 4; i++)
            this.walls[i] = new Wall(roomDirections[i]);
        for (let i = 0; i < randomArtifactAmount; i++)
            this.artifacts[i] = new Artifact(randomInt(minDoorSpace, maxSpace), randomInt(50, 600))
        let oppositeDistance = canvas.width - 36;
        switch (this.trap)
        {
            case "Fly":
                this.flyTraps = [];
                this.flyTraps[0] = new FlyTrap(doorToCornerDistance + staticHeight, staticWidth, doorToCornerDistance - staticWidth, 10, "down");
                this.flyTraps[1] = new FlyTrap(staticWidth, oppositeDistance, doorToCornerDistance - staticWidth, 10, "up");
                this.flyTraps[2] = new FlyTrap(staticWidth, staticWidth, 10, doorToCornerDistance - staticWidth, "left");
                this.flyTraps[3] = new FlyTrap(oppositeDistance, canvas.width - doorToCornerDistance, 10, doorToCornerDistance - staticWidth, "right");
                break;
            case "Ball":
                this.ballTraps = new BallTrap(randomInt(minDoorSpace, maxSpace), randomInt(minDoorSpace, maxSpace), staticWidth);
                break;
            case "Pressure":
                this.pressureTraps = [];
                let allXs = [doorToCornerDistance + staticHeight, doorToCornerDistance + staticHeight, staticWidth, staticWidth, staticWidth, oppositeDistance--, staticWidth, oppositeDistance--];
                let allYs = [staticWidth, oppositeDistance--, staticWidth, oppositeDistance--, canvas.width - doorToCornerDistance, canvas.width - doorToCornerDistance, staticWidth, staticWidth];
                let allDirections = ["right", "right", "left", "left", "down", "down", "up", "up"], allMovements = [1, -1, 1, -1, 1, -1, 1, -1];
                for (let i = 0; i < 8; i++)
                    this.pressureTraps[i] = new PressureTrap(allXs[i], allYs[i], allDirections[i], allMovements[i]);
        }
    }
    draw()
    {
        // Will make the previous wall you entered from passable
            for (let i = 0; i < this.walls.length; i++)
                if (this.walls[i].direction == previousRoomWall)
                    this.walls[i].ImpassibleWall();
        if (!character.invin)
        {
            let horizontalDistance = doorToCornerDistance + minDoorSpace;
            console.log(doorToCornerDistance);
            console.log(horizontalDistance);
            switch (this.trap)
            {
                case "Fly":
                    //for (let i = 0; i < this.flyTraps.length; i++)
                        //this.flyTraps[i].CheckForDamage();
                    if (this.Hit(character.y, this.flyTraps[0].y) && character.x - character.radius >= horizontalDistance)
                        character.GotHurt();
                    if (this.Hit(character.y, this.flyTraps[1].y) && character.x - character.radius <= doorToCornerDistance)
                        character.GotHurt();
                    if (this.Hit(character.x, this.flyTraps[2].x) && character.y - character.radius <= doorToCornerDistance)
                        character.GotHurt();
                    if (this.Hit(character.x, this.flyTraps[3].x) && character.y - character.radius >= horizontalDistance)
                        character.GotHurt();
                    break;
                case "Ball":
                    this.ballTraps.CheckForDamage();
                    break;
                case "Pressure":
                    if (this.Hit(character.y, this.pressureTraps[4].y) && character.x - character.radius >= horizontalDistance)
                        character.GotHurt();
                    if (this.Hit(character.y, this.pressureTraps[5].y) && character.x - character.radius <= doorToCornerDistance)
                        character.GotHurt();
                    if (this.Hit(character.x, this.pressureTraps[6].x) && character.y - character.radius <= doorToCornerDistance)
                        character.GotHurt();
                    if (this.Hit(character.x, this.pressureTraps[7].x) && character.y - character.radius >= horizontalDistance)
                        character.GotHurt();
                    if (this.Hit(character.y, this.pressureTraps[2].y) && character.x - character.radius >= horizontalDistance)
                        character.GotHurt();
                    if (this.Hit(character.y, this.pressureTraps[3].y) && character.x - character.radius <= doorToCornerDistance)
                        character.GotHurt();
                    if (this.Hit(character.x, this.pressureTraps[0].x) && character.y - character.radius <= doorToCornerDistance)
                        character.GotHurt();
                    if (this.Hit(character.x, this.pressureTraps[1].x) && character.y - character.radius >= horizontalDistance)
                        character.GotHurt();
                    //for (let i = 0; i < this.pressureTraps.length; i++)
                        //this.pressureTraps[i].CheckForDamage();

            }
        }
        context.fillStyle = 'rgba(0, 0, 0, 0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = this.borderColor;
        context.fillRect(0, 0, staticWidth, doorToCornerDistance);
        context.fillRect(0, 0, doorToCornerDistance, staticWidth);
        context.fillRect(0, canvas.height - doorToCornerDistance, staticWidth, doorToCornerDistance);
        context.fillRect(0, canvas.height - staticWidth, doorToCornerDistance, staticWidth);
        context.fillRect(canvas.height - staticWidth, 0, staticWidth, doorToCornerDistance);
        context.fillRect(canvas.height - doorToCornerDistance, 0, doorToCornerDistance, staticWidth);
        context.fillRect(canvas.height - staticWidth, canvas.height - doorToCornerDistance, staticWidth, doorToCornerDistance);
        context.fillRect(canvas.height - doorToCornerDistance, canvas.height - staticWidth, doorToCornerDistance, staticWidth);
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
                    for (let i = 0; i < this.pressureTraps.length; i++)
                        this.pressureTraps[i].draw()
                    break;
            }
        }
    }
    Hit = (point, trap) => (point + character.radius >= trap && point + character.radius <= trap + 55) ? true : false;
}