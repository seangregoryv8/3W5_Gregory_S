class FlyTrap
{
    constructor(x, y, width, height, direction)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.activate = false;
        this.direction = direction;
    }
    draw()
    {
        context.fillStyle = "DarkRed"
        switch (this.direction)
        {
            case roomDirections[0]:
                this.y--;
                if (this.y == staticWidth)
                    this.direction = roomDirections[3];
                break;
            case roomDirections[1]:
                this.x++;
                if (this.x + this.width == canvas.width - staticWidth)
                    this.direction = roomDirections[2];
                break;
            case roomDirections[2]:
                this.x--;
                if (this.x == staticWidth)
                    this.direction = roomDirections[1];
                break;
            
            case roomDirections[3]:
                this.y++;
                if (this.y == canvas.width - staticWidth - 10)
                    this.direction = roomDirections[0];
                break;
        }
        context.fillRect(this.x, this.y, this.width, this.height);
    }
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
        if (this.x + minSpace > canvas.width || this.x < minSpace)
            this.speedX *= -1;
        if (this.y + minSpace > canvas.height || this.y < minSpace)
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
    constructor(width, height, direction, movement)
    {
        this.x = (direction == "right") ? staticDistance + staticHeight : staticWidth;
        this.y = (direction == "right") ? staticWidth : canvas.height - 35;
        this.width = width//(movement == "up" || movement == "down");
        this.height = height;
        this.direction = direction;
        this.movement = movement
        this.activate = false;
    }
    draw()
    {
        context.fillStyle = "DarkRed"
        switch (this.direction)
        {
            case "right":
                if (character.x + character.radius >= canvas.width - 150)
                    this.activate = true;
                if (this.activate)
                    this.y += 2;
            case "left":
                if (character.x + character.radius <= 150)
                    this.activate = true;
                if (this.activate)
                    this.y -= 2;
        }

        context.fillRect(this.x, this.y, this.width, this.height);
        
    }
}