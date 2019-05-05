// 1.0 ARRAY OF WORDS
var gameWords = ["alexander", "hamilton", "duel", "america", "theodosia", "jefferson", "angalica", "writing", "lafayette", "burr", "madison", "eliza", "hercules", "mulligan", "federalist", "washington", "treasury", "george", "reynolds", "peggy", "satisfied", "nonstop", "burn", "kingscollege"];

// 1.1 RANDOM WORD GENERATOR
function randomWord(gameWords) {
    var random = Math.floor(Math.random() * gameWords.length);
    return gameWords[random]
}


// 1.2 CHECK IF INPUT IS A CORRECT LETTER
// function isCorrectGuess(word, letter) {
//     var word;
//     var letter;
//     if (word.indexOf(letter) !== -1) {
//         return true;
//     } else if (word.indexOf(letter) === -1) {
//         return false;
//     }
// }

// FROM ELIZA CHECK IF INPUT IS A CORRECT LETTER (but started with function and not var)
function isCorrectGuess(word, letter) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            return true;
        }
    }
    return false;
}




// 1.3 GET BLANKS
function getBlanks(word) {
    var blanksArray = [];
    for (var i = 0; i < word.length; i++) {
        blanksArray.push("_");
    }
    return blanksArray;
}



// 1.4 FILL BLANKS
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


// 1.5 SETUP ROUND 
function setupRound(word) {
    var setup = {
        word: word,
        guessesLeft: 9,
        wrongGuesses: [],
        puzzleState: getBlanks(word),
    }
    return setup;
}


// 1.6 UPDATE ROUND 
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


// 1.7 HAS WON
function hasWon(puzzleState) {
    for (var i = 0; i < puzzleState.length; i++) {
        if (puzzleState[i] === "_") {
            return false;
        }
    }
    return true;
}

// 1.8 HAS LOST
function hasLost(guessesLeft) {
    if (guessesLeft === 0) {
        return true;
    }
    return false;
}

// 1.9 IS END OF ROUND
function isEndOfRound(setup) {
    if (setup.guessesLeft === 0) {
        return true;
    }
    if (hasWon(setup.puzzleState)) {
        return true;
    }
    return false;
}



// 1.10 SETUP GAME
function setupGame(gameWords, wins, losses) {
    var game = {
        words: gameWords,
        wins: wins,
        losses: losses,
        round: setupRound(randomWord(gameWords)),
    }
    return game;
}


// 1.11 START NEW ROUND
function startNewRound(game) {
    var puzzleState = game.round.puzzleState;
    if (hasWon(puzzleState) === true) {
        game.wins++;
        alert("The word is " + game.round.word);
    }
    else {
        game.losses++;
        alert("Sorry, the word was " + game.round.word);
    }
    return game;
}


// 1.12 MY GAME
var myGame = setupGame(gameWords, 0, 0);




