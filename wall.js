class Wall {
    constructor(direction)
    {
        this.direction = direction;
        this.color = "Red";
        this.enter = false;
        this.animation = false;
        this.impassible = false;
        this.animationMovement = distance;
    }
    draw()
    {
        context.fillStyle = this.color;
        switch (this.direction)
        {
            case roomDirections[0]:
                this.AnimDist(character.y, minSpace, 0, character.x)
                context.fillRect(this.animationMovement, 0, height, width);
                break;
            case roomDirections[1]:
                this.AnimDist(character.x, minSpace, 1, character.y)
                context.fillRect(0, this.animationMovement, width, height);
                break;
            case roomDirections[2]:
                this.AnimDist(character.x, canvas.height - minSpace, 2, character.y)
                context.fillRect(canvas.width - width, this.animationMovement, width, height);
                break;
            case roomDirections[3]:
                this.AnimDist(character.y, canvas.height - minSpace, 3, character.x)
                context.fillRect(this.animationMovement, canvas.height - width, height, width);
                break;
        }
        if (this.animationMovement == distance - 100)
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
            this.animationMovement = distance;
            //Sets the new room to complete
            rooms[currentRoom].complete = true;
            needToRedraw = true;
        }
    }
    AnimDist = (start, end, i, between) => {
        let topBottomMin = distance + character.radius, topBottomMax = distance + character.radius * 3;
        if (start == end && rooms[currentRoom].walls[i].enter && this.animationMovement > distance - 100 && BetweenAnd(between, topBottomMin, topBottomMax))
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