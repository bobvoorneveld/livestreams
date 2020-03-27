function test() {
    console.log('test');
}

let result = test();
console.log(result);

function test2() {
    return;
    console.log('test2');
}

let result2 = test2();
console.log(result2);


function test3() {
    for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) continue;
    
        if(i > 5) break;
    
        console.log(i);
    }
    
    console.log('test3');
}

test3();

function test4() {
    for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) continue;
    
        if(i > 5) return;
    
        console.log(i);
    }
    
    console.log('test4');
}

test4();

