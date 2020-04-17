let randomWord;
let choosenLetters;
let lives;
let solution;


function setup() {
    randomWord = 'water'.split('');
    choosenLetters = [];
    lives = 10;
    solution = randomWord.map(() => '-');
    $('#instruction').html('Hieronder kan je een letter invoeren.');
    $('#letter-input').attr('disabled', false);
    $('#reset').hide();
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
        $('#instruction').html('Letter al eerder gekozen!');
        $('#letter-input').val('');
        return;
    }
    choosenLetters.push(letter);

    let correctLetters = 0;
    for (let i = 0; i < randomWord.length; i++) {
        if(letter === randomWord[i]) {
            correctLetters++;
            solution[i] = letter;
        }
    }

    if(correctLetters > 0) {
        if(solution.filter((letter) => letter === '-').length === 0) {
            $('#instruction').html('Je hebt gewonnen!');
            $('#letter-input').attr('disabled', true);
            $('#reset').show();
        } else {
            $('#instruction').html(`De letter '${letter}' kwam ${correctLetters} keer voor.`)
        }
    } else {
        lives--;

        if(lives < 1) {
            $('#instruction').html('Je hebt helaas verloren, probeer het nog een keer!');
            $('#letter-input').attr('disabled', true);
            $('#reset').show();
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
    if (lives <= 0) return;

    let number = Math.abs(lives - 10);
    let imageName = `images/hangman${number}.png`;
    $('#gallow-image').attr('src', imageName);
}

// Start the game
setup();