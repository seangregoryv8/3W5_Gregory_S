class FlyTrap {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.activate = false;
    }
    draw()
    {
        let movement = this.y;
        context.fillStyle = "DarkRed"
        if (character.x > this.x + 150 )
            this.activate = true;
        if (this.activate)
        {
            console.log("HI");
            movement++;
        }
        context.fillRect(this.x, movement, 275, 10);
    }
}