String.prototype.map = function(fn) {
    return this.split('').map(fn).join('');
}

// console.log('testing2'.map((letter) => `${letter}${letter}`))

class CustomString {
    storage = '';
    constructor(word) {
        this.storage = word;
    }

    map(fn) {
        let output = [];
        let input = this.storage.split('');

        for (let letter of input) {
            let letterOutput = fn(letter);
            output.push(letterOutput);
        }
        return output.join('');
    }
}

let customStr = new CustomString('testing');


let output = customStr.map(function(letter) {
    return `${letter}${letter}`;
});

// console.log(output);
// output = 'tteessttiinngg';
