// ARRAY OF WORDS
var gameWords = ["alexander", "hamilton", "duel", "america", "theodosia", "jefferson", "angalica", "writing", "lafayette", "burr", "madison", "eliza", "hercules", "mulligan", "federalist", "washington", "treasury", "george", "reynolds", "peggy", "satisfied", "nonstop", "burn", "kingscollege"];

// RANDOM WORD GENERATOR
var randomWordGen;
// this will load into the console with a random word from the array when randomWord() is typed in
// indexRandom will return the [i] that can be used for selecting the word from the array
function randomWord(gameWords) {
    var random = Math.floor(Math.random() * gameWords.length);
    return gameWords[random] = randomWordGen;
}
randomWord()


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
isCorrectGuess()

//     // random word has already been generated, reference that word
//     // when user clicks a key, save that input into a variable
//     // compare the user input to the contnets of the word
//     // if the input is contained in the word, true
//     // if the input is not contained in the word, false
//     // clicked word will then display on the screen
// }
// // arguments of 2: word, letter



// // GET BLANKS

// function getBlanks(word) {
//     for (var i = 0; i < word.length; i++) {
//         var blanks = //function to make a div with a blank [" _ "]
//             blanks
//     }
// }
// // calculate number the length of the word
// // create individual divs for that number with a unique ID
// // insert in the divs the "_" text using the ID for refernece










// // CHECK IF INPUT IS A CORRECT LETTER
// document.onkeyup = function isCorrectGuess(e) {
//     console.log(event.which);
// };

// // converts all strings to lowercase
// .toLowerCase()

//  if (onkeyup.includes(word)) {
//         alert("you pressed the correct key");
//         // document.write(/insert where the letter will be/);
//         // answer is true
//     } else {
//         alert("wrong");
//         // answer is false
//         // will need to decrease score
//     }






