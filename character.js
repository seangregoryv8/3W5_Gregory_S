class Character
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.radius = staticWidth;
        this.diameter = minSpace;
        this.circumference = parseInt(2 * Math.PI * this.radius);
        this.speedX = 0;
        this.speedY = 0;
        this.run = 0;
        this.color = "Purple";
        this.invin = false;
        this.invinTimer = new Timer(0, 0);
        //this.rotation = 0;
    }
    addInvin()
    {
        this.color = "DarkBlue";
        this.invin = true;
        this.invinTimer.setSeconds(2);
    }
    removeInvin()
    {
        this.color = "Purple";
        this.invin = false;
    }
    draw()
    {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation * Math.PI / fullDegrees);
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    }
    update()
    {
        if (this.x + this.diameter >= canvas.width || this.x - this.diameter <= 0 || this.y + this.diameter >= canvas.height || this.y - this.diameter <= 0)
            this.speedX = 0;
        else
        {
            this.x += this.speedX;
            this.y += this.speedY;
        }
        this.invinTimer.draw();
        if (this.invinTimer.seconds <= 0)
            this.removeInvin();
        this.draw();
    }
    turn(direction, amount)
    {
        this.escapeBoundaries();
        let mix = amount + this.run;
        if (direction == 0)
            this.speedX = mix;
        else
            this.speedY = mix;
    }
    escapeBoundaries()
    {
        this.x += (this.x + this.diameter >= canvas.width) ? -2 : (this.x - this.diameter <= 0) ? 2 : 0;
        this.y += (this.y + this.diameter >= canvas.height) ? -2 : (this.y - this.diameter <= 0) ? 2 : 0;
        for (let i = 0; i < rooms[currentRoom].artifacts.length; i++)
        {
            if (rooms[currentRoom].artifacts[i].Collect())
            {
                rooms[currentRoom].artifacts.splice(i, 1);
                collectedArtifacts++;
                document.getElementById("artifact").innerHTML = "Number of Artifacts: " + collectedArtifacts;
                let randomRoom;
                do
                {
                    randomRoom = randomInt(0, rooms[currentRoom].walls.length)
                } while (rooms[currentRoom].walls[randomRoom].impassible)
                rooms[currentRoom].walls[randomRoom].changeColor();
            }
        }
    }
    enterLeft() { this.x = canvas.height - minSpace; }
    enterRight() { this.x = minSpace; }
    enterDown() { this.y = minSpace; }
    enterUp() { this.y = canvas.height - minSpace; }
    GotHurt()
    {
        context.fillStyle = "Red";
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.addInvin();
        rooms[currentRoom].draw();
    }
}