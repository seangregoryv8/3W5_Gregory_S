class FlyTrap
{
    constructor(x, y, direction)
    {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.otherWay = false;
        switch (this.direction)
        {
            case "up":
            case "down":
                this.width = doorToCornerDistance - staticWidth;
                this.height = 10;
                break;
            case "left":
            case "right":
                this.width = 10;
                this.height = doorToCornerDistance - staticWidth;
                break;
        }
        this.activate = false;
    }
    draw()
    {
        context.fillStyle = "DarkRed"
        switch (this.direction)
        {
            case "up":
            case "down":
                if (this.y <= staticWidth) { this.otherWay = true }
                if (this.y + this.height >= canvas.width - staticWidth) { this.otherWay = false; }
                this.y += (this.otherWay) ? 1 : -1
                break;
            case "left":
            case "right":
                if (this.x <= staticWidth) { this.otherWay = true }
                if (this.x + this.width >= canvas.width - staticWidth) {this.otherWay = false; }
                this.x += (this.otherWay) ? 1 : -1
                break;
        }
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    CheckForDamage()
    {
        switch (this.direction)
        {
            case "down":
                if (character.y - character.radius <= this.y + this.height && character.y + character.radius >= this.y && character.x + character.radius >= this.x)
                    character.GotHurt();
                break;
            case "up":
                if (character.y - character.radius <= this.y + this.height && character.y + character.radius >= this.y && character.x <= this.x + doorToCornerDistance)
                    character.GotHurt();
                break;
            case "right":
                if (character.x - character.radius <= this.x + this.width && character.x + character.radius >= this.x && character.y + character.radius >= this.y)
                    character.GotHurt();
                break;
            case "left":
                if (character.x - character.radius <= this.x + this.width && character.x + character.radius >= this.x && character.y <= this.y + doorToCornerDistance)
                    character.GotHurt();
                break;
        }
        if (this.distance == "down")
            console.log(this.x)
    }
    Hit = (point, trap) => (point + character.radius >= trap && point + character.radius <= trap + 55) ? true : false;

}

class BallTrap
{
    constructor(x, y, radius)
    {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.speedX = randomInt(1, 6);
        this.speedY = randomInt(1, 6);
    }
    draw()
    {
        context.fillStyle = "DarkRed";
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }
    update()
    {
        if (this.x + minDoorSpace > canvas.width || this.x < minDoorSpace)
            this.speedX *= -1;
        if (this.y + minDoorSpace > canvas.height || this.y < minDoorSpace)
            this.speedY *= -1;
        this.x += this.speedX;
        this.y += this.speedY;
        this.draw();
    }
    CheckForDamage()
    {
        let distanceX = this.x - character.x, distanceY = this.y - character.y;
        let radii = this.radius + character.radius;
        if (!character.invin && distanceX * distanceX + distanceY * distanceY <= radii * radii)
        {
            //Difference
            let diffX = character.x - this.x, diffY = character.y - this.y;
            //Speed
            let speed = Math.sqrt((this.speedX * this.speedX) + (this.speedY * this.speedY));
            //Distance
            let distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
            diffX /= distance;
            diffY /= distance;
            //Apply original speed
            let dir = { x : -diffX * speed, y : -diffY * speed };
            this.speedX = dir.x;
            this.speedY = dir.y;
            character.GotHurt();
        }
    }
    SQ = (num1, num2) => Math.sqrt(num1, num2);
}

class PressureTrap
{
    constructor(x, y, direction, movement)
    {
        this.x = x;
        this.y = y;
        this.direction = direction;
        switch (this.direction)
        {
            case "left":
            case "right":
                this.width = doorToCornerDistance - staticWidth;
                this.height = 10;
                break;
            case "down":
            case "up":
                this.width = 10;
                this.height = doorToCornerDistance - staticWidth;
                break;
        }
        this.movement = movement;
        this.activate = false;
    }
    draw()
    {
        context.fillStyle = "DarkRed"
        let endTrigger = 150;
        switch (this.direction)
        {
            case "right":
            case "left":
                switch (this.direction)
                {
                    case "right":
                        if (character.x + character.radius >= canvas.width - endTrigger)
                            this.activate = true;
                        break;
                    case "left":
                        if (character.x <= endTrigger)
                            this.activate = true;
                        break;
                }
                if (this.activate)
                    this.y += (1.75 * this.movement);
                break;
            case "up":
            case "down":
                switch (this.direction)
                {
                    case "down":
                        if (character.y + character.radius >= canvas.height - endTrigger)
                            this.activate = true;
                        break;
                    case "up":
                        if (character.y <= endTrigger)
                            this.activate = true;
                        break;
                }
                if (this.activate)
                    this.x += (2 * this.movement);
                break;
        }
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    CheckForDamage()
    {
        switch (this.direction)
        {
            case "right":
                if (character.y - character.radius <= this.y + this.height && character.y + character.radius >= this.y && character.x + character.radius >= this.x)
                    character.GotHurt();
                break;
            case "left":
                if (character.y - character.radius <= this.y + this.height && character.y + character.radius >= this.y && character.x <= this.x + doorToCornerDistance)
                    character.GotHurt();
                break;
            case "down":
                if (character.x - character.radius <= this.x + this.width && character.x + character.radius >= this.x && character.y + character.radius >= this.y)
                    character.GotHurt();
                break;
            case "up":
                if (character.x - character.radius <= this.x + this.width && character.x + character.radius >= this.x && character.y <= this.y + doorToCornerDistance)
                    character.GotHurt();
                break;
        }
    }
    Hit = (point, trap) => (point + character.radius >= trap && point + character.radius <= trap + 55) ? true : false;
}