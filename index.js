var Word = require("./word.js");
var inquirer = require("inquirer");


// word bank
var wordBank = [
    "rick", "morty", "pickle rick",
    "the rick", "rollin gstones", "tesla",
    "nirvana", "theramones", "future",
    "einstein", "nike", "tekashi",
    "six9ine", "the matrix", "pay attention",
    "coding is gets easy only if you try", "new job who this",
    "trump for president", ""
];

// -----------------------------------
var guesses;
var pickedWords;
var word;
var pickedWord;
// -----------------------------------
function init() {
    pickedWords = [];
    console.log("Hello, welcome to the guess Game!");
    console.log("Print{This Was Not Easy}----LOL---");
    console.log("<----Lets Get it !----->")
    playGame();
}

// initiate wordgame
function playGame() {
    pickedWord = "";
    // number of guesses per game
    guesses = 8;
    if (pickedWords.length < wordBank.length) {
        pickedWord = getWord();
    } else {
        // WIN CONDITION
        console.log("You're not as dumb as you look, never judge a book by its cover");
        continuePrompt();
    }
    if (pickedWord) {
        word = new Word(pickedWord);
        word.makeLetters();
        makeGuess();
    }
}
// -------retrieve word constructor
function getWord() {
    let rand = Math.floor(Math.random() * wordBank.length);
    let randomWord = wordBank[rand];
    if (pickedWords.indexOf(randomWord) === -1) {
        pickedWords.push(randomWord);
        return randomWord;
    } else {
        return getWord();
    }
}

// -------make guess constructor
function makeGuess() {
    let checker = [];
    inquirer.prompt([
        {
            name: "guessedLetter",
            message: word.update() +
                "\nGuess a letter!" +
                "\nPlayed Yo' self try AGAIN: " + guesses
        }
    ])
        .then(data => {
            word.letters.forEach(letter => {
                letter.checkLetter(data.guessedLetter);
                checker.push(letter.getCharacter());
            });
            if (guesses > 0 && checker.indexOf("_") !== -1) {
                guesses--;
                if (guesses === 0) {
                    console.log("GAME OVER.");
                    continuePrompt();
                } else {
                    makeGuess();
                }
            } else {
                console.log("YOU GOT THE GUESSED IT!");
                console.log(word.update());
                playGame();
            }
        });
}
// --------prompts display message to user
function continuePrompt() {
    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "Would you like to play again?",
            choices: ["Yes", "No"]
        }
    ])
        .then(data => {
            if (data.continue === "Yes") {
                init();
            } else {
                console.log("PLAYED YOURSELF TRY AGAIN!");
            }
        });
}

init();