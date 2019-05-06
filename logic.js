// 1.0 ARRAY OF WORDS
var gameWords = ["alexander", "hamilton", "duel", "america", "theodosia", "jefferson", "angalica", "writing", "lafayette", "burr", "madison", "eliza", "hercules", "mulligan", "federalist", "washington", "treasury", "george", "reynolds", "peggy", "satisfied", "nonstop", "burn", "kingscollege"];

// 1.1 RANDOM WORD GENERATOR
function randomWord(gameWords) {
    var random = Math.floor(Math.random() * gameWords.length);
    return gameWords[random]
}


// 1.2 CHECK IF INPUT IS A CORRECT LETTER
function isCorrectGuess(word, letter) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            return true;
        }
    }
    return false;
}




// 1.3 GET BLANKS ******
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


// 1.5 SETUP ROUND ******
function setupRound(word) {
    var setup = {
        word : word,
        guessesLeft : 9,
        wrongGuesses : [],
        puzzleState : getBlanks(word),
    }
    return setup;
}


// 1.6 UPDATE ROUND 
function updateRound(setup, letter) {
        if (isCorrectGuess(setup.word, letter) === false) {
            --setup.guessesLeft;
            setup.wrongGuesses.push(letter);
            console.log("updateRound ran for wrong guess");
        }
        else {
            fillBlanks(setup.word, setup.puzzleState, letter);
            console.log("updateRound ran to fill in blanks");
        }   
       
    return setup;
}

// from Megan!!!
// function updateRound(setup, letter) {
//     if (isCorrectGuess(round.word, letter)) {
//         setup.puzzleState = fillBlanks(round.word, round.puzzleState, letter);
//     }
//     else {
//         round.guessesLeft = round.guessesLeft - 1;
//         round.wrongGuesses.push(letter);
//     }
// }


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
        alert("hasLost() is true");
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
        words : gameWords,
        wins : wins,
        losses : losses,
        round : setupRound(randomWord(gameWords)),
    }
    return game;
}


// 1.11 START NEW ROUND
function startNewRound(game) {
    var puzzleState = game.round.puzzleState;
    if (hasWon(puzzleState) === true) {
        ++game.wins;
        alert("You did it! The word is " + game.round.word);
    }
    else {
        ++game.losses;
        alert("Sorry, the word was " + game.round.word);
    }
    return game;
}


// 1.12 MY GAME
var myGame = setupGame(gameWords, 0, 0);


// USER INTERACTIONS

// Uses the ramdom word and displays the empty blanks
var puzzleState = document.getElementById("puzzle-state").innerHTML = myGame.round.puzzleState.join(" ");

// // Displays the updated object for wrong guesses from user
var wrongGuessesText = document.createTextNode(myGame.round.wrongGuesses);
document.getElementById("wrong-guesses").appendChild(wrongGuessesText);

// // Displays the updated object for total wins
var winsText = document.createTextNode(myGame.wins);
document.getElementById("win-counter").appendChild(winsText);

// // Displays the updated object for total losses
var lossesText = document.createTextNode(myGame.losses);
document.getElementById("loss-counter").appendChild(lossesText);

// // Displays the updated object for number of guesses left
var guessesLeftText = document.createTextNode(myGame.round.guessesLeft);
document.getElementById("guesses-left").appendChild(guessesLeftText);

// logs the object for this game round
console.log(myGame);


// start of key being pressed by the user
var keyPressed;
document.onkeyup = function (evt) {
    evt = evt || window.event;
    var userGuess = evt.keyCode || evt.which;
    keyPressed = String.fromCharCode(userGuess).toLowerCase();
    console.log("The " + keyPressed + " key was pressed");

    // call back the logic
    isCorrectGuess(myGame.round.word, keyPressed);
    fillBlanks(myGame.round.word, myGame.round.puzzleState, keyPressed);
    updateRound(myGame.round, keyPressed);
    hasWon(myGame.round.puzzleState);
    hasLost(myGame.round.guessesLeft);
    isEndOfRound(myGame.round);

    // Uses the ramdom word and displays the empty blanks
    // var puzzleState = 
    document.getElementById("puzzle-state").innerHTML = myGame.round.puzzleState.join(" ");

    // Displays the updated object for wrong guesses from user
    var wrongGuessesText = document.createTextNode(myGame.round.wrongGuesses);
    // var wrongGuesses = 
    document.getElementById("wrong-guesses").appendChild(wrongGuessesText);
    // document.getElementById("wrong-guesses".replaceChild(myGame.round.wrongGuesses, wrongGuessesText)

    // // Displays the updated object for total wins
    var winsText = document.createTextNode(myGame.wins);
    // // var wins = 
    document.getElementById("win-counter").appendChild(winsText);

    // // Displays the updated object for total losses
    var lossesText = document.createTextNode(myGame.losses);
    // // var losses = 
    document.getElementById("loss-counter").appendChild(lossesText);

    // // Displays the updated object for number of guesses left
    var guessesLeftText = document.createTextNode(myGame.round.guessesLeft);
    // // var guessesLeft = 
    document.getElementById("guesses-left").appendChild(guessesLeftText);

    console.log(myGame);
}
// CHECKS IF GUESSES ARE LEFT OR HAS WON
isEndOfRound(myGame.round);

// RESET GAME
function gameReset() {
    startNewRound(myGame);
}


// setup = myGame.round