class Wall {
    constructor(direction, color)
    {
        this.direction = direction;
        this.color = color;
        this.enter = false;
        this.animation = false;
        this.animationMovement = distance;
    }
    draw()
    {
        context.fillStyle = this.color;
        let topBottomMin = distance + character.radius, topBottomMax = distance + character.radius * 3;
        switch (this.direction)
        {
            case "top":
                if (this.AnimDist(character.y, minSpace, 0) && BetweenAnd(character.x, topBottomMin, topBottomMax))
                    this.animationMovement--;
                context.fillRect(this.animationMovement, 0, height, width);
                break;
            case "left":
                if (this.AnimDist(character.x, minSpace, 1) && BetweenAnd(character.y, topBottomMin, topBottomMax))
                    this.animationMovement--;
                context.fillRect(0, this.animationMovement, width, height);
                break;
            case "right":
                if (this.AnimDist(character.x, canvas.height - minSpace, 2) && BetweenAnd(character.y, topBottomMin, topBottomMax))
                    this.animationMovement--;
                context.fillRect(canvas.width - width, this.animationMovement, width, height);
                break;
            case "bottom":
                if (this.AnimDist(character.y, canvas.height - minSpace, 3) && BetweenAnd(character.x, topBottomMin, topBottomMax))
                    this.animationMovement--;
                context.fillRect(this.animationMovement, canvas.height - width, height, width);
                break;
        }
    }
    AnimDist = (start, end, i) => (start == end && room1.walls[i].enter && this.animationMovement > distance - 100) ? true : false;
    changeColor()
    {
        this.color = "Green";
        this.enter = true;
    }
}