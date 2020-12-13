let randomInt = (min, max) => parseInt(Math.random() * (max - min) + min);

let BetweenAnd = (condition, minimum, maximum) => (condition >= minimum && condition <= maximum) ? true : false;

let BetweenOr = (condition, minimum, maximum) => (condition >= minimum || condition <= maximum) ? true : false;

let WallCheck = (endY, wall) => (character.y == endY && room1.walls[wall].enter && this.animationMovement > distance - 100) ? true : false;