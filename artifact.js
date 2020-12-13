class Artifact {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 15;
        this.height = 15;
    }
    draw = () => {
        context.beginPath();
        context.fillStyle = "gray";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}