class RuntimeBateria {

    constructor(interval) {
        this.interval1s = interval * 1000;
        this.interval2s = interval * 5000;
        this.num1 = 0;
        this.num2 = 0;
        this.updatedValue = 0;
        this.running = false;
        this.result = null;
        this.potencia = 0;
        this.consum = 0;
        this.histeresis = 0; 
        this.nivellBateria = 0; 
        this.nivellBateriaMinim = 1000;  
        this.interval = 0;  
        this.ordreBateria = 0; // 0 res, 1 acumula, 2 injecta    
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

    async getControlValues(){
        this.potencia = 4890;
        this.consum = 3480;
        this.histeresis = 5; 
        this.nivellBateria = 5200; 
        this.interval = 10; 
    }

    async setControl(){
        if (this.potencia > this.consum){
            this.ordreBateria = 1;
        }else if (this.potencia > this.consum && this.nivellBateria > this.nivellBateriaMinim){
            this.ordreBateria = 2;
        }else{
            this.ordreBateria = 0;
        }
    }

    async updateAPI() {
        return new Promise(resolve => {
            setTimeout(async () => {
                this.getControlValues();
                this.setControl();
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
            const update = await updatePromise;
            
            const myObject = {
                text: 'API envia ordres a bateria: injectant...',
                potencia: this.potencia,
                consum: this.consum,
                nivellBateria: this.nivellBateria,
                ordre: this.ordreBateria,
                interval: this.interval,
                histeresis: this.histeresis,
                date: this.getDateTime()
            };
            this.result = JSON.stringify(myObject);
            // console.log(this.result);
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