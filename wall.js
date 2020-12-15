class Wall {
    constructor(direction)
    {
        this.direction = direction;
        this.color = "Red";
        this.enter = false;
        this.animation = false;
        this.impassible = false;
        this.animationMovement = staticDistance;
    }
    draw()
    {
        context.fillStyle = this.color;
        switch (this.direction)
        {
            case roomDirections[0]:
                this.AnimDist(character.y, minSpace, 0, character.x)
                context.fillRect(this.animationMovement, 0, staticHeight, staticWidth);
                break;
            case roomDirections[1]:
                this.AnimDist(character.x, minSpace, 1, character.y)
                context.fillRect(0, this.animationMovement, staticWidth, staticHeight);
                break;
            case roomDirections[2]:
                this.AnimDist(character.x, canvas.height - minSpace, 2, character.y)
                context.fillRect(canvas.width - staticWidth, this.animationMovement, staticWidth, staticHeight);
                break;
            case roomDirections[3]:
                this.AnimDist(character.y, canvas.height - minSpace, 3, character.x)
                context.fillRect(this.animationMovement, canvas.height - staticWidth, staticHeight, staticWidth);
                break;
        }
        if (this.animationMovement == staticDistance - 100)
        {
            wallToBeReverted = previousRoomWall;
            switch (this.direction)
            {
                case roomDirections[1]:
                    character.enterLeft();
                    previousRoomWall = roomDirections[2];
                    break;
                case roomDirections[2]:
                    character.enterRight();
                    previousRoomWall = roomDirections[1];
                    break;
                case roomDirections[3]:
                    character.enterDown();
                    previousRoomWall = roomDirections[0];
                    break;
                case roomDirections[0]:
                    character.enterUp();
                    previousRoomWall = roomDirections[3];
                    break;
            }
            // Sets the new respawn point
            respawnPointX = character.x;
            respawnPointY = character.y;
            this.animationMovement = staticDistance;
            //Sets the new room to complete
            needToRedraw = true;
        }
    }
    AnimDist = (start, end, i, between) => {
        let topBottomMin = staticDistance + character.radius, topBottomMax = staticDistance + character.radius * 3;
        if (start == end && room.walls[i].enter && this.animationMovement > staticDistance - 100 && BetweenAnd(between, topBottomMin, topBottomMax))
            this.animationMovement--;
    }
    BetweenOr = (condition, minimum, maximum) => (condition >= minimum || condition <= maximum) ? true : false;
    changeColor()
    {
        this.color = "Green";
        this.enter = true;
    }
    ImpassibleWall()
    {
        this.color = "Black";
        this.impassible = true;
    }
    RevertWall()
    {
        this.color = "Red";
        this.impassible = false;
    }
}