class Timer {
    constructor(minutes, seconds) {
        this.minutes = minutes;
        this.seconds = seconds;
    }
    draw() {
        if (this.seconds == -1)
        {
            this.minutes--;
            this.seconds = 59;
        }
        let minuteTen = (this.minutes < 10) ? "0" + this.minutes : this.minutes;
        let secondTen = (this.seconds < 10) ? "0" + this.seconds : this.seconds;
        document.getElementById("time").innerHTML = "Time left: " +  minuteTen + ":" + secondTen;
    }
    countDown = seconds => {
        this.seconds -= seconds;
        this.draw();
    }
}