// $('#test-button').on('click', function() {
    // this became the button itself.
//     $(this).hide();
//     console.log('clicked');
// });

// $('#test-button').on('click', () => {
//     // This is global context
//     console.log(this);
// });


// console.log('this in the global scope');
// console.log(this);

let counter;
function setup() {
    counter = new Counter();
}

function draw() {
}

class Counter {
    constructor() {
        this.count = 0;

        // var that = this;
        // $('#test-button').on('click', function() {
        //     that.countIt();
        //     $(this).hide();
        // });

        $('#test-button').on('click', (event) => {
            this.countIt();
            $(event.currentTarget).hide();
        });

        // setInterval(() => {
        //     // console.log(this);
        //     this.countIt();
        // }, 1000);

        // var that = this;
        // setInterval(function() {
        //     console.log(that);
        //     that.countIt();
        // }, 1000);
    }

    countIt() {
        this.count++;
        console.log(this.count);
    }
}