// ARRAY OF WORDS
var gameWords = ["alexander", "hamilton", "duel", "america", "theodosia", "jefferson", "angalica", "writing", "lafayette", "burr", "madison", "eliza", "hercules", "mulligan", "federalist", "washington", "treasury", "george", "reynolds", "peggy", "satisfied", "nonstop", "burn", "kingscollege"];

// RANDOM WORD GENERATOR
var randomWordGen;
// this will load into the console with a random word from the array when randomWord() is typed in
// indexRandom will return the [i] that can be used for selecting the word from the array
function randomWord(gameWords) {
    var random = Math.floor(Math.random() * gameWords.length);
    return gameWords[random]
}


// CHECK IF INPUT IS A CORRECT LETTER
function isCorrectGuess(word, letter) {
    var word;
    var letter;
    if (word.indexOf(letter) !== -1) {
        return true;
    } else if (word.indexOf(letter) === -1) {
        return false;
    }
}


// var isCorrectGuess = function(word, letter) {
//     for (var i = 0; i < word.length; i++) {
//         if (word[i] === letter) {
//             return true;
//         }
//     }
//     return false;
// }




// GET BLANKS
function getBlanks(word) {
    // computer generates random word from words array
    var blanksArray = word.split("");
    // Looping to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanksArray.length; i++) {
        blanksArray[i] = "_";
    }
    return blanksArray;
}



// FILL BLANKS
function fillBlanks(word, puzzleState, letter) {
    if (isCorrectGuess(word, letter)) {
        for (var i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                puzzleState[i] = letter;
            }
        }
    }
    return puzzleState;
}


// SET UP ROUND 
function setupRound(word) {
    var setup = {
        word: word,
        guessesLeft: 9,
        wrongGuesses: [],
        puzzleState: [],
    }
    return setup;
}


// 1.6 UPDATE ROUND ----- NEED TO UPDATE
function updateRound(setup, letter) {
        if (isCorrectGuess(setup.word, letter) === false) {
            setup.guessesLeft--;
            setup.wrongGuesses.push(letter);
        }
        else {
            fillBlanks(setup.word, setup.puzzleState, letter);
        }   
       
    return setup;
}


// 1.7 HAS WON ----- NEED TO UPDATE

function hasWon(puzzleState) {
    for (var i = 0; i < puzzleState.length; i++) {
        if (puzzleState[i] === "_") {
            return false;
        }
    }
    return true;
}

// HAS LOST
function hasLost(guessesLeft) {
    if (guessesLeft === 0) {
        return true;
    }
    return false;
}





