// Define the letters the computer can pick
var alphabetLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// Set the initial global variables
var wins = 0;
var losses = 0;
var guessesLeft = 9;

// guessesSoFar is an array that will hold all the user's guesses in each round
var guessesSoFar = [];

// userGuess is what the user picks by pressing a key
var userGuess = null;

// Have computer pick a letter and store it in letterToBeGuessed
var letterToBeGuessed = alphabetLetters[Math.floor(Math.random() * alphabetLetters.length)];
console.log(" GuessesLeft: " + guessesLeft + " Guesses so far: " + guessesSoFar + " Computer picked: " + letterToBeGuessed);

// start event listeners!!
document.onkeyup = function(event) {

	// When user presses a key, it records it and saves to userGuess
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

	// Add the user's guess to guessesSoFar array but 
	// only if it wasn't already previously picked by the user
	if (guessesSoFar.indexOf(userGuess) < 0 && alphabetLetters.indexOf(userGuess) >= 0) {
		guessesSoFar[guessesSoFar.length]=userGuess;
		// if it is a new letter then decrease remaining guesses by 1
		guessesLeft--;
	}

	// if letterToBeGuessed is same as userGuess then record it as a win
	// and then reset guessesLeft to 9, and empty the guessesSoFar array
	// also have the computer make a new random pick
	if (letterToBeGuessed == userGuess) {
		wins++;
		console.log("You won!");
		alert("You won!");
		guessesLeft = 9;
		guessesSoFar = [];
		letterToBeGuessed = alphabetLetters[Math.floor(Math.random() * alphabetLetters.length)];
		console.log("Wins: " + wins);
	}

	// if guessesLeft gets to 0 then record it as a loss
	// and then reset guessesLeft to 9, and empty the guessesSoFar array
	// also have the computer make a new random pick
	if (guessesLeft == 0) {
		losses++;
		console.log("You lost!");
		alert ("You lost!");
		guessesLeft = 9;
		guessesSoFar = [];
		letterToBeGuessed = alphabetLetters[Math.floor(Math.random() * alphabetLetters.length)];
		console.log(" Losses: " + losses);
	}

	// Displaying progress to HTML
	var html = "<p>Wins:" + wins + "</p><br>" + "<p>Losses:" + losses + "</p><br>" + "<p>Guesses Left: " + guessesLeft + "</p><br>" +  "<p>Your guesses so far: " + guessesSoFar + "</p>" ;
	// place html into the game ID
	document.querySelector("#game").innerHTML = html;

}