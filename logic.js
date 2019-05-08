// 1.0 ARRAY OF WORDS
var gameWords = ["alexander", "hamilton", "duel", "america", "theodosia", "jefferson", "angelica", "writing", "lafayette", "burr", "madison", "eliza", "hercules", "mulligan", "federalist", "washington", "treasury", "george", "reynolds", "peggy", "satisfied", "nonstop", "burn", "schuyler", "broadway", "musical", "helpless", "cabinet", "hurricane", "caribbea", "shot", "miranda"];
var validChar = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// 1.1 RANDOM WORD GENERATOR
function randomWord(gameWords) {
    var random = Math.floor(Math.random() * gameWords.length);
    return gameWords[random]
}


// 1.2 CHECK IF INPUT IS A CORRECT LETTER
function isCorrectGuess(word, letter) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            correctClick.play();
            return true;     
        }
    }
    wrongClick.play();
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
        winRound.play();
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

// Including window.onload breaks the "test", but eliminates the .innerHTML error that would display prior to using it... so I kept linke 139 in here becuase it's cleaner.
/**
 * displays intial puzzleState on the screen
 */
window.onload = function () {
    var puzzleState = document.getElementById("puzzle-state").innerHTML = myGame.round.puzzleState.join(" ");
};

// logs the object for this game round
console.log(myGame);

// play sounds 
var winRound = new Audio('sounds/Winning-brass-fanfare-sound-effect.mp3');
var wrongClick = new Audio('sounds/Button-click-sound-effect.mp3');
var correctClick = new Audio('sounds/Bell-ding-sound-effect.mp3');
var myShot = new Audio('sounds/My Shot.mp3');


/**
 * Updates the HTML IDs for each piece of contnet - puzzleState, wrongGuesses, wins, losses.
 */
function updateHTML() {
    // Uses the ramdom word and displays the empty blanks
    document.getElementById("puzzle-state").innerText = myGame.round.puzzleState.join(" ");

    // Displays the updated object for wrong guesses from user
    document.getElementById("wrong-guesses").innerText = myGame.round.wrongGuesses.join(" ");

    // Displays the updated object for total wins
    document.getElementById("win-counter").innerText = myGame.wins;

    // Displays the updated object for total losses
    document.getElementById("loss-counter").innerText = myGame.losses;

    // Displays the updated object for number of guesses left
    document.getElementById("guesses-left").innerText = myGame.round.guessesLeft;
};

// start of key being pressed by the user
var keyPressed;
/**
 * triggers all game related functions onkeyup
 */
document.onkeyup = function (evt) {
    keyPressed = evt.key.toLowerCase() 
    var flag = false
    for (var i = 0; i < validChar.length; i++) {   
        if (keyPressed === validChar[i]) {
            flag = true          
        }
    }
    if (flag === false) {
        alert("Don't throw away your shot! Use only valid letters, or you'll lose another guess.");
    }


    console.log(keyPressed + " key was pressed");


    // CALL BACK THE LOGIC
    isCorrectGuess(myGame.round.word, keyPressed);
    fillBlanks(myGame.round.word, myGame.round.puzzleState, keyPressed);
    updateRound(myGame.round, keyPressed);
    hasWon(myGame.round.puzzleState);
    hasLost(myGame.round.guessesLeft);

    
    // CHECKS IF GUESSES ARE LEFT OR HAS WON
    if (isEndOfRound(myGame.round)){
        myGame = startNewRound(myGame);
        myGame.round = setupRound(randomWord(gameWords));
    }
    // --------- end CALL BACK THE LOGIC


    updateHTML();

    displayCard1();
    
}; // ------------ end of onclick event


// setTimeout(hasWon(), 3000);


// RESET GAME
function gameReset() {
    myGame.round.guessesLeft = 0;
    hasLost(myGame.round.guessesLeft);

    // CHECKS IF GUESSES ARE LEFT OR HAS WON
    if (isEndOfRound(myGame.round)) {
        myGame = startNewRound(myGame);
        myGame.round = setupRound(randomWord(gameWords));
    }
    // --------- end CALL BACK THE LOGIC

    myShot.play();

    updateHTML();

}; // ------------ end of button click



// make display cards show
function displayCard1() {
    if (myGame.wins >= 1) {
        document.getElementById("card1-eb").classList.add("display-visible-eb");
    }
    if (myGame.wins >= 2) {
        document.getElementById("card2-eb").classList.add("display-visible-eb");
    }
    if (myGame.wins >= 3) {
        document.getElementById("card3-eb").classList.add("display-visible-eb");
    }
    if (myGame.wins >= 4) {
        document.getElementById("card4-eb").classList.add("display-visible-eb");
    }
};

