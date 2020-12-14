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
    //Ball with bouncing physics with same hurting capabilities as the lines.
    draw()
    {
        context.fillStyle = "DarkRed"
        switch (this.direction)
        {
            case roomDirections[0]:
                this.y--;
                if (this.y == width)
                    this.direction = roomDirections[3];
                break;
            case roomDirections[1]:
                this.x++;
                if (this.x + this.width == canvas.width - width)
                    this.direction = roomDirections[2];
                break;
            case roomDirections[2]:
                this.x--;
                if (this.x == width)
                    this.direction = roomDirections[1];
                break;
            
            case roomDirections[3]:
                this.y++;
                if (this.y == canvas.width - width - 10)
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
        if (this.x + minSpace + 5 > canvas.width || this.x < minSpace)
            this.speedX *= -1;
        if (this.y + minSpace + 5 > canvas.height || this.y < minSpace)
            this.speedY *= -1;
        this.x += this.speedX;
        this.y += this.speedY;
        this.draw();
    }
}