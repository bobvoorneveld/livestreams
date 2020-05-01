class Person {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(speed);
        // Create random key every day
        this.uuids = [this.createUUID()];

        // Create random key every 10 minutes that is broadcasted
        this.broadcastingKey = this.createBroadcastingKey(this.uuids[this.uuids.length - 1]);


        setInterval(() => {
            this.uuids.push(this.createUUID());
        }, 10000);

        setInterval(() => {
            this.broadcastingKey = this.createBroadcastingKey(this.uuids[this.uuids.length - 1]);
        }, 1000);

        this.otherCodes = [];
        this.infected = false;
        this.wasInContactWithSickPerson = false;
    }

    update(people) {
        this.detectHit(people);

        // Stop moving after sick or quarantined;
        if(this.infected || this.wasInContactWithSickPerson) return;

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if(this.x < 0 || this.x > width) {
            this.velocity.x *= -1;
        }


        if(this.y < 0 || this.y > height) {
            this.velocity.y *= -1;
        }

    }

    detectHit(people) {
        for (let other of people) {
            if (other === this) continue;
            let distance = dist(this.x, this.y, other.x, other.y);

            if (distance <= personSize) {
                // Exchange keys
                this.exchangeCodes(other);


                // Bounce of each other
                let dx = other.x - this.x;
                let dy = other.y - this.y;
                let angle = atan2(dy, dx);
                let targetX = this.x + cos(angle) * personSize;
                let targetY = this.y + sin(angle) * personSize;
                let ax = (targetX - other.x) * 0.05;
                let ay = (targetY - other.y) * 0.05;

                this.velocity.x -= ax;
                this.velocity.y -= ay;
                this.velocity.setMag(speed);

                other.velocity.x += ax;
                other.velocity.y += ay;
                this.velocity.setMag(speed);
            }
        }
    }

    exchangeCodes(other) {
        if(this.otherCodes.indexOf(other.broadcastingKey) === -1) {
            this.otherCodes.push(other.broadcastingKey);
        }

        if(other.otherCodes.indexOf(this.broadcastingKey) === -1) {
            other.otherCodes.push(this.broadcastingKey);
        }
    }

    show() {
        noStroke();
        if(this.infected) {
            fill(255, 0, 0);
        } else if(this.wasInContactWithSickPerson) {
            fill(0, 0, 255);
        } else {
            fill(255);
        }
        ellipse(this.x, this.y, personSize, personSize);
    }

    async sickCodes(codes) {
        for (let code of codes) {
            for (let i = 0; i <= floor(frameCount / 100); i++) {
                console.log(`${code}-${i}`);
                let sha = await sha256(`${code}-${i}`);         
                if (this.otherCodes.indexOf(sha) !== -1) {
                    this.wasInContactWithSickPerson = true;
                }    
            }
        }
    }

    createUUID() {
        console.log('switching uuid');
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
        for (let i = 0; i < 16; i++) {
            result += random(characters);
        }
        return result;
    }

    async createBroadcastingKey(uuid) {
        let timer = floor(frameCount / 100);
        return await sha256(`${uuid}-${timer}`);
    }
}

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}