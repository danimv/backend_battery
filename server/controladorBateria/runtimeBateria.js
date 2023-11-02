class RuntimeBateria {

    constructor(interval) {
        this.interval1s = interval * 1000;
        this.interval2s = interval * 5000;
        this.num1 = 0;
        this.num2 = 0;
        this.updatedValue = 0;
        this.running = false;
        this.result = null;
    }

    getDateTime() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');
        return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    }

    async updateAPI() {
        return new Promise(resolve => {
            setTimeout(async () => {
                this.num2++;
                resolve(this.num2);
            }, this.interval2s);
        });
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.run();
        }
    }

    async run() {
        while (true) {
            const updatePromise = this.updateAPI();
            const updateResult = await updatePromise;
            const myObject = {
                text: 'API envia ordres a bateria',
                result: updateResult,
                date: this.getDateTime()
            };
            this.result = JSON.stringify(myObject);
            console.log(this.result);
        }
    }

    stop() {
        this.running = false;
    }

    getResult() {
        return this.result;
    }
}

module.exports = RuntimeBateria;