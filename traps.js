class FlyTrap {
    constructor(x, y, width, height, direction) {
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
        if (this.direction == "down")
        {
            this.y++;
            if (this.y == canvas.width - 35)
                this.direction = "up";
        }
        else if (this.direction == "up")
        {
            this.y--;
            if (this.y == 25)
                this.direction = "down";
        }
        else if (this.direction == "left")
        {
            this.x++;
            if (this.x + this.width == canvas.width - 25)
                this.direction = "right"
        }
        else if (this.direction == "right")
        {
            this.x--;
            if (this.x == 24)
                this.direction = "left"
        }
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}