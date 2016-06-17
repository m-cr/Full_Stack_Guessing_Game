/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber,
    guessesLeft = 5,
    guessesArray = [];

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(100*Math.random());
}

winningNumber = generateWinningNumber();

//fetch guess
function playersGuessSubmission(){
	playersGuess = +$('#input').val();
	document.getElementById('input').value = '';
	checkGuess();
};

function checkGuess(){
	var duplicate = 0;

	for(var key in guessesArray){
		if(guessesArray[key] === playersGuess){
			duplicate = 1;
		}
	} //check duplicate
	
	if(playersGuess === winningNumber){
		guessMessage("Nice! You won!");
		$('body').addClass('winner');
		$('#input').hide();
		$('#submit').hide();
		$('button').last().hide();
	} else { 
		if(duplicate == 1){
			guessMessage("You already guessed that number!");
		}
		else{
			guessesArray.push(playersGuess);
			guessesLeft --;
			var loh = lowerOrHigher();
			guessMessage("Woops! " + loh + " You have " + guessesLeft + " guesses left!");
		}
	}
	if(guessesLeft == 0){
		guessMessage("Game over man!");
		$('body').addClass('loser');
		$('#input').hide();
		$('#submit').hide();
		$('button').last().hide();
	}
}

function guessMessage(text){
	$('#message').text(text);
}

function lowerOrHigher(){
	var distance = Math.abs(playersGuess - winningNumber);
	var hint = '';
	if(distance < 10){
		hint = "You're off by less than 10!"
	} else if(distance > 10 && distance < 20){
		hint = "You're guess is between 10 and 20 off!"
	} else {hint = "You're way off!"}

	if(playersGuess < winningNumber){return "Your guess is too low! " + hint}
	else{return "Your guess is too high! " + hint}
}

function provideHint(){
	if(winningNumber % 17 === 0){
		guessMessage("The winning number is divisable by 17.");
	} else if(winningNumber % 7 === 0){
		guessMessage("The winning number is divisable by 7.");
	}
	else if(winningNumber % 5 === 0){
		guessMessage("The winning number is divisable by 5.");
	} 
	else if(winningNumber % 3 === 0){
		guessMessage("The winning number is divisable by 3.");
	}
	else if(winningNumber % 11 === 0){
		guessMessage("The winning number is divisable by 11.");
	}
	else if(winningNumber % 13 === 0){
		guessMessage("The winning number is divisable by 13.");
	}
	else if(winningNumber % 2 === 0){
		guessMessage("The winning number is even.");
	}
	else {
		guessMessage("The winning number is a prime number...");
	}
}

//playagain

function playAgain(){
	$('body').removeClass('winner');
	$('body').removeClass('loser');
	$('#input').show();
	$('#message').text('hm...');
	$('#submit').show();
	$('button').last().show();
	winningNumber = generateWinningNumber();
	guessesLeft = 5;
	guessesArray = [];
}


/* **** Event Listeners/Handlers ****  */

$('#input').keypress(function(e) {
    if(e.which == 13) {
        playersGuessSubmission();
    }
});