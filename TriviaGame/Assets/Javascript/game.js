// Create a trivia game
// "play now" button to start
// 10 timed questions displayed one at a time
// If correct, notify player they are correct w/ text & a picture
// If incorrect or timer runs out, notify player incorrect or times up w/ a text & a picture
// When game is over display score and some text & a picture
// ***Create a play again button!***

// **** Global variables ****
// Trivia questions contain the question, answer list and answer
var triviaQuestions = [{
    question: "Who plays Dr. Emmett Brown in all 3 movies?",
    answerList: ["Michael J. Fox", "Crispin Glover", "Christopher Lloyd", "Omar Patel"],
    answer: 2
}, {
    question: "According to the movies who was the first ever time traveler?",
    answerList: ["Einstein Docs Dog", "Dr. Emmett Brown", "Marty McFly", "Copernicus"],
    answer: 0
}
    , {
    question: "Marty McFly knew how to play which instrument?",
    answerList: ["The Oboe", "The Guitar", "The Piano", "The Clarinet"],
    answer: 1
}
    , {
    question: "What was the name of the high school ball that Marty McFly's parents went to?",
    answerList: ["A Midsummer Night's Dream", "Once Upon A Time", "Enchanted Garden", "Enchantment Under The Sea"],
    answer: 3
}
    , {
    question: "How much electricity did the time machine need to work?",
    answerList: ["3.14 Terawatts", "5000 Megawatts", "1.21 Gigawatts", "2.98 Petawatts"],
    answer: 2
}
    , {
    question: "In the second movie Marty McFly changes into what brand of shoes?",
    answerList: ["Vans", "Converse", "Nike", "Puma"],
    answer: 2
}
    , {
    question: "In the third movie Marty McFly went by what alias in 1885?",
    answerList: ["Clint Eastwood", "John Vernon", "Lee Van Cleef", "Billy The Kid"],
    answer: 0
}
    , {
    question: "What highly reactive element was used to provide the electricity needed to work the time machine?",
    answerList: ["Francium", "Phosphorus", "Plutonium", "Caesium"],
    answer: 2
}
    , {
    question: "The Power Of Love (featured in the first movie's soundtrack) was written by who?",
    answerList: ["Elton John", "Eric Clapton", "Huey Lewis", "Jimi Hendrix"],
    answer: 2
}
    , {
    question: "After hitting his head on the sink Doc invented what device that makes time travel possible?",
    answerList: ["The Y", "The Energy Condenser", "Mr. Fusion", "The Flux Capacitor"],
    answer: 3
}]

// To hold the images that go with each question
var picArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];

// Other variables needed to send object to the DOM
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;

// Messages/ alerts given to the user
var messages = {
    correct: "Awesome job!",
    incorrect: "Sorry, that's not correct.",
    endTime: "Out of time!",
	finished: "Let's see how you did...",
};


// Start button
$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

// Play again button
$('#playAgain').on('click', function () {
    $(this).hide();
    newGame();
});


// **** Functions ****
// new game

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
	$('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

// new question
function newQuestion() {
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpg').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for (var i = 0; i < 4; i++) {
		var choices = $('<div>').addClass('"btn btn-outline-dark"');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({ 'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click', function () {
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown() {
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown() {
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if (seconds < 1) {
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage() {
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	// slideshow ref
	$('#jpg').html('<img src = "./Assets/Images/' + picArray[currentQuestion] + '.jpg" width = "300px" height = "300px">');
	//checks to see correct, incorrect, or unanswered
	if ((userSelect == rightAnswerIndex) && (answered == true)) {
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if ((userSelect != rightAnswerIndex) && (answered == true)) {
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else {
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if (currentQuestion == (triviaQuestions.length - 1)) {
		setTimeout(scoreboard, 3000)
	} else {
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	

}


function scoreboard() {
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpg').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#playAgain').addClass('reset');
	$('#playAgain').show();
	$('#playAgain').html('Play Again?');
}