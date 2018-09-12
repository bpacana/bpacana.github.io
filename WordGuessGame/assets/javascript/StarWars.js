// START PSEUDOCODE
// Declaring variables and assigning their values
var letters = "abcdefghijklmnopqrstuvwxyz";
var guesses = 10;
var wins = 0;
var guessesArray = [];
var wordNameArray = [];
var displayedNameArray = [];
var guessedWordsArray = [];
var wordIndex = Math.floor(Math.random() * (13 - 0)) + 0;
var isStarted = false
var displayedWord;
var themeMusic = new Audio('../WordGuessGame/assets/sounds/Star Wars Theme  John Williams.mp3');
var gamOverMusic = new Audio('../WordGuessGame/assets/sounds/The power of the dark side.mp3');
var successChime = new Audio('../WordGuessGame/assets/sounds/coolsaber.mp3');

var words = {
    // Possible Words
    0: {
        name: "luke skywalker",
        hint: "the main hero"     
    },

    1: {
        name: "darth vader",
        hint: "he wears all black"
    },
    2: {
        name: "death star",
        hint: "ultimate weapon"     
    },

    3: {
        name: "x wing",
        hint: "rebel star fighter"
    },
    4: {
        name: "tie fighter",
        hint: "empire star fighter"     
    },

    5: {
        name: "princess leia",
        hint: "says: You're my only hope"
    },
    6: {
        name: "chewbacca",
        hint: "mmmbrrraaahhmrraaah!"     
    },

    7: {
        name: "han solo",
        hint: "the smuggler"
    },
    8: {
        name: "millennium falcon",
        hint: "han solo's starship"
    },
    9: {
        name: "obi wan kenobi",
        hint: "lukes first mentor"     
    },

    10: {
        name: "yoda",
        hint: "he is green"
    },
    11: {
        name: "tatooine",
        hint: "lukes home planet"
    },
    12: {
        name: "jedi",
        hint: "uses the force"     
    },

    13: {
        name: "george lucas",
        hint: "creator of star wars"
    },


    // compares guessed letter to letters in word
    guessedLetter: function(letter){
        var isCorrect = false;
        for (var i = 0; i < wordNameArray.length; i++){
            if (wordNameArray[i] === letter){
                displayedNameArray[i] = wordNameArray[i];
                displayedWord = displayedNameArray.join("");
                isCorrect = true;
            }
        }
        if (!isCorrect){
            guesses--;
        }
        words.updateBoard();
    },


    // Update Scoreboard
    updateBoard: function(){
        if (displayedWord === wordNameArray.join("")){
   
            words.nextWord();
            return;
        }
        var guessesHtml = 
        "<td>Guesses Remaining</td> <td>" +
        guesses + "</td>";
        document.querySelector('#guesses-left').innerHTML = guessesHtml;
        var winsHtml = 
        "<td>wins</td> <td>" + 
        wins + "</td>";
        document.querySelector('#wins').innerHTML = winsHtml;
        document.querySelector('#character-name').innerHTML = displayedWord;
        document.querySelector('#letters-used').innerHTML = guessesArray.join("  ");

        //if out of guesses game over
        if (guesses === 0){
            words.resetGame();
            document.getElementById("game-over").className = "";  
            document.getElementById("table").className = "hidden";
        }
    },


    // Game Started add game-board and select Character 
    startGame: function(){
        themeMusic.play();
        gamOverMusic.pause();
        
        isStarted = true;
        // set board
        var guessesHtml = 
        "<td>Guesses Remaining</td> <td>" +
        guesses + "</td>";
        document.querySelector('#guesses-left').innerHTML = guessesHtml;
        var winsHtml = 
        "<td>wins</td> <td>" + 
        wins + "</td>";
        document.querySelector('#wins').innerHTML = winsHtml;
        // get character name
        var thisWord = words[wordIndex]
        wordNameArray = thisWord.name.split("");
        // Create array with unguessed letters
        for (var i = 0; i < wordNameArray.length; i++){
            if (letters.indexOf(wordNameArray[i]) !== -1){
                displayedNameArray.push("-");
            } else {
                displayedNameArray.push(" ");
            }
        }
        // display unguessed word
        displayedWord = displayedNameArray.join("");
        document.querySelector('#character-name').innerHTML = displayedWord;
        document.querySelector('#hint').innerHTML = thisWord.hint;
        document.getElementById("game-over").className = "hidden";
        document.getElementById("press-to-start").className = "hidden";  
        document.getElementById("table").className = "";
        document.querySelector('#letters-used').innerHTML = guessesArray.join("");    
    },


    // next word
    nextWord: function(){
        // push word to array
        guessedWordsArray.push(words[wordIndex])
        // if all words used empty array
        if (guessedWordsArray.length === 13){
            guessedWordsArray = [];
        }
        // get random word until unguessed word is found
        let currentIndex = wordIndex
        do {
            wordIndex = Math.floor(Math.random() * (13 - 0)) + 0;
        } while (wordIndex == currentIndex || guessedWordsArray.indexOf(words[wordIndex]) !== -1)       

        wins++;
        guesses = 10;
        var guessesHtml = 
        "<td>Guesses Remaining</td> <td>" +
        guesses + "</td>";
        document.querySelector('#guesses-left').innerHTML = guessesHtml;
        var winsHtml = 
        "<td>wins</td> <td>" + 
        wins + "</td>";
        document.querySelector('#wins').innerHTML = winsHtml;
        // get character name
        var thisWord = words[wordIndex]
        wordNameArray = thisWord.name.split("");
        // reset word and guessed letters
        displayedNameArray = [];
        guessesArray = [];
        // Create array with unguessed letters
        for (var i = 0; i < wordNameArray.length; i++){
            if (letters.indexOf(wordNameArray[i]) !== -1){
                displayedNameArray.push("-");
            } else {
                displayedNameArray.push(" ");
            }
        }
        // display unguessed name
        displayedWord = displayedNameArray.join("");
        document.querySelector('#character-name').innerHTML = displayedWord;
        document.querySelector('#hint').innerHTML = thisWord.hint;
        document.querySelector('#letters-used').innerHTML = guessesArray.join("");
        successChime.play();
    },   
    resetGame: function(){
        // reset variables
        isStarted = false;
        guesses = 10;
        wins = 0;
        wordIndex = 0;
        wordNameArray = [];
        guessesArray = [];
        displayedWord =  "";
        displayedNameArray = [];
        themeMusic.pause();
        gamOverMusic.play();
    }
}


// Captures Key Clicks
document.onkeyup = function(event) {
    // if game isn't started set up the game
    if (!isStarted){
        words.startGame();
        return;
    }
    // Determines which exact key was selected. Makes it lowercase
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    // check letters used
    if (guessesArray.indexOf(userGuess) !== -1){
        alert("You already guessed '" + userGuess.toUpperCase() + "'");
        return;
    }
    // If user didn't press a letter return
    if (letters.indexOf(userGuess) === -1){
        return;
    } 
    
    
    guessesArray.push(userGuess);
    words.guessedLetter(userGuess)
    
}
// REFERENCES
// REFERENCE NOTATIONS https://stackoverflow.com/questions/21483667/concept-of-math-floormath-random-5-1-what-is-the-true-range-and-why  
// By multiplying the random number (which is between 0 and 1) by 5, 
// we make it a random number between 0 and 5 (for example, 3.1841). 
// Math.floor() rounds this number down to a whole number, and adding 1 at the end 
// changes the range from between 0 and 4 to between 1 and 5 (up to and including 5).

// BACKGROUND MUSIC REFERENCE https://stackoverflow.com/questions/18826147/javascript-audio-play-on-click
// https://stackoverflow.com/questions/21775563/playing-sound-inside-javascript-event

// OBJECT METHODS REFERENCE https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Methods_Index
// PROPERTY https://www.w3schools.com/js/js_object_properties.asp

// JavaScript COMPARISON AND LOGICAL OPERATORS https://www.w3schools.com/js/js_comparisons.asp

// CODE DISSECTION DECONSTRUCTION

// C:\Users\BPaca\Desktop\StarWarsHangman\assets\index.html