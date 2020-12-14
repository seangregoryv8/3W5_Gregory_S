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
        switch (this.direction)
        {
            case "top":
                this.AnimDist(character.y, minSpace, 0, character.x)
                context.fillRect(this.animationMovement, 0, height, width);
                this.Reposition(this.y, -123);
                break;
            case "left":
                this.AnimDist(character.x, minSpace, 1, character.y)
                context.fillRect(0, this.animationMovement, width, height);
                this.Reposition(this.x, canvas.height - minSpace); //Good
                break;
            case "right":
                this.AnimDist(character.x, canvas.height - minSpace, 2, character.y)
                context.fillRect(canvas.width - width, this.animationMovement, width, height);
                this.Reposition(this.y, -123);
                break;
            case "bottom":
                this.AnimDist(character.y, canvas.height - minSpace, 3, character.x)
                context.fillRect(this.animationMovement, canvas.height - width, height, width);
                this.Reposition(this.y, -123);
                break;
        }
        if (this.animationMovement == distance - 100)
        {
            switch (this.direction)
            {
                case "left":
                    character.enterLeft();
                    break;
                case "right":
                    character.enterRight();
                    break;
                case "bottom":
                    character.enterDown();
                    break;
                case "top":
                    character.enterUp();
                    break;
            }
            this.animationMovement = distance;
        }
    }
    AnimDist = (start, end, i, between) => {
        let topBottomMin = distance + character.radius, topBottomMax = distance + character.radius * 3;
        if (start == end && room1.walls[i].enter && this.animationMovement > distance - 100 && BetweenAnd(between, topBottomMin, topBottomMax))
            this.animationMovement--;
    }
    BetweenOr = (condition, minimum, maximum) => (condition >= minimum || condition <= maximum) ? true : false;
    changeColor()
    {
        this.color = "Green";
        this.enter = true;
    }
    Reposition(point, newPoint)
    {
        if (this.animationMovement == (distance - 100))
        {
            point = newPoint;
        }
    }
}