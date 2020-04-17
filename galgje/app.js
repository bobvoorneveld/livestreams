let randomWord;
let choosenLetters;
let lives;
let solution;


function setup() {
    randomWord = 'water'.split('');
    choosenLetters = [];
    lives = 10;
    solution = randomWord.map(() => '-');

    updateUI();
}

function updateUI() {
    console.log('updating ui');
    $('#solution').html(solution);

    if(choosenLetters.length) {
        $('#choosen-letters').html(choosenLetters.join(' - '));
    } else {
        $('#choosen-letters').html('Nog geen letters gekozen');
    }

    updateGallow(lives);
}

function nextStep(letter) {
    if(choosenLetters.indexOf(letter) !== -1) {
        alert('letter already choosen!');
        $('#letter-input').val('');
        return;
    }
    choosenLetters.push(letter);

    let correctLetter = false;
    for (let i = 0; i < randomWord.length; i++) {
        if(letter === randomWord[i]) {
            correctLetter = true;
            solution[i] = letter;
        }
    }

    if(correctLetter) {
        if(solution.filter((letter) => letter === '-').length === 0) {
            setTimeout(() => {
                alert('Je hebt gewonnen!');
            }, 1);
        }
    } else {
        lives--;

        if(lives < 1) {
            alert('you\'re dead!');
        }
    }

    console.log('end of next step');
    $('#letter-input').val('');
    updateUI();
}

$('#letter-input').keyup(() => {
    const letter = $('#letter-input').val();
    nextStep(letter);
});

$('#reset').on('click', () => {
    setup();
});

function updateGallow(lives) {
    if (lives < 0) return;

    let number = Math.abs(lives - 10);
    let imageName = `images/hangman${number}.png`;
    $('#gallow-image').attr('src', imageName);
}

// Start the game
setup();