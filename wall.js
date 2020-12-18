class Wall {
    constructor(direction)
    {
        this.direction = direction;
        this.color = "Red";
        this.enter = false;
        this.animation = false;
        this.impassible = false;
        this.animationMovement = doorToCornerDistance;
    }
    draw()
    {
        context.fillStyle = this.color;
        switch (this.direction)
        {
            case "up":
                this.AnimDist(character.y, minDoorSpace, 0, character.x)
                context.fillRect(this.animationMovement, 0, staticHeight, staticWidth);
                break;
            case "left":
                this.AnimDist(character.x, minDoorSpace, 1, character.y)
                context.fillRect(0, this.animationMovement, staticWidth, staticHeight);
                break;
            case "right":
                this.AnimDist(character.x, canvas.height - minDoorSpace, 2, character.y)
                context.fillRect(canvas.width - staticWidth, this.animationMovement, staticWidth, staticHeight);
                break;
            case "down":
                this.AnimDist(character.y, canvas.height - minDoorSpace, 3, character.x)
                context.fillRect(this.animationMovement, canvas.height - staticWidth, staticHeight, staticWidth);
                break;
        }
        if (this.animationMovement == doorToCornerDistance - 100)
        {
            wallToBeReverted = previousRoomWall;
            switch (this.direction)
            {
                case "left":
                    character.enterLeft();
                    previousRoomWall = "right";
                    break;
                case "right":
                    character.enterRight();
                    previousRoomWall = "left";
                    break;
                case "down":
                    character.enterDown();
                    previousRoomWall = "up";
                    break;
                case "up":
                    character.enterUp();
                    previousRoomWall = "down";
                    break;
            }
            currentAudio = new Audio('Sound_effects/DoorOpen.mp3');
            currentAudio.play();
            // Sets the new respawn point
            respawnPointX = character.x;
            respawnPointY = character.y;
            this.animationMovement = doorToCornerDistance;
            //Sets the new room to complete
            needToRedraw = true;
        }
    }
    AnimDist = (start, end, i, between) => {
        let topBottomMin = doorToCornerDistance + character.radius, topBottomMax = doorToCornerDistance + character.radius * 3;
        if (start == end && room.walls[i].enter && this.animationMovement > doorToCornerDistance - 100 && BetweenAnd(between, topBottomMin, topBottomMax))
            this.animationMovement--;
    }
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