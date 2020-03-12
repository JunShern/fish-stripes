class Timer {
    constructor() {
        this.counter = 0;
        this.running = false;
    }

    start(seconds, updateCallback, endCallback) {
        if (seconds == 0) {
            endCallback();
        } else {
            this.counter = seconds;
            this.running = true;
            this.interval = setInterval(() => {
                this.counter--;
                updateCallback(this.counter);
                if (this.counter <= 0) {
                    endCallback();
                    this.reset();
                }
            }, 1000);    
        }
    }

    reset() {
        this.counter = 0;
        this.running = false;
        clearInterval(this.interval);
    }

}