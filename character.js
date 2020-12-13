class Character {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.radius = 25;
        this.diameter = 50;
        this.speedX = 0;
        this.speedY = 0;
        this.run = 0;
        this.rotation = 0;
    }
    draw(){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation * Math.PI / 180);
        context.beginPath();
        context.fillStyle = "Purple";
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    }
    update(){
        if (this.x + this.diameter >= canvas.width || this.x - this.diameter <= 0 || this.y + this.diameter >= canvas.height || this.y - this.diameter <= 0)
            this.speedX = 0;
        else
        {
            this.x += this.speedX;
            this.y += this.speedY;
        }
        this.draw();
    }
    turn(direction, amount){
        this.escapeBoundaries();
        let mix = amount + this.run;
        if (direction == 0)
            this.speedX = mix;
        else
            this.speedY = mix;
    }
    escapeBoundaries(){
        this.x += (this.x + this.diameter >= canvas.width) ? -2 : (this.x - this.diameter <= 0) ? 2 : 0;
        this.y += (this.y + this.diameter >= canvas.height) ? -2 : (this.y - this.diameter <= 0) ? 2 : 0;
        for (let i = 0; i < room1.artifacts.length; i++)
        {
            let artX = room1.artifacts[i].x, artY = room1.artifacts[i].y, artW = room1.artifacts[i].width + 5
            if ((this.x > artX - artW && this.x < artX + artW) && (this.y > artY - artW && this.y < artY + artW))
            {
                room1.artifacts.splice(i, i + 1);
                console.log(room1.artifacts);
                document.getElementById("artifact").innerHTML = "Artifacts left: " + room1.artifacts.length;
                let randomRoom = parseInt(Math.random() * Math.floor(room1.walls.length));
                room1.walls[randomRoom].changeColor();
            }
        }
    }
}