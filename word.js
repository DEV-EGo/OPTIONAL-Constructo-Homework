var Letter = require("./letter.js");

function Word(word) {
    this.word = word;
    this.letters = [];

    // word array
    this.makeLetters = function () {
        let wordArr = this.word.split("");
        for (let i = 0; i < wordArr.length; i++) {
            let newLetter = new Letter(wordArr[i]);
            this.letters.push(newLetter);
        }
    }

    // ------------ make guess function allows user to go through each guess
    this.makeGuess = function (guess) {
        this.letters.forEach(letter => {
            letter.checkLetter(guess);
        });
    }
    // ----------udpate constructor after each guess
    this.update = function () {
        let printedWord = "";
        this.letters.forEach(letter => {
            printedWord += letter.getCharacter() + " ";
        });
        return printedWord;
    }
}

module.exports = Word;
